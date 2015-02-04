wisc-po
=======

Wisconsin Health Data Portal

The Survey of the Health of Wisconsin is launching a web data portal to help public health officers in the state improve the health of our communities.

Check back for updates as we develop this tool the community!

Setting up your environment to work with the code
=======

Before beginning, a few different tools are required to develop and work with the code on our Github repository.

To set things up, you will need to install the following tools:
- git (http://git-scm.com/downloads)
- nodeJS (http://nodejs.org/download/)

Now, to set up your development environment, you will need to globally install some node packages. Issue the following command to install _Grunt_ our task runner and _Bower_ a javascript package manager.

- `npm install -g grunt-cli`
- `npm install -g bower`

Next, you will need to clone our git repository via the command:

`git clone git@github.com:uw-madison-show/wisc-po.git`

Finally to install other required dependencies, navigate into the `wisc-po` directory and then type in the following commands:

- `npm install`
- `bower install`

All dependencies have now been set up.

Building the Site
=====
To build and work with the code, start up grunt. This can be done by navigating into `wisc-po/src` and then starting grunt via `grunt serve`.

To make a version that is deployable, run the shell script named `build.sh` in `wisc-po/src` or while inside the `src` folder by typing the following commands:
- `rm -rf ../dist`
- `grunt build`
- `cp -R dist ../`

This build will now be located inside `wisc-po/dist` and can be copied to a server for deployment.

List of JS Libraries Used
=====

- Highcharts
- jQuery
- Twitter Bootstrap
- Bootstrap-Switch
- Handlebars
