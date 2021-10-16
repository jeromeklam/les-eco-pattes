export default `

# Version 2.2.0 : 14/10/2021
  * Général
    * Nouvelle animation de chargement
    * Les sélecteurs, si remplis, se transforment au bouton pour accéder au zoom
    * Les critères de sélections sur les sélecteurs ont été améliorés
    * Uniformisation des listes
  * Tableau de bord
    * Couleurs plus soft
  * Animaux
    * Correction de la gestion du masque
  * Menus
    * Suppression du menu Stock qui n'est pas géré pour le moment 
# Version 2.1.0 : 15/09/2021
  * Général
    * Diminution de la taille de tous les textes
  * Variables de type liste
    * Gestion des valeurs par défaut supprimées : elles n'apparaissent plus dans les listes déroulantes
  * Carte
    * Correction du déplacement d'un site
  * Sites
    * Ne sont visibles dans la liste des animaux que ceux qui ne sont pas sortis
    * Ne sont comptabilisés sur le compteur 'animaux' dans la liste des sites que les animaux qui ne sont pas sortis
    * Lors de la suppression d'un site, suppression en cascade des images et des documents
  * Contrats
    * Correction sur l'affichage de la coche 'Actif' des contrats
  * Mouvements
    * Correction dans la création de mouvements
    * Dans mle tableau de bord, seuls les mouvements sont affichés et pas tous les animaux en attente
    * Ajout d'un bouton validation de mouvement dans la liste des mouvements et sur la fiche d'un mouvement

# Version 2.0.1 : 11/11/2020
  * Général
    * Déconnexion depuis le menu "Mon compte", accessible depuis l'avatar.
    * Correction dans la recherche sous forme de liste dans les filtres
    * Aide à la recherche pour les sous-élements dans les filtres (sélecteur)
    * Ajout de la gestion des cookies (RGPD)
    * Page publique complétée
  * Personnes > Contacts
    * Possibilité pour les vétérinaires d'être attaché à une clinique avec une coche Sanitaire
    * Depuis les cliniques affichage de la liste des vétérinaires attachés
    * Début de la gestion des familles (structure) pour les particuliers
  * Site
    * Si site attacché à une clinique, affichage de la liste des vétérinaires liés

# Version 2.0.0 : 25/10/2020
  * Authentification
    * Correction dans le changement de mot de passe
    * Correction dans le changement d'avatar
    * Correction dans la modification des préférences
  * Tableau de bord
    * Bloc alertes
      * Affichage des alertes avec une date d'échéance dépassée avec un icône
      * Affichage des alertes pour des tâches à effectuer dans les 8 jours
  * Contrats
    * Ajout d'une coche sous-traitant
  * Technique
    * Nouvelles versions des librairies de développement

# Version 1.4.0 : 04/10/2020
  * Général
    * Filtres
      * Modification du fonctionnement des filtres
      * Suppression du pied de page avec le lien Facebook une fois connecté
  * Tableau de bord
    * Ajout d'un bouton pour passer en mode mofification de la taille ou de la position des blocs
  * Animaux
    * Affichage de la description (ou motif de sortie) corrigée
    * Ajout Mâle castré dans la liste M/F
    * Correction dans la saisie du père ou de la mère
    * Suppression de la possibilité de déplacer un animal sans mouvement attaché
    * Dans les filtres ajout du motif de sortie
  * Sites
    * Gestion de la suppression d'un site (impossible si des éléments sont déjà saisis dessus)
    * Suivi
      * Ajout d'un onglet pour saisir ce qui a été fait su un site et possibilité de créer des tâches récurrentes à effectuer
  * Mouvement
    * Correction du changement de statut d'un mouvement qui ne modifiait pas le site des animaux
  * Contrats
    * Ajout d'une gestion des contrats
  * Tâches
    * Ajout d'une gestion des tâches à effectuer
  * Tableau de bord
    * Affichage des alertes sur les tâches à effectuer
    * Pour changer le positionnement ou la taille des blocs il faut passer en édition du tableau de bord (icône avec crayon).
  * Agenda
    * Ajout d'un agenda pour voir les tâches, suivis et autres rendez-vous


# Version 1.3.1 : 10/08/2020
  * Sites
    * Fiche
      * Ajout d'une coche Externe
      * Ajout d'un commentaire sur les photos
    * Liste
      * Si site externe ajout d'un icône pour indiquer que ce n'est pas un vrai site
      * Par défaut les sites externes ne sont pas dans la liste, il aller dans les filtres si on veut les retrouver
  * Animaux
    * Fiche
      * Ajout d'un commentaire sur les photos
      * Ajout d'une coche conformité + saisie d'un commentaire si l'animal n'est pas conforme
      * La liste déroulante des soins donne sur une variable dans les paramètres (possibilité d'en ajouter)
    * Liste
      * Si animal sorti, dans la colonne description, on voit le motif de sortie et plus le commentaire

# Version 1.2.2 : 31/07/2020
  * Général
    * Modification de la taille des fenêtres pour quelles soient mieux affichées sur une plus petite résolution
    * Ajout d'un trait autour des boutons
  * Tableau de bord
    * Nombre de sites Actifs
    * Nombre d'animaux Actifs
    * Linéaire des clôtures posées
  * Sites
    * Liste
      * Ajout de la colonne Type
      * Ajout de la colonne Nombre d'animaux
      * Par défaut, on n'a dans la liste que les sites qui n'ont pas de date de fin de validité
        ou une date supérieure à la date du jour
    * Fiche
      * Suppression de la coche "Conforme"
      * N° EDE devient obligatoire
  * Animaux
    * Liste
      * Correction sur l'option "Tout sélectionner"
      * La première colonne est le numéro de boucle
      * Ajout de la colonne "En attente", si l'animal est en attente, il y a dans la colonne une montre
      * Par défaut, on a dans la liste tous les animaux qui n'ont pas de date de fin de validité
        ou une date supérieure à la date du jour
        et donc, les animaux en attente seront dans la liste si leur date de fin de validité est ok
      * La recherche d'un éleveur s'ouvre directement avec la liste de tous les éleveurs
      * De même la recherche d'un vétérinaire dans la saisie d'une ligne de maladie s'ouvre directement sur la liste des vétérinaires
    * Fiche
      * Le N° de boucle devient obligatoire et plus le nom
      * Modification de la taille des vignettes des images et des documents liés
        car dans certains cas la visualisation et la suppression ne fonctionnait pas
      * Ajout de la coche "En attente"
  * Mouvement
    * Création depuis une liste d'animaux d'un site
      * Si des animaux sont sélectionnés, on peut créer un mouvement ou une sortie
        Le site de départ est pré-rempli et non modifiable
      * Si aucun animal n'est sélectionné, on peut juste créer une entrée
        Le site d'arrivée est pré-rempli et non modifiable
    * Fiche
      * Suppression de l'en-tête du mouvement, les informations sont seulement dans les onglets
      * Ajout d'un état "archivé" qui empêche toute modification
      * Suppression impossible d'un mouvement validé ou archivé

# Version 1.2.1 : 15/06/2020
* Général
    * Les listes avec filtres par défaut passent en mode ET,
    * La recherche via la loupe ne fonctionnait plus sur les fiches, fenêtres modifiées en look,
    * Adaptation de fenêtres de validation
    * Ajustement des critères de recherche pour les chargements
    * Changement de certains éléments graphiques
* Personnes
    * Correction d'un problème d'affichage et de rafraichissement en cas de modification
    * Correction de la saisie de l'email2
* Animaux
    * Correction du champ année de naissance, il manquait la possibilité de remise à zéro
* Mouvements
    * Adaptation de la saisie, quelques bugs d'affichage
    * Uniformisation des libellés des statuts, il restait quelques valeurs en "dur"

# Version 1.2.0 : 07/06/2020
* Général
    * Ajustements des barres de défilement pour Windows
    * Amélioration de la saisie des dates et dates heures
    * Ajustements graphiques (fenêtres, uniformisation des boutons)
* Sites
    * Problème d'activation des champs (linéaire et type de clôture posé)
* Animaux
    * Problème d'activation du champ motif de sortie
* Mouvements
    * Adaptation de la fiche de saisie des mouvements
    * Saisie en masse des mouvements
    * Mouvements possibles depuis la fiche des sites

# Version 1.1.0 : 24/05/2020
* Général
    * Léger ajustement du menu de gauche au niveau des couleurs et sous-menu visible avec fond blanc.
    * Champ date modifié avec masque de saisie, contrôle et nouveau sélecteur
* Listes
    * Meilleur ajustement des colonnes et contenu mois serré
    * Police réduite pour afficher plus d'informations
    * Ajustement sur les filtres : couleurs, nouveaux opérateurs, filtres par défaut
    * Passage en modification au double-clic
    * Fermerture des éléments périphériques avant modification pour éviter les soucis de rafraîchissement
    * Ouverture des éléments en "inline" avec icônes de navigation à droite et élément sélectionné plus visible + couleur
    * Messages lors des anomalies de suppression (il est en effet impossible, par exemple, de supprimer un site avec des animaux liés à ce dernier)
    * Correction d'un bug d'affichage des accents, ... pour les colonnes contenant des commentaires
* Saisie
    * Les saisies modales (qui prennent le contrôle total du clavier et de l'écran) sont le comportement par défaut pour tous les éléments
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
    * Blocage de la suppression le temps de mieux gérer cela.
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
    * Ajout en colonne de l'adresse type et catégorie (également dans les filtres)

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
    * Lignes des listes séparées par un trait horizontal
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
        * Formatage du numéro d'élevage en <code pays : 2 lettres>.<code Inseee : 5 chiffres>.<code exploitation : 3 chiffres>
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
        * Formatage du numéro de boucle en <code pays : 2 lettres>.<code exploitation : 6 chiffres>.<numéro d'ordre : 5 chiffres>
* Personnes
    * Liste
        * Membres renommé en Personnes
`;
