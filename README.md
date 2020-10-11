Les Eco-Pattes
---

Développement de l'application destinée aux Eco-Pattes, le tout en ReactJS. Les données sont gérées via le prjte freeasso.

# Démarrer le développement

## Avec docker

Cloner se projet et les 2 projets suivant au même niveau :

* jsonapi-front
* react-bootstrap-front

Se placer dans le répertoire des les-eco-pattes et lancer la commande :

```
    docker-compose up
```

## En local

Il faut au minimum nodejs et npm pour le développement. Le site a été réalisé avec l'IDE rekit qui permet d'avoir une interface dédiée au développement ReactJS

## IDE, ...

Au préalable

```
   npm install -g rekit
   npm install -g rekit-studio
```

Démarrer l'application

```
   npm start
```

Démarrer le studio

```
   npm run studio
   // Ou
   rekit-studio -p 8176
```

Ouvrir un navigateur et navigurer vers :

* http://localhost:8176 pour accéder à l'IDE rekit
* http://localhost:8175 pour lancer l'application en hot-reload.
