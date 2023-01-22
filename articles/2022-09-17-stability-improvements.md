---
title: 2022/09/17 - Stability Improvements
#image: 
author: Flux
description: It has been a while since the last blog post, so I just wanted to make an update explaining what we've been working on. Unfortunately there are not any new features, but I was able to fix many bugs relating to placing players in the games they requested.
created: 2022-09-17T21:22:49-04:00
modified: 2022-09-17T21:22:49-04:00
---

Hello everyone,

It has been a while since the last blog post, so I just wanted to make an update explaining what we've been working on. Unfortunately *there are not any new features*, but I was able to fix many bugs relating to placing players in the games they requested, and I have removed an unnecessary delay of up to 2 seconds when queueing for games.

I also restructured the main codebase to use [best practices](https://docs.gradle.org/current/userguide/multi_project_builds.html) for our build tool, Gradle. This has absolutely no impact on the user experience, but it will eventually allow our code to be more easily extensible and maintainable.

As always, if there are any issues with the updates please reply to this blog post or join our [Discord server](https://discord.gg/3gvSPdW).

Have a great day!

Flux