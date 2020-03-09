export default `

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