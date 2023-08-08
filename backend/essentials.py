import sqlite3
import pandas as pd
import numpy as np

class connection_database:
    def __init__(self) -> None:
        self.conn = sqlite3.connect('jsondata.db')
        self.cursor = self.conn.cursor()
    
    def create_dataframe(self):
        self.df = pd.read_sql_query("SELECT * FROM USINDUSTRY",self.conn)
        return self.df
    
    def refine_data(self):
        self.df = self.create_dataframe()
        df2 = self.df.replace('', np.nan)
        df2["start_year"].replace(to_replace=np.NAN,value = "Undefined",inplace=True)
        df2["end_year"].replace(to_replace = np.NAN,value = "Undefined",inplace=True)
        df2["intensity"].replace(np.NAN,0,inplace=True)

        columns = df2.dtypes.to_dict()

        for column in columns:
            if columns[column] == 'object':
                df2[column].replace(to_replace=np.NAN,value = "Undefined",inplace=True)
            else:
                df2[column].replace(to_replace=np.NAN,value = 0,inplace=True)

        
        return df2



if __name__ == "__main__":
    from json import loads, dumps
    new_conn = connection_database()
    df = new_conn.refine_data()
    print(df.head())