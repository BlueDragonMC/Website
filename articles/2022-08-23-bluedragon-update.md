---
title: 2022/08/23 - BlueDragon Update
image: /images/2022-08-23-bluedragon-update.jpg
author: Flux
description: Hello everyone, I have been working on a partial rewrite to our backend systems that will hopefully increase stability and allow us to push updates much faster.
created: 2022-08-23T10:13:29-04:00
modified: 2022-08-23T10:13:29-04:00
---
Hello everyone,

I have been working on a partial rewrite to our backend systems that will hopefully increase stability and allow us to push updates much faster, which is also a great excuse to write a forum post!

### How did our system work before?
For the time being, BlueDragon is hosted on a single basemetal node, which gives us great flexibility over how we run our server. Every game server was run in its own [Docker container](https://docker.com). Containers are a very lightweight way to separate applications from each other; each server gets its own container and has its own overlay file system and ports, and containers can network with each other using their names.

However, using containers alone has some issues. What happens if a container goes down? How does the [proxy](https://velocitypowered.com/) know which servers are online and how to connect to them? How do we update our servers?

Our first attempt at answering these questions was our own container orchestration software that we endearingly named Puffin, because my desktop wallpaper was an extremely cute picture of a puffin at the time. Puffin would handle the queue system, parties, and most importantly, it would manage our Docker containers for us. We had a configuration file that specified the containers we wanted to be online at all times and how many to create. An entry looked something like this:
```json
{
    "type": "github",
    "minimum": 2,
    "priority": 5,
    "exposedPorts": [
        "25565/tcp"
    ],
    "user": "BlueDragonMC",
    "repoName": "Server",
    "updateInterval": 3600000
}
```
It would maintain at least `2` containers using an image built from the `BlueDragonMC/Server` GitHub repository.

### Why did we switch?
Puffin was great, but it had its share of problems.
* It would never be as reliable as a true container orchestration platform like [Kubernetes](https://kubernetes.io)
* It couldn't update itself
* We had very little control over updates, and rolling updates were out of the question
* It couldn't scale to more than one node

### How does the new system work?
Our new system uses [Kubernetes](https://kubernetes.io) in combination with a game server orchestration tool called [Agones](https://agones.dev), which is built on top of Kubernetes.

Game servers still reside in individual Docker containers, but each game server has a "sidecar" container managed by Agones that keeps track of the server's health. If the server doesn't respond to pings for a few minutes, it will be shut down and replaced with a healthy server. Agones also assigns an IP address and port for each server, so it is easy to get a list of all available game servers and add them to our Velocity proxy.

For some more technical details:
* Our game servers run on an Agones-managed `fleet`
* Our proxy, database (MongoDB), and message broker (RabbitMQ) all have their own Kubernetes `deployment`
* The proxy, database, and message broker all have their own Kubernetes `service`, which allows other pods to access them.
* The proxy's `service` has a `NodePort`, which allows the outside world to connect to it
* The Kubernetes cluster is currently running on only a single node, on bare-metal

Because we use Kubernetes, the server can easily scale to meet higher demand, with the addition of more nodes. 

### How do we push updates?

Game server updates are now very simple thanks to a [Tekton pipeline](https://tekton.dev). Tekton is an open-source, cloud-native framework for creating continuous integration/deployment pipelines. For our use-case, it is comparable to using [GitHub Actions](https://github.com/features/actions) with a self-hosted runner.

When our Tekton pipeline is started, it pulls the latest source code from GitHub, uses it to build a Docker image, pushes the image to our internal Docker registry, and re-configures our deployments to use the newly-built image. Then, Kubernetes will take care of automatically performing a rolling update of the system that was updated.

### Future plans
If we need to scale up, we will:
* Look into distributed file systems like CephFS and GlusterFS
* Configure automatic scaling for our fleet of game servers, database, message broker, and website.

We are also looking into creating a development/staging server to test new features quickly without affecting our production deployment.

### Conclusion
Thank you everyone for reading! You can expect some more substantial, gameplay-related updates very soon. If you have any questions, please feel free to ask them on this thread or in our [Discord server](https://discord.gg/3gvSPdW).

Also, here's the cute Puffin wallpaper:
![A Puffin](/images/2022-08-23-bluedragon-update.jpg)
*[Photo](https://unsplash.com/photos/b1NFkUR-3Fg) by [David Klaasen](https://unsplash.com/@davidklaasen) on [Unsplash](https://unsplash.com)*
  
Have a good day,

Flux and ex4 