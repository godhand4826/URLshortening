# URLshortening

## Environment
- node 16.3.0
- npm 7.15.1

## How to run
```bash
npm ci # install dependency 
docker-compose up -d # start mysql and redis
npm run migration:run # migrate schema
npm start # build and run
```