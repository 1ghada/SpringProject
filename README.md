# SpringProject
-Description du projet :
Le système de gestion des achats et des fournisseurs permettra à l'entreprise de gérer son portefeuille de fournisseurs de manière centralisée. En outre, il facilitera le suivi des commandes, la gestion des produits achetés, l'évaluation continue des fournisseurs et l'optimisation des achats.

Le projet inclut une interface utilisateur intuitive permettant aux utilisateurs (responsables achats, gestionnaires de stock) d'accéder facilement à toutes les fonctionnalités nécessaires. En utilisant des rapports d'évaluation et de comparaison, les décideurs auront une vision claire pour sélectionner les meilleurs fournisseurs et optimiser les coûts des achats.

Ce système peut également offrir des fonctionnalités supplémentaires telles qu'un tableau de bord pour suivre les commandes en temps réel, les performances des fournisseurs, et l'historique des achats de manière visuelle.

-Technologies :
Le projet peut être développé avec des technologies comme :

Backend : Spring boot.

Frontend : Angular.

Base de données : MySQL pour la gestion des entités.

Test des API: Postman
Déploiment : Docker

-Les instructions d’installation et d’exécution (du docker éventuellement):

j'ai créé un Dockerfile définissant l'image à partir de Java 17, copié le fichier .jar et spécifié l'entrée avec la commande java -jar. Ensuite, nous avons construit l'image docker-compose up --build
 et exécuté le conteneur avec docker run pour lancer l'application sur le port 9090 (docker run -p 9191:9090 springbootproject-app)
 springbootproject-app: le nom de l'image docker 

.

