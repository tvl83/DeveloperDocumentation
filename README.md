# Developer Docs Site


[![Build Status](https://magnum.travis-ci.com/orbotix/DeveloperDocumentation.svg?token=pj2qPhW5DfTSgqqC5AzD&branch=v1-to-v2)](https://magnum.travis-ci.com/orbotix/DeveloperDocumentation)

### Installation

To host this documentation locally you'll need Node.js and npm on your workstation. You can install these tools using your preferred package manager for your OS. The following example uses [Brew](http://brew.sh) for OS X:

    brew install nodejs

If you don't already have Grunt installed, you'll need that too:

    npm install -g grunt-cli

Once you have these installed, navigate to this repository's directory on your machine and run:

    npm install

This will install any other necessary dependencies needed for this application to run on your workstation.

### Hosting Locally

This documentation uses [Grunt](http://gruntjs.com/) and [Assemble](http://assemble.io/) to build and push documentation updates. Once everything's installed, run the following command to build the documentation:

    grunt build

The generated documentation will be located in the `build` directory. If you would like to host this documentation locally, run:

    grunt server

This should open your default web browser to the docs homepage [http://localhost:9000](http://localhost:9000)

### Deployment

When updated documentation is pushed to the master branch, it is automatically pushed to Heroku by Travis CI.

Travis calls `grunt deploy`, which is the same as `grunt build`, except that it also zips up the docs for downloading.

To see the latest build, visit the [Travis CI page](https://magnum.travis-ci.com/orbotix/DeveloperDocumentation).

### Organization

The majority of the content herein is stored in the `src/content` directory as a set of Markdown files. Assets such as images and javascript are stored in the `src/assets` directory.

For a more detailed guide on how to modify the content and layout of the docs site, please refer to this guide on [how to update the docs site](/how-to-update-docs.md).

### Attributions

This documentation is based on [Spark Docs](https://github.com/spark/docs/), with influence from [FlatDoc](http://ricostacruz.com/flatdoc/).

### Contributions

This documentation is managed by Sphero, but supported by the community. We welcome contributions such as:

* Edits to improve grammar or fix typos
* Edits to improve clarity
* Additional annotated examples for others to follow
* Additional content that would help provide a complete understanding on how to develop with Sphero
* Translations to other languages

Making a contribution is as simple as forking this repository, making edits to your fork, and contributing those edits as a pull request. For more information on how to make a pull request, see [Github's documentation](https://help.github.com/articles/using-pull-requests).

### License

These files have been made available online through a [Creative Commons Attribution-ShareAlike 3.0 license](http://creativecommons.org/licenses/by-sa/3.0/us/).
