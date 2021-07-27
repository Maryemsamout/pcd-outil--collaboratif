# Load EDA Pkgs
import pandas as pd
import neattext.functions as nfx
# Load ML/Rc Pkgs
from sklearn.feature_extraction.text import CountVectorizer,TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity,linear_kernel
# Load our dataset
df = pd.read_csv(r"C:\Users\Asus\Downloads\courses.csv")
df.head()
df['CoursName']
dir(nfx)
# Clean Text:stopwords,special charac
df['clean_CoursName'] = df['CoursName'].apply(nfx.remove_stopwords)
# Clean Text:stopwords,special charac
df['clean_CoursName'] = df['clean_CoursName'].apply(nfx.remove_special_characters)
# Vectorize our Text
count_vect = CountVectorizer()
cv_mat = count_vect.fit_transform(df['clean_CoursName'])
# Sparse
cv_mat
# Dense
cv_mat.todense()
df_cv_words = pd.DataFrame(cv_mat.todense(),columns=count_vect.get_feature_names())
df_cv_words.head()
# Cosine Similarity Matrix
cosine_sim_mat = cosine_similarity(cv_mat)
cosine_sim_mat
# import seaborn as sns
# sns.heatmap(cosine_sim_mat[0:10],annot=True)
df.head()
# Get Course ID/Index
course_indices = pd.Series(df.index,index=df['CoursName']).drop_duplicates()
course_indices
course_indices['java']
idx = course_indices['java']
idx

scores = list(enumerate(cosine_sim_mat[idx]))

scores
# Sort our scores per cosine score
sorted_scores = sorted(scores,key=lambda x:x[1],reverse=True)
# Omit the First Value/itself
sorted_scores[1:]
# Selected Courses Indices
selected_course_indices = [i[0] for i in sorted_scores[1:]]
selected_course_indices
# Selected Courses Scores
selected_course_scores = [i[1] for i in sorted_scores[1:]]
recommended_result = df['CoursName'].iloc[selected_course_indices]
rec_df = pd.DataFrame(recommended_result)
rec_df.head()
rec_df['similarity_scores'] = selected_course_scores
rec_df
def recommend_course(name,num_of_rec=2):
    # ID for title
    idx = course_indices[name]
    # Course Indice
    # Search inside cosine_sim_mat
    scores = list(enumerate(cosine_sim_mat[idx]))
    # Scores
    # Sort Scores
    sorted_scores = sorted(scores,key=lambda x:x[1],reverse=True)
    # Recomm
    selected_course_indices = [i[0] for i in sorted_scores[1:]]
    selected_course_scores = [i[1] for i in sorted_scores[1:]]
    result = df['CoursName'].iloc[selected_course_indices]
    rec_df = pd.DataFrame(result)
    rec_df['similarity_scores'] = selected_course_scores
    return rec_df.head(num_of_rec)
    recommend_course('Trading Options Basics',4)