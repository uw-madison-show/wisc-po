wisc-po
=======

Wisconsin Health Data Portal

The Survey of the Health of Wisconsin is launching a web data portal to help
public health officers in the state improve the health of our communities.

We are happy to announce our v1.0a release of this tool. Right now, it is still
very much under development but would like to share this news as we continue
forward! To view a live preview of this alpha version, please download a copy from [here](https://github.com/uw-madison-show/wisc-po/releases/tag/v1.0-a "Version 1.0a Release")

Check back for updates as we develop this tool for the community!

***

Setting up your environment to work with the code
-----

Before beginning, a few different tools are required to develop and work with
the code on our Github repository.

To set things up, you will need to install the following tools:
- [git](http://git-scm.com/downloads "Git")
- [nodeJS](http://nodejs.org/download/ "nodeJS")

Now, to set up your development environment, you will need to globally install
some node packages. Issue the following commands to install _Grunt_ our task runner,
_Bower_ a Javascript package manager and _JSDoc_ an API documentation generator.

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
Javascript projects. In the grunt tasks, there are two configurations titled
`jsdoc:temp and `jsdoc:dist`, which handles the documentation generation based on
if building a new distribution or in testing environment. This doc generation is
done during the `build` task (output is wisc-po/doc), as well as when Grunt is
watching the project with the `serve` task (output is wisc-po/src/doc). To just
generate a new version of the documentation, issue the command (from wisc-po/src):

`grunt docs`

The documentation is a web page generated with a main starting point of `index.html`.

List of Javascript Libraries/Plugins Used
-----

In this project, we used the following Javascript Libraries and plugins for the
actual website. A list is below:

- [Highcharts](http://www.highcharts.com/ "Highcharts")
- [jQuery](http://jquery.com/ "jQuery")
- [Twitter Bootstrap](http://getbootstrap.com/ "Twitter Bootstrap")
- [Bootstrap-Switch](http://www.bootstrap-switch.org/ "Boostrap-Switch")
- [Handlebars](http://handlebarsjs.com/ "Handlebars")
- [excellentexport](https://github.com/jmaister/excellentexport "excellentexport")
