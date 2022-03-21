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



#AudioSegment.converter = "C:/ffmpeg/bin/ffmpeg.exe"
root_file = "audio/"
audio_file = "audio/Podcast1.wav"
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

text = ''
for i in range (0,len(sentences)):
    text = text + sentences[i] +' $  '+ str(i) + " . "
# print (text)
sentences = extract_sentences(text, summary_length=500, clean_sentences=True).split('. ')

sum = ''
for i in range(0,len(sentences)):
    print(sentences[i])
    sentences[i] = sentences[i].replace('.',' ')

auddsumm = AudioSegment.from_wav("audio/split/chunk0.wav")
for i in range (0,len(sentences)):
    arr = sentences[i].split('$')
    temp = AudioSegment.from_wav("audio/split/chunk" + str(int(arr[1])) + ".wav")
    auddsumm += temp
auddsumm += AudioSegment.from_wav("audio/split/chunk"+ str(length -1) + ".wav")
auddsumm.export("audio_summary1.wav", format="wav")
