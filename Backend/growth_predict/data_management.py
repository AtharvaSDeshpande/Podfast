import pandas as pd
from .data_cleaner import DataCleaner

class DataManager:
    def __init__(self,data):
        self.comment = data
        self.cleaned_review =""
        # self.df = data
        # print(self.df)
        # self.genres = []
        # self.reviews = []
        # self.cleaned_reviews = []
        self.sentiment=""
        self.cleaner = DataCleaner()

    def create_lists(self):
        print("create list")
        for index, row in self.df.iterrows():
            if(self.cleaner.abuse_detect(row['reviews'])):
                self.genres.append(row['genre'])
                self.reviews.append(row['reviews'])
            else:
                print("abuse predict: "+row['reviews'])

    def initiate_cleaning(self):
        print("intitiate_cleaning")
        # self.df = self.df.dropna()
        # self.create_lists()

        print('cleaning reviews')
        self.cleaned_review = self.cleaner.clean_data(self.comment)
        print("\nreviews")
        print(self.cleaned_review)

        self.sentiment = self.cleaner.analyze_review(self.cleaned_review)

    def get_result(self):
        return self.sentiment
        
    def create_dataframe(self):
        print("create_dataframe")
        new_df = pd.DataFrame(columns=['genre','reviews','sentiment'])
        
        print("size:" + "genre: ")
        print(len(self.genres) )
        print(" reviews: ")
        print(len(self.cleaned_reviews))
        new_df['genre'] = self.genres
        new_df['reviews'] = self.cleaned_reviews
        new_df['sentiment'] = self.sentiments

        return new_df
