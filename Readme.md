# Analytics.js  [![Status](https://circleci.com/gh/chute/analytics.js.png?circle-token=4279c66ee88214682e1ee342b15f984129b405d8)](https://circleci.com/gh/chute/analytics.js)

## Getting started

Install Analytics.js

- via Bower:

  ```bash
  bower install git@github.com:chute/analytics.js.git --save
  ```

  Then, include it into your project. In AMD-enabled environments:

  ```js
  require.configure({
    paths: {
      'analytics': 'PATH_TO/analytics'
    }
  });

  require(['analytics'], function(Analytics) {
    var analytics = new Analytics({
      // default params
    }, {
      // options
    });
    analytics.trigger(...);
  });
  ```

- for all others:

  ```html
  <script src="//static.getchute.com/js/analytics/1/analytics.min.js"></script>
  <script>
    var analytics = new Chute.Analytics({
      // default params
    }, {
      // options
    });
    analytics.trigger(...);
  </script>
  ```

That's it, now you can use Analytics.js!

## Available methods

Check out [documentation](http://chute.github.io/analytics.js/docs.html).


# Contribution guidelines

If you would like to contribute, please, do the following:

1. Clone [chute/analytics.js](https://github.com/chute/analytics.js) repository from GitHub.
2. Create a new branch with an explanationary name, like features/track-something-new.
3. After you are done with the implementation, make sure to write tests for it.
4. Push your branch to the GitHub and create a new pull request describing what you've done.
5. You are responsible for integrating your changes into the master branch.

## Tests

Analytics.js has a complete test coverage. Tests use Jasmine and [Karma](http://karma-runner.github.io/) for running them. To run tests:

    npm test

If you want to run your tests on any of the BrowserStack browsers, add your credentials as env vars:

    BROWSER_STACK_USERNAME
    BROWSER_STACK_ACCESS_KEY

## Releasing a version

We use [grunt-bump](https://github.com/vojtajina/grunt-bump).
You should also update `Changelog.md` -- you can generate updates from commits using [grunt-conventional-changelog](https://github.com/btford/grunt-conventional-changelog) (see [conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.em2hiij8p46d)).

A typical release workflow would be:

```bash
grunt bump-only    # (or `bump-only:minor` or `:major`) increase version
grunt changelog    # generate changelog updates
# edit changelog
grunt bump-commit  # commit, tag, push
```

Finally, deploy a new version to CDN:

```bash
grunt deploy
```
