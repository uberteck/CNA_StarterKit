# Nicks CNA basics lab

This is to accompany a presentation I did recently, for those of you who want to try this at home.  
For those randomly happening upon this - there's no need to have seen the presentation first.  

It'll probably take between 30min - 1hr to run through.  You'll be building and running some basic containers in docker and packaging them up and running them in Kubernetes.  It's not a full tutorial, so some familiarity with command line will be needed.

FYI - This is probably not a good example of best practices - I've simplified things for teaching purposes.

## Pre Reqs
Install docker (i'd recommend a desktop edition if one exists for your platform).  I used Docker for Mac:
https://docs.docker.com/docker-for-mac/install/

Docker for mac also has an option to install Kubernetes, I used that, but minikube is also easy to setup:
https://kubernetes.io/docs/setup/minikube/

The above is a 5 min exercise with Docker for Mac (if you have decent internet).

You'll also want a container registry for the K8s part.  I used this as it's pretty light weight and quick to setup:
https://github.com/SeldonIO/k8s-local-docker-registry/blob/master/readme.md

Just download and run the following:
`./start-docker-private-registry`
`./port-forward-registry`

As you run through, I'd encourage you to read through the terminal output and compare it to the dockerfiles and look at the layers that get built etc.

Have fun!

## Docker Basics

make sure docker is running!
(whale in taskbar on mac)

Download a basic image and run it:
`docker run hello-world`

The first time you run this it will need to be downloaded.  This particular container executes, gives some output and immediately closes.  Others will have long running processes, such as:

`docker run redis`

Have a look for something else interesting to run here:
https://hub.docker.com

Try running one of those again and notice that it doesn't need to download again, there's already a copy cached locally.

Get a list of the locally cached images:
`docker image ls`

Remember images are the offline copies, they become containers when you run them.  For a list of running containers:
`docker container ls`

For more info on an image:
`docker image inspect <image_name>`
e.g.: `docker image inspect redis`


working dir: `docker/postgres`

Check out the 'dockerfile'
Check our then run the 'build' script `./build`
you may need to `chmod +x` the build and run scripts after downloading
or just copy paste the contents to the prompt

`./build`
`docker image ls | grep -i 'starterkit'`


`docker container ls`
`./run`
`docker container ls`


Log in with you favourite database gui, I like:
https://tableplus.io
(free version available)

do some database things to test
`CREATE DATABASE foodb`
select foodb
`CREATE TABLE foo (
  id SERIAL NOT NULL,
  name TEXT
)`
etc.

to stop it
`docker-compose down`

check it's no longer running
`docker container ls`

you could also get the name from the list and use:
`docker container stop <container_name>`

### extra credit
have a play with the same files in the nodejs folder
that maps to a different port and is a slightly more interesting building
got to `http://localhost:3010/` in a browser to test
all the code is in `src/index.js` it's very simple and documented, have a play


## Kubernetes

working folder: `docker/postgres`

check out the 'dockerfile' and build script then run the build:
`./buildk8s`
you need to build with a tag incorporating the address of your registry - the build file assumes you're using the one I suggest in the pre-reqs.
then you need to push the container up into your registry.  (both steps are done in the build script for you)

`docker image ls | grep -i 'starterkit'`

'kubeclt' is what you'll be using to work with k8s
*remember the verbs are different and it's all back-to-front compared to docker*

services expose our stuff to the outside world:

`kubectl get services`
`kubectl create -f k8s/service.yaml`
`kubectl get services`

deployments actually spin up the containers:
`kubectl get deployments`
`kubectl create -f deployment.yaml`
`kubectl get deployments`

for more details (equiv to docker inspect)
`kubectl describe service postgres-starterkit`

`kubectl describe deployment postgres-starterkit`

to tear it down
`kubectl delete service postgres-starterkit`
`kubectl delete deployment postgres-starterkit`


# Clean-up

if you want to clean up some space

list out images
`docker image ls`

delete image:
`docker image rm <image_name> -f`

I leave my registry running as it's useful for local testing - it gets shut down when you shut down docker, but you can kill those containers too. (there's a script in the folder you started it from `./stop-docker-private-registry`)
