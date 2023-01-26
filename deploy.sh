#!/bin/bash

set -e
docker build . -t registry.bluedragonmc.com/bluedragonmc/website:dev
docker push registry.bluedragonmc.com/bluedragonmc/website:dev
kubectl rollout restart deployment website