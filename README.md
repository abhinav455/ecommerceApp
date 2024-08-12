Running locally - 
1)Clone the repo. 
2)Cd into the Client and Server folder and do npm install 
3)Run the client on localhost:8080 using >npm run build ,followed by >npm run server command. Run server on localhost:5000 using >npm run server 

Running on Google Cloud with Travis CI-
1) Configure Travis to listen to your Github repo, set Docker credentials in ENV variables
2) Add your GCP configuration  in .env file and encrypt to .enc , create a serviceacccount in GCP and enrypt the file to serviceAccount.json.enc 
3) Push your client and server code to their repective github repos. Travis builds and deploys to Dockerhub and GCP and return a public url of the frontend app.
4) Navigate to the url in your browser
