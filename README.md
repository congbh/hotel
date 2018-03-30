# hotel
- Change credential git config credential.username 'Billy Everytee'
- export NODE_ENV=development
# Make this script executable with the command:
    sudo chmod 744 ./script/00-install-dev.sh
### Linter
[Standard JS](https://standardjs.com/) is the code style of this project.

# For run
    1. npm install
    2. npm run dev:build - To build docker
    3. npm run dev:up - To up docker
    4. npm run dev:migrate - To migrate postgres

# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)


#Heroku deploy
##### API HOST
https://api-hotel-dev.herokuapp.com/
###### deploy to heroku
    git add .
    git commit -m 'xxx'
    git push heroku master
###### postgres
1. pull database to local 
    PGUSER=postgres PGPASSWORD=1234567a@ heroku pg:pull postgresql-slippery-70551 hotel_dev --app api-hotel-dev
2. push database from local to heroku
    PGUSER=postgres PGPASSWORD=1234567a@ heroku pg:push hotel_dev postgresql-slippery-70551 --app api-hotel-dev