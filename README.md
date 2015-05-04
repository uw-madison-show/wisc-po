Wisc Portal
=====

Wisconsin Health Data Portal

The Survey of the Health of Wisconsin has launched a web data portal to help
public health officers in the state improve the health of our communities. This
Github repository provides the source code of this web-based project.

We are happy to announce our v1.2b release of this tool. At the moment, the code
is production ready for the lifespan of this project. To view a live preview of
this version, please download a copy from
[here](https://github.com/uw-madison-show/wisc-po/releases/tag/v1.2-b "Version 1.2b Release").
The actual site is hosted [here](wwwtest.show.wisc.edu/data/ "Wisc Portal").

Check back for updates as we develop this tool for the community!

***

Setting up your environment to work with the code
---

Before beginning, a few different tools are required to develop and work with
the code on our Github repository.

To set things up, you will need to install the following tools:
- [git](http://git-scm.com/downloads "Git")
- [nodeJS](http://nodejs.org/download/ "nodeJS")

Note: If working portably, or if no access to admin rights on Windows, it is a bit
tougher to get things working. Install git from
[gitPortable](https://github.com/sheabunge/GitPortable "gitPortable"). To install node
and npm, you will need to make a new directory for node. Inside this directory, download
the latest version of [node](http://nodejs.org/dist/latest/node.exe "node") and
[npm](http://nodejs.org/dist/npm/npm-1.4.9.zip npm). You will then need to reference
node and npm from their local paths. Adding these two programs to your path temporarily
can be done via a command line. Follow these two commands `set PATH=%PATH%;C:\path\to\node\`
and `set PATH=%PATH%;C:\path\to\GitPortable\App\Git\bin`. You should be set to go now building
the website (just remember to set your path each time).

To set up your development environment, you will need to globally install
some node packages. Issue the following commands to install _Grunt_ our task runner,
_Bower_ a Javascript package manager and _JSDoc_ an API documentation generator.

- `npm install -g grunt-cli`
- `npm install -g bower`
- `npm install -g jsdoc`

You will then need to clone our git repository via the command:

`git clone git@github.com:uw-madison-show/wisc-po.git`

Finally to install other required dependencies, navigate into the `wisc-po/src`
directory and then type in the following commands:

- `npm install`
- `bower install`

This will install local dependencies. Now all dependencies have been set up and
you are ready to change code and build the site.

Building the Site
---

To run a temporary server on a local machine with the site, start up grunt. This
can be done by navigating into `wisc-po/src` and then starting grunt via
`grunt serve`. This is a local server and does not contain production-ready
generated code.

To make a version that is production-ready and deployable, run the shell script
named `build.sh` in `wisc-po/src`.

To manually do the work of `build.sh`, type the following commands (when inside
the `wisc-po/src/` folder):
- `grunt build`
- `rm -rf ../dist`
- `cp -R dist ../`

There is a script titled `build.sh` inside the `wisc-po/src` directory which
contains the above three commands for efficiency.

Additionally, there is a script titled `deploy.sh`. This script will deploy a new
instance of the website, but requires a vpn connection to UW Madison as well as
the proper ssh keys on the server. Therefore it is not useful if you are
personally trying the code.

Documentation
---

The documentation for this project is generated with JSDoc, an open source API
documentation generator which allows for quick and simple documentation of
Javascript projects. In the grunt tasks, there are two configurations titled
`jsdoc:temp` and `jsdoc:dist`, which handle the documentation generation based on
if building a new distribution version or if in testing environment. This doc
generation is done during the `build` task (output is wisc-po/doc), as well as
when Grunt is watching the project with the `serve` task (output is wisc-po/src/doc).

To just generate a new version of the documentation, issue the command
(from wisc-po/src): `grunt docs` or use the `build.sh` script to build a new
version of the website as well as the docs.

The documentation is a series of web pages generated with a main starting point of `index.html`.

***

Notes on Project Structure
---

The Wisc Portal project has many different parts and the sturcture can be
intimidating if you have never worked with a large structured project.

Below, some of the different folders and key files are discussed:

###Root Directory
- `wisc-po/`: The main project folder containing everything.
- `wisc-po/dist/`: Last full build of the website
- `wisc-po/doc/`: Last full build of the documentation
- `wisc-po/src/`: Source code of the project
- `wisc-po/README.md`: This README file

###src Directory
- `wisc-po/src/app/`: Actual source code
- `wisc-po/src/bower_components/`: Components installed from bower
- `wisc-po/src/node_modules/`: Components installed from npm
- `wisc-po/src/bower.json`: Bower dependencies for the project
- `wisc-po/src/build.sh`: Build script for building the entire project
- `wisc-po/src/deploy.sh`: Build script for building the project and deploying
  to server
- `wisc-po/src/Gruntfile.js`: Grunt configuration file
- `wisc-po/src/package.json`: Node dependencies for the project

###app Directory
- `wisc-po/src/app/data/`: Folder containing `data.json`
- `wisc-po/src/app/images/`: Folder containing images
- `wisc-po/src/app/scripts/`: Folder containing javascript
- `wisc-po/src/app/styles/`: Folder containing css
- `wisc-po/src/app/templates/`: Folder containing Handlebars templates
- `wisc-po/src/app/index.html`: Main HTML index file

###scripts Directory
- `wisc-po/src/app/scripts/highcharts-maps/`: Contains vector shapes of the maps
  used in site
- `wisc-po/src/app/scripts/app.js`: Main App javascript which deals with
  rendering handlebars templates

###templates Directory
- `wisc-po/src/app/templates/index.hbs`: Main index template which contains
  container for all pages
- `wisc-po/src/app/templates/partials/`: Folder contains partials (reusable
  templates between pages)

***

Attributions - Javascript Libraries
---

In this project, we used the following Javascript Libraries and plugins for the
actual website. A list is below:

- [Highcharts](http://www.highcharts.com/ "Highcharts")
- [jQuery](http://jquery.com/ "jQuery")
- [Twitter Bootstrap](http://getbootstrap.com/ "Twitter Bootstrap")
- [Bootstrap-Switch](http://www.bootstrap-switch.org/ "Boostrap-Switch")
- [Bootstrap-Tour](http://bootstraptour.com/ "Bootstrap Tour")
- [Handlebars](http://handlebarsjs.com/ "Handlebars")
- [excellentexport](https://github.com/jmaister/excellentexport "excellentexport")

Attributions - Development Tools
---

In addition to the final web-based portal libraries used, we also used many
backend tools in our development process. These tools were also used in the
production of the website:

- [NodeJS](https://nodejs.org/ "NodeJS")
- [Yeoman](http://yeoman.io/ "Yeoman")
- [GruntJS](http://gruntjs.com/ "GruntJS")
- [jsDoc](http://usejsdoc.org/ "jsDoc")
- [git](http://git-scm.com/ "git")
- [Github](https://github.com/ "Github")
