from essentials import *
import json

class visualize:
    
    def __init__(self):
        new_conn = connection_database()
        self.df = new_conn.refine_data()
    
    def show_db(self) -> dict:
        return self.df.to_json()

    def show_columns(self) -> list:
        return list(self.df.columns)
    
    def count_bar(self,filter):
        return self.df[filter].value_counts().head(10).to_json()
    
    def constrains_bar(self,filter1,constrain,filter2):
        return self.df[self.df[filter1] == constrain][filter2].head(10).to_json()
    
    def groupby_histo(self,filter1,filter2):
        sorted_df = self.df.groupby([filter1,filter2]).size().unstack()
        sorted_df['sum'] = sorted_df.sum(axis=1)
        return sorted_df.sort_values(by='sum',ascending=False).head(10).drop(columns=['sum']).to_json()
    
    def count_line(self,filter):
        return self.df.groupby([filter]).size().head(10).to_json()
    
    def get_uniq_values(self,filter):
        ret = self.df[filter].unique().tolist()
        return json.dumps(ret)
    

if __name__ == "__main__":
    new_vis = visualize()
    #print(new_vis.show_db())
    #rint(new_vis.show_columns())
    #print(new_vis.count_bar('country'))
    print(new_vis.constrains_bar('country','India','likelihood'))
    print(new_vis.groupby_histo('country','likelihood'))
    print(new_vis.count_line('start_year'))