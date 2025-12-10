#!/bin/bash

# Vérifier qu'un container_id est fourni
if [ -z "$1" ]; then
  echo "Usage: $0 <container_id>"
  exit 1
fi

CONTAINER_ID=$1

# Récupérer le PID du conteneur
PID=$(docker inspect --format '{{.State.Pid}}' "$CONTAINER_ID")

if [ -z "$PID" ] || [ "$PID" -eq 0 ]; then
  echo "Impossible de récupérer le PID pour le conteneur $CONTAINER_ID"
  exit 1
fi

echo "PID du conteneur $CONTAINER_ID : $PID"

# Tuer le processus principal
sudo kill -9 "$PID"

if [ $? -eq 0 ]; then
  echo "Conteneur $CONTAINER_ID tué avec succès."
else
  echo "Échec lors de la tentative de kill du conteneur $CONTAINER_ID."
fi

