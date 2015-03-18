wisc-po
=======

Wisconsin Health Data Portal

The Survey of the Health of Wisconsin is launching a web data portal to help
public health officers in the state improve the health of our communities.

Check back for updates as we develop this tool the community!

Setting up your environment to work with the code
-----

Before beginning, a few different tools are required to develop and work with
the code on our Github repository.

To set things up, you will need to install the following tools:
- git (http://git-scm.com/downloads)
- nodeJS (http://nodejs.org/download/)

Now, to set up your development environment, you will need to globally install
some node packages. Issue the following command to install _Grunt_ our task runner,
_Bower_ a javascript package manager and _JSDoc_ an API documentation generator.

- `npm install -g grunt-cli`
- `npm install -g bower`
- `npm install -g jsdoc`

Next, you will need to clone our git repository via the command:

`git clone git@github.com:uw-madison-show/wisc-po.git`

Finally to install other required dependencies, navigate into the `wisc-po`
directory and then type in the following commands:

- `npm install`
- `bower install`

All dependencies have now been set up.

Building the Site
-----

To build and work with the code, start up grunt. This can be done by navigating
into `wisc-po/src` and then starting grunt via `grunt serve`.

To make a version that is deployable, run the shell script named `build.sh` in
`wisc-po/src` or while inside the `src` folder by typing `grunt build`. Or to
then move this temporary build elsewhere, type the following commands:
- `grunt build`
- `rm -rf ../dist`
- `cp -R dist ../`

This build will now be located inside `wisc-po/dist` and can be copied to a
server for deployment.

Additionally, there is a script titled deploy.sh. This script will deploy a new
instance of the website, but requires a vpn connection to UW Madison as well as
the proper ssh keys on the server. Therefore it is not useful if you are
personally trying the code.

Documentation
-----
The documentation for this project is generated with JSDoc, an open source API
documentation generator which allows for quick and simple documentation of
Javascript projects. In the grunt tasks, a task titled `jsdoc`. To just generate
a new version of the documentation, issue the command `grunt jsdoc` from the wisc-po/src
directory. The documentation is a web page that is generated into the
`wisc-po/doc` folder, with a main starting point at `index.html`.

List of JS Libraries Used
-----

- Highcharts
- jQuery
- Twitter Bootstrap
- Bootstrap-Switch
- Handlebars
- excellentexport
