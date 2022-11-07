#!/bin/bash

npm run build

sudo docker stop inssa_deploy_react

sudo docker rm inssa_deploy_react

sudo docker rmi inssa_deploy_react

sudo docker build -t inssa_deploy_react .

sudo docker run -d -p 3000:80 --name inssa_deploy_react inssa_deploy_react
