cd /home/node/freeassofront
npm install
rm -rf ./dist
npm run build
npm link
cd /home/node/freejsonapi
npm install
rm -rf ./dist
npm run build
npm link
cd /home/node/app
npm install
npm link freeassofront
npm link freejsonapi
npm run start