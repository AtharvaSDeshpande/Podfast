from importlib.metadata import metadata
from pickle import FALSE

from numpy import False_
from utils import *
from bson.objectid import ObjectId

import requests

from urllib.request import urlretrieve
from pydub import AudioSegment
from pydub.silence import split_on_silence

import wave
import json
from vosk import Model, KaldiRecognizer, SetLogLevel

import json
from types import SimpleNamespace

import editdistance
import io
import itertools
import networkx as nx
import os
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'podfast-9a8ab.appspot.com'
})
bucket = storage.bucket()

import pyrebase

import smtplib
from .creds import *;

firebaseConfig = {
  "apiKey": "AIzaSyA46HvUuygrOyTzQuNR_VjXxl3asKPbdsQ",
  "authDomain": "aces-1.firebaseapp.com",
  "databaseURL": "",
  "projectId": "aces-1",
  "storageBucket": "aces-1.appspot.com",
  "messagingSenderId": "811790431362",
  "appId": "1:811790431362:web:dadd7826cab92efcd3f09b",
  "measurementId": "G-GKXKJFRBCZ",
  "serviceAccount": "serviceAccountKey.json"
}
firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()
auth = firebase.auth()



class Word:
    def __init__(self, dict):
        self.conf = dict["conf"]
        self.end = dict["end"]
        self.start = dict["start"]
        self.word = dict["word"]
    def to_string(self):
        ''' Returns a string describing this instance '''
        return "{:} from {:.2f} sec to {:.2f} sec, confidence is {:.2f}%".format(
            self.word, self.start, self.end, self.conf*100)


def build_graph(nodes):
    """Return a networkx graph instance.

    :param nodes: List of hashables that represent the nodes of a graph.
    """
    gr = nx.Graph()  # initialize an undirected graph
    gr.add_nodes_from(nodes)
    nodePairs = list(itertools.combinations(nodes, 2))

    # add edges to the graph (weighted by Levenshtein distance)
    for pair in nodePairs:
        firstString = pair[0]
        secondString = pair[1]
        levDistance = editdistance.eval(firstString, secondString)
        gr.add_edge(firstString, secondString, weight=levDistance)

    return gr

def extract_sentences(text, summary_length=100, clean_sentences=False, language='english'):
    """Return a paragraph formatted summary of the source text.

    :param text: A string.
    """
    sent_detector = nltk.data.load('tokenizers/punkt/'+language+'.pickle')
    sentence_tokens = sent_detector.tokenize(text.strip())
    graph = build_graph(sentence_tokens)

    calculated_page_rank = nx.pagerank(graph, weight='weight')

    # most important sentences in ascending order of importance
    sentences = sorted(calculated_page_rank, key=calculated_page_rank.get,
                       reverse=True)

    # return a 100 word summary
    summary = ' '.join(sentences)
    summary_words = summary.split()
    summary_words = summary_words[0:summary_length]
    dot_indices = [idx for idx, word in enumerate(summary_words) if word.find('.') != -1]
    if clean_sentences and dot_indices:
        last_dot = max(dot_indices) + 1
        summary = ' '.join(summary_words[0:last_dot])
    else:
        summary = ' '.join(summary_words)

    return summary

def filter_for_tags(tagged, tags=['NN', 'JJ', 'NNP']):
    """Apply syntactic filters based on POS tags."""
    return [item for item in tagged if item[1] in tags]


def normalize(tagged):
    """Return a list of tuples with the first item's periods removed."""
    return [(item[0].replace('.', ''), item[1]) for item in tagged]

def unique_everseen(iterable, key=None):
    """List unique elements in order of appearance.

    Examples:
        unique_everseen('AAAABBBCCDAABBB') --> A B C D
        unique_everseen('ABBCcAD', str.lower) --> A B C D
    """
    seen = set()
    seen_add = seen.add
    if key is None:
        for element in [x for x in iterable if x not in seen]:
            seen_add(element)
            yield element
    else:
        for element in iterable:
            k = key(element)
            if k not in seen:
                seen_add(k)
                yield element



def uploadSumm(id,keywords,description):


   
    storage.child(id).upload("summary/" + id + '.wav')
    # "https://storage.googleapis.com/podfast-9a8ab.appspot.com/" + id + '.wav'
    accessToken = storage.child(id ).get_url(None)
    
    db = demo()
    
    podcastCollection = db["podcasts"]

    updatePodcast = podcastCollection.find_one_and_update({
        '_id': ObjectId(id)}, {"$set": {
        "summaryUrl": accessToken,
        "description": description,
        "isOnline": True,
    },"$push" : {"tags" : {"$each": keywords}},})


    # print(accessToken)
    # email = "admin@podfast.com"
    # password = "6IoJbs4HD0uj7JiE"
    # firebaseuser = auth.sign_in_with_email_and_password(email=email,password=password)

    # print(storage.credentials)
   

   
    return True


def sendMail(id,getpodcast,uploadstatus):

    db = demo()
    
    userCollection = db["users"]
    creator = userCollection.find_one({'_id': getpodcast['creatorID']})
    
    
    receiver_address = (creator['email'])
    print (sender_address)
    
    if(uploadstatus == True):
        subject = "Podcast uploaded successfully" 
    else:
        subject = "Podcast not uploaded, please check again"         

    
    body = "Hello " +  creator['name'] + "!\n\nThank you for using PodFast!!\n\n Your Podcast Title : " + getpodcast['title'] + "\n" + getpodcast['img'] + "\n"  + "\n" +"\n\n\nWith regards,\nPodFast Admin"
    
    # Endpoint for the SMTP Gmail server (Don't change this!)
    smtp_server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    
    # Login with your Gmail account using SMTP
    smtp_server.login(sender_address, account_password)
    
    # Let's combine the subject and the body onto a single message
    message = f"Subject: {subject}\n\n{body}"
    
    # We'll be sending this message in the above format (Subject:...\n\nBody)
    smtp_server.sendmail(sender_address, receiver_address, message)
    
    # Close our endpoint
    smtp_server.close()

def extract_key_phrases(text):
    """Return a set of key phrases.

    :param text: A string.
    """
    # tokenize the text using nltk
    word_tokens = nltk.word_tokenize(text)

    # assign POS tags to the words in the text
    tagged = nltk.pos_tag(word_tokens)
    textlist = [x[0] for x in tagged]

    tagged = filter_for_tags(tagged)
    tagged = normalize(tagged)

    unique_word_set = unique_everseen([x[0] for x in tagged])
    word_set_list = list(unique_word_set)

    # this will be used to determine adjacent words in order to construct
    # keyphrases with two words

    graph = build_graph(word_set_list)

    # pageRank - initial value of 1.0, error tolerance of 0,0001,
    calculated_page_rank = nx.pagerank(graph, weight='weight')

    # most important words in ascending order of importance
    keyphrases = sorted(calculated_page_rank, key=calculated_page_rank.get,
                        reverse=True)

    # the number of keyphrases returned will be relative to the size of the
    # text (a third of the number of vertices)
    one_third = len(word_set_list) // 3
    keyphrases = keyphrases[0:one_third + 1]

    # take keyphrases with multiple words into consideration as done in the
    # paper - if two words are adjacent in the text and are selected as
    # keywords, join them together
    modified_key_phrases = set([])
    # keeps track of individual keywords that have been joined to form a
    # keyphrase
    dealt_with = set([])
    i = 0
    j = 1
    while j < len(textlist):
        first = textlist[i]
        second = textlist[j]
        if first in keyphrases and second in keyphrases:
            keyphrase = first + ' ' + second
            modified_key_phrases.add(keyphrase)
            dealt_with.add(first)
            dealt_with.add(second)
        else:
            if first in keyphrases and first not in dealt_with:
                modified_key_phrases.add(first)

            # if this is the last word in the text, and it is a keyword, it
            # definitely has no chance of being a keyphrase at this point
            if j == len(textlist) - 1 and second in keyphrases and \
                    second not in dealt_with:
                modified_key_phrases.add(second)

        i = i + 1
        j = j + 1

    return modified_key_phrases


def summary(id):
    print(id)
    db = demo()
    
    podcastCollection = db["podcasts"]
    getpodcast = podcastCollection.find_one({'_id': ObjectId(id)})
    print((getpodcast['url']))    
    audiourl = getpodcast['url']
    filename = 'audio/speech.wav'
    audiopath = urlretrieve(audiourl, filename)
    root_file = "audio/"
    audio_file = audiopath[0]
    split_file = "audio/split/"
    chunk_file = "chunk{0}.wav"
    sound_file = AudioSegment.from_wav(audio_file)
    
    
    audio_chunks = split_on_silence(sound_file, min_silence_len=750, silence_thresh=-45)
    for i, chunk in enumerate(audio_chunks):
        out_file = split_file + chunk_file.format(i)
        chunk.export(out_file, format="wav")
    #     print (out_file)
    length = len(audio_chunks)
    length
    print(length)

    textTranscripts = []


    for i in range (0,length):
        model_path = "models/vosk-model-small-en-us-0.15"
        audio_filename = "audio/split/chunk" + str(i) + ".wav"

        model = Model(model_path)
        wf = wave.open(audio_filename, "rb")
        rec = KaldiRecognizer(model, wf.getframerate())
        rec.SetWords(True)

        # get the list of JSON dictionaries
        results = []
        # recognize speech using vosk model
        while True:
            data = wf.readframes(1000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                part_result = json.loads(rec.Result())
                results.append(part_result)
        part_result = json.loads(rec.FinalResult())
        results.append(part_result)
        
        textTranscripts.append(results)

    print(textTranscripts)
    
    
    count = 0
    for results in textTranscripts:
        
        list_of_Words=[]
        # convert list of JSON dictionaries to list of 'Word' objects

        for sentence in results:
            if len(sentence) == 1:
                # sometimes there are bugs in recognition 
                # and it returns an empty dictionary
                # {'text': ''}
                continue
            for obj in sentence['result']:
                w = Word(obj)  # create custom Word object
                list_of_Words.append(w)  # and add it to list

        wf.close()  # close audiofile

        # output to the screen
        sum = 0
        for word in list_of_Words:
    #         print(word.to_string())
            sum = sum + word.conf
        
    #     print(sum)
    #     print(sum/len(list_of_Words))
        data = {}
        data['WORD'] = []
        for word in list_of_Words:
            data['WORD'].append({
                'startTime': word.start,
                'endTime': word.end,
                'word': word.word
            })
        trans = 'transcripts/transcript' + str(count) + '.json'
        with open(trans, 'w') as outfile:   
            json.dump(data, outfile)
        count+=1

    sentences = []
    for i in range (0,length):
        trans = 'transcripts/transcript' + str(i) + '.json'
        a = open(trans)
        da = json.load(a)
        data = da['WORD']
        sentence = ''
        for i in range (1,len(data)):
            sentence = sentence + data[i]['word'] + " "
    #     print (sentence)
        sentences.append(sentence)

    text = ''
    for i in range (0,len(sentences)):
        text = text + sentences[i] +' $  '+ str(i) + " . "
    # print (text)
    sentences = extract_sentences(text, summary_length=500, clean_sentences=True).split('. ')
    keywords = extract_key_phrases(text)

    sum = ''
    for i in range(0,len(sentences)):
        print(sentences[i])
        sentences[i] = sentences[i].replace('.',' ')

    description = ""
    auddsumm = AudioSegment.from_wav("audio/split/chunk0.wav")
    for i in range (0,len(sentences)):
        arr = sentences[i].split('$')
        description += arr[0]
        temp = AudioSegment.from_wav("audio/split/chunk" + str(int(arr[1])) + ".wav")
        auddsumm += temp
    auddsumm += AudioSegment.from_wav("audio/split/chunk"+ str(length -1) + ".wav")
    auddsumm.export("summary/" + id + '.wav', format="wav")

    if(uploadSumm(id,list(keywords),description)):
        sendMail(id,getpodcast,True)
    else:
        sendMail(id,getpodcast,False)

    dir = 'audio/split'
    for f in os.listdir(dir):
        os.remove(os.path.join(dir, f))

    dir = 'transcripts'
    for f in os.listdir(dir):
        os.remove(os.path.join(dir, f))
    dir = 'summary'
    for f in os.listdir(dir):
        os.remove(os.path.join(dir, f))
    
    return True
