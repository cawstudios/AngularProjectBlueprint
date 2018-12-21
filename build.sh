ENVIRONMENT=$1
npm install
npm run build:$ENVIRONMENT
mkdir -p dist/source-map-files
mv dist/RGIHomeInsurance/**.map dist/source-map-files
