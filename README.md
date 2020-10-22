# FunSport

## Cahier des charges
(ce qui suit est la copie du cahier des charges transmis)

### Objectifs du projet

L’objectif de ce projet est de créer un site permettant d’avoir un suivi sur plusieurs sports, y compris les sports féminins (autant que possible) :
- News des sports suivis,
- Compétitions nationales et internationales,
- Classement des championnats,

L’utilisateur pourra suivre les compétitions, commenter des matchs, émettre des pronostics,partager sur les réseaux sociaux les résultats d’un match.

### Fonctionnalités
#### Navigation publique
L’utilisateur public peut consulter les résultats des compétitions ou matchs terminés desdifférents sports ainsi qu’aux scores en direct mais ne peut ni commenter, ni émettre unpronostic, ni définir de favoris.Les fonctionnalités de commentaire, pronostic et favoris sont visibles mais renvoient vers la pagede login/register.Les sports proposés à l'utilisateur doivent comprendre au minimum 4 sports, par exempleFootball, Tennis, Rugby, Basket et lorsque c’est possible la catégorie féminine (n’oublions pasnos championnes ! ).

#### Utilisateur connecté
L’utilisateur connecté peut :
- consulter tous les sports proposés
- suivre les informations de ses sports
- commenter les informations de tous les sports
- commenter les matchs
- indiquer son pronostic pour l’issue du match
- commenter son pronostic

#### Pronotics
La côte du match est récupérée via API
- L’utilisateur connecté peut ajouter un pronostic au match tant que celui-ci n’a pascommencé.
- Une fois le match commencé, le pronostic ne peut plus être donné.
- Le pronostic correspond à la moyenne de chaque contributeur

#### Classements
Pour chaque championnat Possibilité de trier les classements en fonction des informations dechaque colonne

#### Résultats en direct
- Liste des matchs actuellement en cours
- Sur la page dédiée à chacun des matchs, l’utilisateur voit la côte de chaqueéquipe, peut indiquer son propre pronostic et commenter le match

#### Informations
création d'articles en texte riche, avec la possibilité d’inclure les données sportives dansses articles en les récupérant de l’API)ex: article sur les 10 meilleurs buteurs de Ligue 1 Uber Eats en récupérant les info viaAPI.

### API proposée

-https://www.api-football.com/pricing  
-https://developer.sportradar.com/docs/read/Home#getting-started  
-https://rapidapi.com/api-sports/api/api-nba  
-https://rapidapi.com/sportcontentapi/api/tennis-live-data/endpoints  

## Délai

Le projet est réalisé en 3 semaines

## Technologies utilisées
Backend : Nestjs  
Frontend : Vuejs  
Base de donnée : Mongodb

## Comment l'exécuter

Clone the repo où vous voulez  
`git clone git@github.com:YohannEpitech/FunSport.git`  
Aller à l'intérieur du dossier cloné  
`cd FunSport`  
Renommer le fichier env.config.js.example en env.config.js et remplacer les 2 champs "Your CLIENT_ID" par votre client_id apifootball et client_id pandascore 
Egalement, vous pouvez remplacer BACK_URL en fonction de votre configuration. 
`module.exports = {
    API_PANDA_SPORT:"Your CLIEND_ID",
    API_FOOTBALL:"Your CLIEND_ID",
    API_BACKEND:"BACK_URL"
};`

Installer les dépendances de Nodejs (commande à exécuter dans le dossier back et front)  
`npm install`  

Lancer le serveur front   
`cd front`  
`npm run serve`  

Lancer le serveur back  
`cd back`  
`npm start`  

## L'équipe

Vous êtes curieux de savoir qui a travaillé sur le projet  
Lotfi Doucanef  
Gacem Ben ayad  
YohannEpitech  
Kevin Bridonneau  

## Licence

Ce projet est sous licence GNU3.
