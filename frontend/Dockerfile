# Étape 1 : Build du frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copier les dépendances
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copier le code source
COPY . .

# Construire l'app React pour la prod
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine

# Supprimer la config par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés vers nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copier une config nginx personnalisée (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
