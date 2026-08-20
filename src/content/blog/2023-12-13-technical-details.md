---
title: "A Look Into the Technical Side of BlueDragon"
# image:
author: Flux
description: '"How to rip us off" - an updated guide for 2023!'
created: 2023-12-13T12:00:00.000Z
modified: 2023-12-13T12:00:00.000Z
---

> _"How to rip us off" - an updated guide for 2023!_

## Services and their jobs

BlueDragon is split into a few crucial services:

- Our [**Minestom**](https://minestom.net/) [implementation](/github/Server) runs all the games.
- [**Velocity**](https://papermc.io/software/velocity) routes players between game servers and handles features like the [Jukebox](/github/Jukebox).
- A custom service called **Puffin** handles all of the coordination and messaging between services. Its main job is managing the player queue and ensuring that a minimum number of game instances are available.
- [**MongoDB**](https://www.mongodb.com) stores player profile information and permissions.
- [**LuckPerms**](https://luckperms.net) handles player permissions and ranks.

## Messaging

These services need to communicate with each other to perform important tasks like queueing for games, sending players between servers, and handling parties.

Also, most of this communication is directly sent from one service to another rather than being broadcasted to every application on the network. Due to this, we chose to use [gRPC](https://grpc.io/) to our messaging. It's a language-independent [remote procedure call](https://en.wikipedia.org/wiki/Remote_procedure_call) protocol based on a binary format.

We have `proto` (Protocol buffer) files in a Git repository that define our schema, and then we use the [Protobuf Gradle plugin](https://github.com/google/protobuf-gradle-plugin) to generate Java and Kotlin clients to use across our applications.

Whenever a game server or proxy starts up, it attempts to create a gRPC channel to Puffin. Using the shared schema, they can communicate in a binary format with an automatically generated API.

## Kubernetes

Our backend systems run on a Kubernetes cluster. Each service has its own `Deployment` (or `StatefulSet` if they have persistent data), and some are exposed to the internet with a `Service`.

### Why Kubernetes?

We chose Kubernetes for a few reasons:

1. The cluster heals itself through a continuous [reconciliation loop](https://kubernetes.io/docs/concepts/architecture/controller/)
   - _This is essentially a more polished version of our previous iteration of BlueDragon's backend systems. For more information about why we switched, check out the blog post [here](/blog/2022-08-23-bluedragon-update)._
2. Rolling updates are handled [automatically](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment)
3. Kubernetes is an open standard supported by major cloud providers, allowing us to quickly deploy anywhere

### Ingress and Authorization

For web services, set up the [Nginx Kubernetes Ingress Controller](https://kubernetes.github.io/ingress-nginx/). Then, services are exposed to the internet with ingress rules.

For private services, like our Tekton or Kibana dashboards, we have ingress rules that bind to a subdomain of `bluedragonmc.com` and have annotations that require authentication from a separate service running at `auth.bluedragonmc.com`. All requests to these private services must be approved by [oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy) (we set up the GitHub authentication provider).

### Agones

For game servers, we run [Agones](https://agones.dev/site/), which provides a set of custom resource definitions ([CRDs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)) that make managing game servers easier.

For BlueDragon, the main feature that we take advantage of is game server reservations. When players are on a game server, it is marked as "reserved", which prevents it from being shut down for updates or scheduled restarts.

Game servers are part of a [`Fleet`](https://agones.dev/site/docs/reference/fleet/), which creates game servers from a pod template.

## Logging and monitoring

We recently added a stack of logging and monitoring tools to our cluster:

- [**Elasticsearch**](https://www.elastic.co/elasticsearch) - Log storage and search
- [**Fluentd**](https://www.fluentd.org/) - Collecting logs from each node and its running containers
- [**Kibana**](https://www.elastic.co/kibana/) - A web-based UI for querying Elasticsearch

This is known as the EFK stack, and it allows us to collect logs from all our Kubernetes pods, tag them, store and index them, and then query them using our Kibana dashboard.

Elasticsearch also has options for automatic log rotation and index management, so we don't have to worry about hoarding terabytes of logs.

## Tekton

To build and deploy new versions of our game server, proxy, or Puffin service, we use [Tekton Pipelines](https://tekton.dev/).

Our Tekton Pipeline clones a Git repository, builds a Docker image for it using [Buildah](https://buildah.io/), and then deploys it to the cluster using a custom `kubectl` task. Throughout the process, we are kept informed with Discord [webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## Densely-packed game servers

Even the most efficient server implementations will have _some_ amount of memory and CPU overhead from things like database connections, RPC channels, and JVM overhead.

To help conserve system resources, we host multiple active games on the same server. When a server starts up, it creates a lobby and waits for requests to start new games. Puffin (our controller service) will send requests to the most under-utilized servers to create new games when its quotas are not met.

## DDoS Protection

On the Minecraft side, all traffic is routed through [TCPShield](https://tcpshield.com/). This provides application-layer DDoS protection for our Velocity proxies.

For the website and all other web services, traffic is proxied by [Cloudflare](https://www.cloudflare.com/). Cloudflare also provides caching for static assets, which helps us reduce bandwidth usage.

## Configuration

In most games, we have settings that can be configured using YAML files. These files live in multiple locations, and the config tree is merged based on a priority list.

First, default configurations embedded in our server JARs have the lowest priority.
Then, configuration files mounted in our server containers (if present) can override these defaults.
Finally, configuration embedded in each world is merged with the game configuration.

Items like spawn points or chest or entity locations will always be found in map-specific configuration files.

## Website

Our website ([bluedragonmc.com](/)) is built with Next.js 14 using the `app` directory. The source code is available on GitHub [here](/github/Website).

Whenever someone pushes to the `main` branch or makes a pull request, a GitHub action builds a Docker container using [this `Dockerfile`](https://github.com/BlueDragonMC/Website/blob/main/Dockerfile) and pushes it to the [GitHub Packages container registry](https://github.com/features/packages). When we're ready to deploy a new version of the site, we just have to run a rolling update in our Kubernetes cluster.

## Full Stack

- **Minecraft**: Minestom, Velocity, LuckPerms, TCPShield
- **Website**: Next.js, TailwindCSS, Nginx, Cloudflare
- **Database**: MongoDB
- **Internal Dashboard**: Vue.js, WebSockets, oauth2-proxy
- **Runtime**: Kubernetes, CRI-O, Agones
- **CI/CD**: Tekton Pipelines, GitHub Actions
- **Messaging**: gRPC
- **Logging and Monitoring**: Elasticsearch, Fluentd, Kibana

## Future Improvements

Here are a few ideas we have to make our systems more efficient and reliable:

- Replace our custom game server allocation logic with the [GameServerAllocation](https://agones.dev/site/docs/reference/gameserverallocation/) feature in Agones.
- Extend the configuration system and take advantage of map-specific overrides in more scenarios.
- Implement a matchmaking service like [OpenMatch](https://open-match.dev/site/).
- Use an external [image optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images) service for our website.

## Conclusion

If you have any questions or suggestions for BlueDragon, feel free to join our [Discord server](/discord)!

Have a great day,

Flux
