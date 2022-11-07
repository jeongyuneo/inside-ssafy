#!/bin/bash

./gradlew build

sudo docker cp inssa_deploy_spring:/home/. ~/img/

sudo docker stop inssa_deploy_spring

sudo docker rm inssa_deploy_spring

sudo docker rmi inssa_deploy_spring

sudo docker build -t inssa_deploy_spring .

sudo docker run -d -p 8080:8080 --name inssa_deploy_spring --network inssa-network -v /home/ubuntu/img:/home inssa_deploy_spring

sudo docker cp ~/img/. inssa_deploy_spring:/home

sudo docker logs -f inssa_deploy_spring
