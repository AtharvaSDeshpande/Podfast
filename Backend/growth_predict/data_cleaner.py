from nltk.tokenize import word_tokenize
import string
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from cuss_inspect import predict, predict_prob
from transformers import pipeline
import pickle
class DataCleaner:
    def __init__(self):
        self.stopwords = self.create_stopwords()
        

    def clean_data(self, comment):
        cleaned_list = []

        # for element in list_to_clean:
        try:
            tokens = word_tokenize(comment)
        except TypeError:
            print("clean data function")
            print(comment)

        no_punctuation = [self.keep_text_only(w) for w in tokens] #remove punctuation
        lower_case = [w.lower() for w in no_punctuation] #convert all text into lower-case
        adjusted = [self.adjust_contractions(w) for w in lower_case] #convertall words such as didn't don't to normal form
        stopped = [w for w in adjusted if w not in self.stopwords] #remove all negate words
        string = ' '.join(w for w in stopped)
        # cleaned_list.append(string)
        
        print("review after cleaning: "+string)
        return string
    
    def abuse_detect(self,review):
        if(predict_prob(review)<0.8):
            return True
        return False
    
    def extract_features(self,word_list):
        return dict([(word, True) for word in word_list])

    @staticmethod
    def keep_text_only(text):
        whitelist = string.ascii_letters + ' ' + "'"
        try:
            cleaned_text = ''.join(character for character in text if character in whitelist)
        except TypeError:
            cleaned_text = ''

        return cleaned_text
    
    def analyze_review(self,reviews):
        print("sentiment analyses")
        sentiments = []
        # with open('/home/ubantu/Desktop/PodFast/podfast/Podfast/Backend/growth_predict/classifier.pkl', 'rb') as fid:
        #     model =  pickle.load(fid)
        # for review in reviews:
        #     probdist = model.prob_classify(self.extract_features(review.split()))
        #     pred_sentiment = probdist.max()
        #     print(pred_sentiment)
        sentiment_pipeline = pipeline("sentiment-analysis")
        res = sentiment_pipeline(reviews)
        print(res)
        result = res[0]['label']
        print(result)
        # sentiments.append(result)
        return result

    @staticmethod
    def adjust_contractions(string):
        string = string.replace("n't", 'not')
        string = string.replace("'m", '')
        string = string.replace("'s", '')

        return string

    @staticmethod
    def create_stopwords():
        white_list = ['not']
        stop_words = set(stopwords.words('english'))
        stop_words = [w for w in stop_words if w not in white_list]
        return stop_words

