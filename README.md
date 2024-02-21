# Projet-API-pdf

## Comment démarrer le projet : 

## Etape 1
- Charger le fichier `api_PDF.sql` dans votre base de données
- Accéder au fichier `.env` du dossier backend pour renseigner les infos de votre base de données
##Lancer les serveurs

## Etape 2

|       |   Frontend |   Backend |
|---    |:-:    |:-:    |
|  Action 1   |   ```cd ./frontend```   |   ```cd ./backend``` |
|   Action 2;   |   ```npm i```  |   ```npm i``` ou `sudo npm i` si besoin |
|   Action 3;   |   ```npm start```   |   ```npx ts-node src/index.ts``` ou ```nodemon src/index.ts``` |

---

[NB] :  Lancer le serveur avant le client (Assurez-vous que le backend tourne sur le port `3000`,les liens dans `fetch` y sont écrits par conséquent).

- ATTENTION : La génération du pdf prend parfois 2s pour être généré, soyons patient....
## Explication du projet : 

Ce projet consiste à utiliser l'API backend pour générer un pdf en fonction des données reçu du client.
Il offre un interface fluide pour gérer l'historique des pdfs générés sur ce site.

## Technos : 
- **Tailwind CSS** : Pour l'interface  
- **html-pdf** : Pour la création du pdf coté serveur
- **TypeScript** : Langage principal du projet

## La partie DOCKER n'est pas totalement cloturée...


<img width="1436" alt="Capture d’écran 2024-02-21 à 09 10 23" src="https://github.com/Faithgg/Projet-API-pdf/assets/121299370/7de13e1f-3784-4a63-8cc2-4949877f482a">


<img width="1436" alt="Capture d’écran 2024-02-21 à 09 11 09" src="https://github.com/Faithgg/Projet-API-pdf/assets/121299370/6670191d-e2b2-44e8-997e-c3b58ded77ef">


<img width="1436" alt="Capture d’écran 2024-02-21 à 09 12 07" src="https://github.com/Faithgg/Projet-API-pdf/assets/121299370/c64f14f6-4990-474a-a4c2-f4485180f8c5">
