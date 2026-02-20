import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import CountVectorizer

# Load model once (global or cached) to avoid reloading
# 'all-MiniLM-L6-v2' is a lightweight, fast model for semantic similarity
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
except Exception as e:
    print(f"Error loading SentenceTransformer: {e}")
    model = None

def extract_keywords(text: str, top_n: int = 10) -> list:
    """
    Extracts keywords/keyphrases from text using Sentence Transformers
    to rank candidates by semantic relevance.
    """
    if not model or not text:
        return []

    # 1. Extract candidate words/phrases (n-gram range 1-2)
    n_gram_range = (1, 2)
    stop_words = "english"
    
    try:
        count = CountVectorizer(ngram_range=n_gram_range, stop_words=stop_words).fit([text])
        candidates = count.get_feature_names_out()
    except ValueError:
        return []

    if len(candidates) == 0:
        return []

    # 2. Encode document and candidates
    doc_embedding = model.encode([text])
    candidate_embeddings = model.encode(candidates)

    # 3. Calculate similarity
    distances = cosine_similarity(doc_embedding, candidate_embeddings)
    
    # 4. Get top N keywords
    keywords = [candidates[index] for index in distances.argsort()[0][-top_n:]]
    return keywords

def calculate_ats_score(resume_text: str, job_description: str) -> dict:
    """
    Calculates ATS score based on keyword matching and semantic similarity.
    """
    if not model:
        return {"score": 0, "missing_keywords": [], "matching_keywords": []}

    # 1. Extract keywords from Job Description
    jd_keywords = extract_keywords(job_description, top_n=20)
    
    # 2. Check for presence in Resume
    resume_text_lower = resume_text.lower()
    matching_keywords = [kw for kw in jd_keywords if kw in resume_text_lower]
    missing_keywords = [kw for kw in jd_keywords if kw not in resume_text_lower]
    
    # 3. Calculate Keyword Match Score (50% weight)
    if len(jd_keywords) > 0:
        keyword_score = (len(matching_keywords) / len(jd_keywords)) * 100
    else:
        keyword_score = 0
        
    # 4. Calculate Semantic Similarity Score (50% weight)
    embeddings = model.encode([resume_text, job_description])
    semantic_score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0] * 100
    
    # 5. Final Weighted Score
    final_score = (0.4 * keyword_score) + (0.6 * semantic_score)
    
    return {
        "ats_score": round(float(final_score), 2),
        "semantic_score": round(float(semantic_score), 2),
        "keyword_match_score": round(float(keyword_score), 2),
        "missing_keywords": missing_keywords,
        "matching_keywords": matching_keywords
    }
