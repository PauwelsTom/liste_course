from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from database import SessionLocal, engine, Base
import Endpoints.Ingredients
import Endpoints.Foyer
import Endpoints.IngrRecette
import Endpoints.Recette



# Crée les tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Shopping List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ton front React
    allow_credentials=True,
    allow_methods=["*"],  # autorise toutes les méthodes HTTP
    allow_headers=["*"],  # autorise tous les headers
)

# Dépendance pour la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Bienvenue dans l'API liste de courses 🚀"}

Endpoints.Ingredients.all(app, get_db)
Endpoints.Foyer.all(app, get_db)
Endpoints.IngrRecette.all(app, get_db)
Endpoints.Recette.all(app, get_db)