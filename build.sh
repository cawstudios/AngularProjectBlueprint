ENVIRONMENT=$1
VERSION="$(node -p -e "require('./package.json').version").$BUILD_NUMBER"
sed -i "s/%VERSION%/$VERSION/g" ./src/environments/environment.$ENVIRONMENT.ts
npm install
npm run build:$ENVIRONMENT
RELEASE_TAG="$VERSION"
echo $VERSION
echo $RELEASE_TAG
