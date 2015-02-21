# How to Update Sphero Docs

## Main Layouts

There are two main layouts that can be updated in the docs, `src/layouts/docs.hbs` and `src/layouts/static.hbs`.
The first one you see with the Sphero and Ollie pictures is `static.hbs`, this is the landing page with the options
to select which platform docs you want to visit, it looks like this:

![Static Layout](src/assets/images/static.hbs.png?raw=true "Static Layout")

The other layout is the docs content layout, which is divided in three main sections, the main
navigation menu and the secondary content navigation menu to the left, the content section to
the right and center occupying most of the screen real state. The docs layout looks like this:

![Docs Layout](src/assets/images/docs.hbs.png?raw=true "Docs Layout")

### How to update

The two layots are where all the styles and js files are included, they also defined the overall wireframe
of the docs and where the navigation menus are located. If we want to update where the header, body, footer
or navigation the layouts are the place to do it.

Updating is pretty easy since these are `.hbs` files, they are pretty much just html files that include some
partials. The partials included in `static.hbs` are `footer`, `header` and `mobile-nav`, all of them can be
found in `src/content/partials/` and are just html files.

The remaining layout file (`docs.hbs`) can be updated in the same manner, and both layouts are pretty similar
in how they are updated, with the exception that the main content layout also contains the navigation of the
docs, this is where you would update the placement and position of said navitagion. The navigation menus themselves are
auto-generated with Assemble, and TOC plugin for the content navigation submenu.

## Navigation Menus

There are two navigation menus in the docs, the Main menu that displays all the available sections of the docs
for each platform (Sphero, Ollie), and the content navigation sub-menu which works as a easy way to move quickly
or go to specific part inside the content of a docs section.

### Main Navigation Menu

This menu is the one on the top left and is our main navigation to move between sections like 'Getting Started', 'SDK',
or 'Macrolab'. It is auto-generated based in the contents of the folder `src/content/sphero`, in the case of the sphero platform
, `src/content/ollie` for the ollie, it loos like this:

![Main Navigation Menu](src/assets/images/main-menu.png?raw=true "Main Navigation Menu")

#### Add a new section to the Main Navigation Menu

All `.md` files inside the content folders for each platform will be parsed and added to the menu based on a few
config lines at the top of each `.md` file. What this means is that if you wish to add a new section you need only
to create a new `.md` file inside one of the two platform folders (`/src/content/<platform>`) with the following
lines at the beginning of the file, let's see an example using the `src/content/sphero/start.md` file.

```markdown
---
word: Home
title: Home
order: 0
---
# Home

## Welcome!

Here you will find all the information you need applications or games with Sphero.

## Feedback

If you have any issues, you can search for answers, or ask a question on [StackOverflow][].

The documentation is hosted in our [DeveloperDocumentation][repo] repository.

Let us know how we can improve it by [creating an issue][issue].

Alternatively, you can click on the "Edit this page" button in the top right corner.
This will let you fork [DeveloperDocumentation][repo], edit the content, and submit a pull request.

[StackOverflow]: http://stackoverflow.com/questions/tagged/sphero-api?sort=newest
[repo]: https://github.com/orbotix/DeveloperDocumentation
[issue]: https://github.com/orbotix/DeveloperDocumentation/issues/new
```

The first `word` and `title` primitives define the title of the page and the wording the for the
navigation menu, the third one as the name describes defines the position it would have in the afore mentioned
menu.

There is a fourth commonly used primitive `published`, this is true by default but if you wish to only remove
a section from the navigation menu instead of deleting you can pass it false and it would be removed and no longer
appear in the menu, but it will still exist in the docs folder.
