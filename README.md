# FunSport

               <div class="content getting-started">
                   <div class="content-data">

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<h2 id="description">Description</h2>
<p><a href="https://github.com/nestjs/nest">Nest</a> framework TypeScript starter repository.</p>
<h2 id="installation">Installation</h2>
<div><pre class="line-numbers"><code class="language-bash">$ npm install</code></pre></div><h2 id="running-the-app">Running the app</h2>
<div><pre class="line-numbers"><code class="language-bash"># development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod</code></pre></div><h2 id="test">Test</h2>
<div><pre class="line-numbers"><code class="language-bash"># unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov</code></pre></div><h2 id="support">Support</h2>
<p>Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you&#39;d like to join them, please <a href="https://docs.nestjs.com/support">read more here</a>.</p>
<h2 id="stay-in-touch">Stay in touch</h2>
<ul>
<li>Author - <a href="https://kamilmysliwiec.com">Kamil Myśliwiec</a></li>
<li>Website - <a href="https://nestjs.com/">https://nestjs.com</a></li>
<li>Twitter - <a href="https://twitter.com/nestframework">@nestframework</a></li>
</ul>
<h2 id="license">License</h2>
<p>  Nest is <a href="LICENSE">MIT licensed</a>.</p>














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

## Méthode utilisée pour le développement : méthode agile en 3 sprints
### Sprint 1/3 (1 semaine)
L’utilisateur doit pouvoir créer un compte et se connecter.
Il a accès à sa page profil (login avec email) ou il peut voir et modifier :
- ses sports favoris
- ses équipes/joueurs favoris nom logo (si existant)
- classement actuel
- ses informations Nom, Prénom, Email et Phone 
L’utilisateur non connecté doit avoir accès au minimum au données suivantes pour lesdifférents sports (à vous de choisir les sports minimum 4 en fin de projet, mais 1 seuldemandé pour le sprint 1 // Remarque : un sport feminin = un sport / ex: football masculin +feminin = 2 sports) :
- Equipes / joueurs○Matches
- Côtes (si existant)○Classements
- Calendrier
Les sports étant de votre choix, vous pouvez ressortir des informations complémentaires quivous semblent importantes.

### Sprint 2/3 (1 semaine)
Il pourra consulter les résultats des matchs en direct
- Poster un pronostic accompagné ou non d’un commentaire
- Consulter les pronostics 
- Ajouter une compétition/équipes ou match en favoris
- Gestion du compte Admin

### Sprint 3/3 (1 semaine)
L’utilisateur aura la capacité d’ajouter un article, modifier supprimé.
- Il pourra consulter des articles,ajouter au favoris et trier par sport
- L’utilisateur aura la capacité de classer les informations par nombre depoints,victoires,buts.
- Gestion des bugs

## Technologies utilisées
Backend : Nestjs  
Frontend : Vuejs  
Base de donnée : Mongodb

## Comment l'exécuter

Clone the repo où vous voulez  
`git clone git@github.com:YohannEpitech/FunSport.git`  
Aller à l'intérieur du dossier cloné  
`cd FunSport`  
Renommer le fichier env.config.js.example en env.config.js et remplacer "Your CLIENT_ID" par votre api_sportradar  
`module.exports = {
    CLIENT_ID : "Your CLIENT_ID"
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
