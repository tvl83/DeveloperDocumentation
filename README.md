# Developer Docs Site

Here you'll find the documentation site for the Sphero.

[![travis](https://travis-ci.org/orbotix/DeveloperResources.svg?branch=initial-site-content)](https://travis-ci.org/orbotix/DeveloperResources)


## Developer Resources

In this repo you will also find documents explaining the different Sphero API's and artwork you can use in your app. Download [here](https://github.com/orbotix/DeveloperResources/zipball/master).

## PDF Docs

Can be found in /docs directory

- Low Level API
- Orb Basic
- Locator
- Collision Detection
- Macros
- Sphero Whitelist Process

## Art

Can be found in /art directory

- Sphero logo and mark
- Sphero as a controller assets
- Icon
- Vector logo and mark (.ai)

### Installation

To host this documentation locally, you'll need Node.js and npm:

    brew install nodejs

If you don't already have Grunt installed, you'll need that too:

    npm install -g grunt-cli

Once you have the dependencies, navigate to this repository's directory on your machine, and then:

    npm install

to install any other necessary dependencies:

### Hosting locally

This documentation uses Grunt and Assemble to build and push documentation updates. Once everything's installed, to build the documentation, type:

`grunt build`

The documentation will be located in the `build` directory. If you would like to host this documentation locally, try:

`grunt server`

This will set up a Connect server and load the local documentation in a web browser. If you make changes, the browser should automatically refresh.

### Deployment

When updated documentation is pushed to the master branch, it is automatically pushed to Amazon S3 by Travis CI.

Travis calls `grunt deploy`, which is the same as `grunt build`, except that it also zips up the docs for downloading.

To see the latest build, visit the [Travis CI page](https://travis-ci.org/orbotix/DeveloperResources).

### Organization

The majority of the content herein is stored in the `src/content` directory as a set of Markdown files. Assets such as images and javascript are stored in the `src/assets` directory.

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

You are welcome to distribute, remix, and use these files for commercial purposes. If you do so, please attribute the original design to Spark Labs, Inc. both on the website and on the physical packaging of the product or in the instruction manual. All derivative works must be published under the same or a similar license.
