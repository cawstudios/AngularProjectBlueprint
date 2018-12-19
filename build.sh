#!/usr/bin/env bash
ENVIRONMENT=$1
VERSION=`git describe --tags --long`
sed -i "s/%VERSION%/$VERSION/g" ./src/environments/environment.${ENVIRONMENT}.ts
npm install
npm run build:${ENVIRONMENT}
mkdir -p dist/source-map-files
mv dist/RGIHomeInsurance/**.map dist/source-map-files
npm install -g @sentry/cli --unsafe-perm
sentry-cli releases new "$VERSION" --finalize
sentry-cli releases files ${VERSION} upload-sourcemaps ./dist/source-map-files
sentry-cli releases deploys ${VERSION} new -e ${ENVIRONMENT} -n ${VERSION}
