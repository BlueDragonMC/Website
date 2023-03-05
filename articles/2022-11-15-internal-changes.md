---
title: 2022/11/15 - Yay, more internal changes!
#image:
author: Flux
description: Since the last update, I've been working hard on revamping one of our internal systems to allow for better scalability and an improved developer experience. Inspired by ZakShearman's towerdefence.cc project, I decided to switch BlueDragon's internal messaging system from RabbitMQ to gRPC.
created: 2022-11-15T21:29:00-04:00
modified: 2022-11-15T21:29:00-04:00
---

Since the last update, I've been working hard on revamping one of our internal systems to allow for better scalability and an improved developer experience.

Inspired by [ZakShearman](https://github.com/ZakShearman)'s [towerdefence.cc](http://towerdefence.cc/) project ([GitHub](https://github.com/towerdefence-cc/) link), I decided to switch BlueDragon's internal messaging system from RabbitMQ to gRPC.

## What is RabbitMQ?

RabbitMQ is a _message broker_, meaning all messages must be sent through RabbitMQ to arrive at their destination. This is great for complex messaging setups and guaranteed delivery, but it also means extra complexity which we don't benefit from. (Also, on a small hosting budget, RabbitMQ uses a lot of memory by default!)

## What is gRPC?

gRPC is a _remote procedure call_ library, meaning services have to discover each others' IP addresses and can communicate directly over a bidirectional channel. One side can make a _call_, and the other side will create and send back a response. This is great for messages that only require one recipient because there is no extra unnecessary routing.

## Why Switch?

**First**, gRPC has built-in support for protocol buffers. Google's protobuf format is an industry standard for serializing structured data, and it's great because it is language-agnostic and represented in a tiny binary format.
This was a huge improvement over our old system because, previously, our messages were Kotlin data classes serialized to and from JSON. This caused a lot of headache when the message format had to be amended or new message types were added because we would have to update our client library in every dependent application. With protobuf, Java and Kotlin code can be generated from the source .proto files, and in the majority of cases, updating your definitions does not break your application.

**Second**, gRPC is more scalable for what we want to achieve. All of our current messaging scenarios require direct, server-to-server communication with one sender and one receiver, which is what gRPC specializes in. Essentially, it's a better fit for us.

If you have any questions, feel free to reply to this post or join our [Discord server](/discord). Thanks for reading!

Flux
