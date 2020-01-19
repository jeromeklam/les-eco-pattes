if [ -d /home/node/freeassofront ]; then
    cd /home/node/freeassofront
    npm install
    rm -rf ./dist
    npm run build
    npm link
fi
if [ -d /home/node/freejsonapi ]; then
    cd /home/node/freejsonapi
    npm install
    rm -rf ./dist
    npm run build
    npm link
    fi
cd /home/node/app
npm install
npm rebuild node-sass
if [ -d /home/node/freeassofront ]; then
  npm link freeassofront
fi
if [ -d /home/node/freejsonapi ]; then
  npm link freejsonapi
fi
npm run start