export default `

# Version 1.1.0 : 24/05/2020

* Général
    * Léger ajustement du menu de gauche au niveau des couleurs et sous-menu visible avec fond blanc.
    * Champ date modifié avec masque de saisie, contrôle et nouveau sélecteur
* Listes
    * Meilleur ajustement des colonnes et contenu mois serré
    * Police réduite pour afficher plus d'informations
    * Ajustement sur les filtres : couleurs, nouveaux opérateurs, filtres par défaut
    * Passage en modification au double-clic
    * Fermerture des éléments périphériques avant modification pour éviter les soucis de rafraichissement
    * Ouverture des éléments en "inline" avec icônes de navigation à droite et élément sélectionné plus visible + couleur
    * Messages lors des anomalies de suppression (il est en effet impossible, par exemple, de supprimer un site avec des animaux liés à ce dernier)
    * Correction d'un bug d'affichage des accents, ... pour les colonnes contenant des commentaires
* Saisie
    * Les saisies modales sont le comportement par défaut pour tous les éléments
    * Les fenêtres de saisie ont été retaillées.
    * Ajout des éléments annexes en saisie directe dans les modales (enregistrement direct de ces éléments)
    * Les sélecteurs d'élément (site, personne, ...), permettent maintenant de zoomer sur un élément sélectionné
    * Meilleure gestion des champs obligatoires avec message en dessous du champ, au pîre en notification.
    * Champ sélecteur d'année avec possibilité d'utiliser un + / -
* Races
    * Ajout en plus de l'expression de contrôle, d'un masque de saisie (documentation en préparation)
* Maladies
    * Gestion possible sous forme de sélecteur
* Variables
    * Blocage de la suppresion le temps de mieux gérer celà.
* Tableau de bord
    * Bouton permettant de sauvegarder la position des blocs pour l'utilisateur connecté
* Carte
    * Utilisation des filtres sur sites (à venir un accès aux filtres depuis la carte, en attendant il faut passer par les sites pour modifier les filtres)
    * Indication des sites sans coordonnées pour pouvoir les géolocaliser (point de départ à Montigny-les-Metz)
    * Accès en modification au site et aux données périphériques
* Sites
    * Gestion du numéro en fonction du site principal, masque de saisie, contrôle
    * Ajout de dates de validité
    * Linéaire clôture posé / existant
    * Par défaut la liste est réduite aux sites encore valides (filtre par défaut)
    * Ajout sur la liste d'un bouton permettant l'accès direct à la carte avec positionnement si les coordonnées sont renseignées
    * Ajout sous forme d'onglet des éléments périphériques : poids, documents, ... (!! : enregistrés directement)
* Animaux
    * Ajout du nom dans la liste
    * Ajout d'un champ raison de sortie si la date de fin est renseignée (à venir : le côté obligatoire)
    * Ajout d'un masque de saisie et contrôle du n° de boucle (en fonction de la race)
    * Par défaut la liste est réduite aux animaux non sortis (filtre par défaut)
    * Possibilité d'ajouter des photos
    * Ajout sous forme d'onglet des éléments périphériques : poids, documents, ... (!! : enregistrés directement)
    * Gestion d'un type de maladie
    * Correction d'affichage de la liste des mouvements
* Personnes
    * Ajout en colonne de l'addrese type et catégorie (également dans les filtres)

# Version 1.0.3 : 09/03/2020

* Général
    * Encore quelques petites adaptations de look
    * Correction de bugs mineurs d'affichage
    * Test sur les listes principales d'une barre de défilement "custom"
* Saisie
    * Nouveau champ date permettant de gérér data / heure / date + heure
    * Nouveau champ de saisie texte
* tableau de bord
    * Possibilité de déplacer les éléments
    * Possibilité de redimensionner les éléments
    * Stockage pour l'instant en session des positions des blocs
    * Ajout d'actions sur les différents éléments
* Stock
    * Début de gestion des familles
    * Correction de bugs d'affichage 

# Version 1.0.2 : 23/02/2020

* Général
    * Sites, animaux et clients disponibles sous forme de pop-up
    * Sexe des animaux géré sous forme d'icône dans les listes
    * Début d'uniformisation des icônes
    * Icône de gestion d'aide pour explication des fonctions
* Animaux
    * Gestion des croissances
    * Gestion des maladies
    * Mouvements
    * Descendance
    * Formatage du numéro de boucle en fonction de la race
* SIte
    * Gestion du formatage en fonction du type
* Maladies
    * Gestion de la description des maladies
    * Début de gestion des médicaments (stock)
    * Maladies des animaux

# Version 1.0.1 : 09/02/2020

* Reprise de données
    * Gestion provenance et éleveur
    * Formatage n° EDE 
    * Formatage n° Boucle
* Général
    * Ajout des champs composant le tri dans l'en-tête de la recherche
    * Lignes des listes séparée par un trait horizontal
    * Look des sélecteurs adapté
    * Affichage de plusieurs informations pour les résultats des sélecteurs
    * Affichage de plusieurs informations pour les saisies assistées
* Types de site
    * Ajout d'une expression régulière pour controler la saisie du n° EDE en création
* Races
    * Ajout d'une expression régulière pour controler la saisie du n° de boucle en création
* Sites :
    * Liste
        * Ajout du numéro EDE et du site principal
    * Fiche
        * Ajout de la gestion d'un site principal
        * Ajout d'un flag conformité et d'un champ texte dédié
        * Formatage du numéro d'élevage en &lt;code pays : 2 lettres&gt;.&lt;code Inseee : 5 chiffres&gt;.&lt;code exploitation : 3 chiffres&gt;
    * Sélecteur
        * Possibilité de filtrer par n° EDE
* Animaux
    * Liste
        * Recherche rapide par n° de boucle
        * Nom renommé en N° boucle
        * Type renommé en Race
    * Fiche
        * Sélecteur mère avec Femelle par défaut
        * Sélecteur père avec Male par défaut
        * Champ provenance simple supprimé
        * Ajout Provenance et Eleveur via Personnes
        * Formatage du numéro de boucle en &lt;code pays : 2 lettres&gt;.&lt;code exploitation : 6 chiffres&gt;.&lt;numéro d'ordre : 5 chiffres&gt;
* Personnes
    * Liste
        * Membres renommé en Personnes  
`;