<a name="v1.5.2"></a>
### v1.5.2 (2016-04-26)

<a name="v1.5.1"></a>
### v1.5.1 (2016-03-07)

<a name="v1.5.0"></a>
## v1.5.0 (2016-02-25)

#### Features
* Purchase will get product id from `data-product-id` and send this value to `pID`.

<a name="v1.4.0"></a>
### v1.4.0 (2015-6-5)

#### Miscelaneous

* options can now accept `url` property, for use with a different pixel endpoint ([593ea84](https://github.com/chute/analytics.js/commit/593ea8455d1f1aedda9fd2827cc97ede3bdadb9c))


<a name="v1.3.2"></a>
### v1.3.2 (2014-12-23)

#### Miscelaneous

* pixel.getchute.com now supports https ([ac169521](http://github.com/chute/analytics.js/commit/ac169521a3ff517b7ae10b521ced7c5e88f7107a))


<a name="v1.3.1"></a>
### v1.3.1 (2014-08-12)

#### Miscelaneous

* removed wurfl.io ([35ec7a4a](http://github.com/chute/analytics.js/commit/35ec7a4a1330ac173f93891e1ff42a95ae599422))


<a name="v1.3.0"></a>
## v1.3.0 (2014-06-19)

#### Features

* explicit control over pageview and time tracking ([21950ba1](http://github.com/chute/analytics.js/commit/21950ba19fccbbaafb17e3e827a5e7d2967fe904))
  - There are cases when we don't want to trigger pageview (e.g. in chooser widget since the view event is already triggered when the button is loaded).
  - Added two simple options (`autoPageview`, `autoTrackTime`) to turn off the automatic behavior, and two methods (`pageview`, `trackTime`) to initiate it explicitly.
* tracking chooser ID ([29a51962](http://github.com/chute/analytics.js/commit/29a5196274c5ec7268200a27959cb92b5e5d5bad))
  - `mcID` = media chooser ID ... every media chooser needs to be assigned a chooser ID (even custom ones)
  - `udTp` = user device type ... provided by [WURFL.io](http://wurfl.io)
  - `click_chooser` as a standard event name for opening media chooser


<a name="v1.2.2"></a>
### v1.2.2 (2014-05-24)

#### Features

* tracking purchase ([a26a0236](http://github.com/chute/analytics.js/commit/a26a02365b237d8f86a1f6e0f4e91ce058cb8a30))


<a name="v1.2.1"></a>
### v1.2.1 (2014-05-21)

#### Features

* view_load is now triggered automatically when the analytics object is instantiated ([4b4c5ba1](http://github.com/chute/analytics.js/commit/4b4c5ba1f7f345e8993424496cf950f64dfddee2))


<a name="v1.2.0"></a>
## v1.2.0 (2014-04-22)

#### Features

* time tracking in given intervals, stops after 30 minutes of inactivity ([86aaf9a6](https://github.com/chute/analytics.js/commit/86aaf9a6961c756fb64d5cee745ee4554919a259))

#### Miscelaneous

* upgrade to Jasmine 2, rewrite async tests ([86aaf9a6](https://github.com/chute/analytics.js/commit/86aaf9a6961c756fb64d5cee745ee4554919a259))


<a name="v1.1.2"></a>
### v1.1.2 (2014-04-16)

* dont log to track.getchute.com anymore (still use it for click through tunneling) ([e23f967a](https://github.com/chute/analytics.js/commit/e23f967ad291fbf6926dd997c72b8101cf692fc4))


<a name="v1.1.1"></a>
### v1.1.1 (2014-04-07)

#### Features

* include uSe ([02c84a33](https://github.com/chute/analytics.js/commit/02c84a33c44ec5ed819dd8bf9f016c63824fd81b))
* debug mode ([33b352b3](https://github.com/chute/analytics.js/commit/33b352b3b327bd13a378981c14be7780e18f52e2))

#### Big Fixes

* rename cTx -> eCx according to docs ([c9ac4b9c](https://github.com/chute/analytics.js/commit/c9ac4b9cb9d304cd6bbd2dce7a369e9e864c4eeb))
* rename view_page -> view_serve ([ca490257](https://github.com/chute/analytics.js/commit/ca490257ab142b8f85c4874fd9ffb54b8e983509))
* send timestamp with every event to avoid cache ([72e418e4](https://github.com/chute/analytics.js/commit/72e418e42128ddf2a320c1f8d0c3e04a9a252be6))
* always expose as Chute.Analytics even if AMD is present ([5fe0a615](https://github.com/chute/analytics.js/commit/5fe0a615c76ba8f05d214898e589f34d50e85116))
* only trigger pageview once ([7158a721](https://github.com/chute/analytics.js/commit/7158a721213f14ad3e89c5b675916cb728f5bf04))


<a name="v1.1.0"></a>
## v1.1.0 (2014-03-12)

#### Features

* tracking mouse hover ([92b9a23c](https://github.com/chute/analytics.js/commit/92b9a23c8340634a402b91efd1baa140329bc8e2))
* standardized names for view_ events ([10201c74](https://github.com/chute/analytics.js/commit/10201c74b6cabaa17a1ab0eeaab9251ac3050d28))
* log to new analytics server ([e821a766](https://github.com/chute/analytics.js/commit/e821a7662a5cee4bc160e55d3dfc598a43364066))

#### Bug Fixes

* urlencode key in the cookie ([9f1ce193](http://github.com/chute/analytics.js/commit/9f1ce1930963283236b9105bb5f5f527fb2f5669))
* IE9 doesnt like undefined relatedTarget ([5bb27076](http://github.com/chute/analytics.js/commit/5bb27076062a51c35e8c7af83899f131ab26bad1))

#### Miscelaneous

* release a version to the major version URL, e.g. for version 1.x.x it is <http://static.getchute.com/js/analytics/1/analytics.min.js> ([7f28afb0](https://github.com/chute/analytics.js/commit/7f28afb011f9e828feebfaf543ddcb547f689b0d))


<a name="v1.0.4"></a>
### v1.0.4 (2014-01-22)

#### Bug Fixes

* encode each part of the tunnelled uri ([7a155a2d](http://github.com/chute/analytics.js/commit/7a155a2d48f523279259ecdfcff0d2e3a236c818))


<a name="v1.0.3"></a>
### v1.0.3 (2014-01-20)

#### Bug Fixes

* allow overriding the default "click_url" eTp in trackLink ([e675a4b8](http://github.com/chute/analytics.js/commit/e675a4b8eb8488dc0059e13e4daf50ebffc7c745))


<a name="v1.0.2"></a>
### v1.0.2 (2014-01-08)

#### Bug Fixes

- use only cookies because (among other things) localStorage treats https and http as different domains ([94c279d7](https://github.com/chute/analytics.js/commit/94c279d70347bbe7f25c54cc4ce7bf4cd3466356))
- chore: prefix keys with Chute_ ([393b87b0](https://github.com/chute/analytics.js/commit/393b87b0a46ecf216659ce8313aa7590bc86c29e))


<a name="1.0.1"></a>
### 1.0.1 (2013-12-26)

#### Bug Fixes

- fallback to cookies when failing to write to localStorage in Safari private browsing mode ([0806fc92](https://github.com/chute/analytics.js/commit/0806fc9232ea2d975ab846f377e4370f38f8da1e))

#### Improvements

- set up for BrowserStack ([8e5c6863](https://github.com/chute/analytics.js/commit/8e5c68635fd2fc275645ab9f2eb8ba233608b920))
- added code coverage reporting ([91ea2dc9](https://github.com/chute/analytics.js/commit/91ea2dc91606f93e59639ad53b085e6d333f4564))


<a name="1.0.0"></a>
# 1.0.0

Initial release.
