# liste_course
Application pour faire la liste des courses


## Modification de la structure de la db

Si tu es en phase de dev et que tu peux tout supprimer, fais:

```
    docker-compose down -v
    docker-compose up -d
```

Ça va relancer ton docker, et donc ta base de données. Elle sera donc vidée de tous les éléments, mais à la forme que tu veux.


## Démarrage du backend

Pour démarrer le backend, il faut faire la commande:

```
    uvicorn main:app --reload
```

Le backend sera lancé et se mettra à jour à chaque modification effectuée.


## Démarrage du frontend

Pour démarrer le frontend, il faut faire la commande:

```
    npm start
```

Le frontend sera lancé et se mettra à jour à chaque modification effectuée.