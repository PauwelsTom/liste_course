#!/bin/bash

cd db
docker compose up -d

cd ../backend
docker build -t backend . && docker rm -f backend && docker run -d --name backend --network liste_course -p 8000:8000 backend

cd ../frontend
npm start