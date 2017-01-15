# Tetris-Next

http://tetris-next.net:8000/

I created short instructions for install Karma and Jasmine

# Local installation:
npm install --save-dev jasmine

# Global installation:
npm install -g jasmine

# Install Karma:
npm install karma --save-dev

# Install plugins that your project needs:
npm install karma-jasmine karma-chrome-launcher --save-dev

#To initialize a project for Jasmine
jasmine init

#You will need to do this if you want to run Karma on Windows from the command line.
npm install -g karma-cli


!!!I had problems with jasmine-core (Error: Cannot find module 'jasmine-core')!!!

#Here is fix \/

rm -rf node_modules
npm cache clean
npm i

sudo npm uninstall -g jasmine-core
sudo npm cache clean -f
sudo npm i -g jasmine-core


#Configuration of karma
karma init my.conf.js

#Starting Karma

karma start my.conf.js
