# Setup

Initialize analytics.js to use provided methods. Constructor accepts 2 arguments:

1. Default parameters object. These parameters will be sent with every request (unless overridden).
2. Options object. Configures library's behavior.

  - **debug**: if set to true, will output to console log instead of making real requests
  - **tunnel**: list of additional servers a clickthrough should be sent to before reaching the target URL
  - **autoPageview**: automatically trigger pageview upon instantiation. Can be turned off by setting to `false`. Pageview can then be triggered using `pageview` method.
  - **autoTrackTime**: automatically start tracking time spent upon instantiation. Can be turned off by setting to `false`. Time tracking can then be started using `trackTime` method.

```js
var analytics = new Chute.Analytics({
  // example of default parameters
  display: 'display name'
}, {
  // example of options
  tunnel: ['http://doubleclick.net/ABCD?X=Y']
});
```

# Requirements

Chute’s display analytics are becoming a bigger and bigger part of our client projects. As clients come to rely on the events reporting we provide, we need to set standards for how we handle logging.

### External Pixel

Every display installation provided to a client should include a pixel that fires on pageload, following this format. It’s important that this event fire whether or not the display javascript loads, so don’t add it to the js file or the template:

```html
<img style="width: 0; height: 0; opacity: 0" src="//pixel.getchute.com/x.gif?dTp={{ Display Type }}&cID={{ Campaign ID }}&dID={{ Display ID }}&eTp=view_serve">
```

### Display Regions

Every event should be assigned a region using the eCx parameter. This context will likely be custom to the display, and should be carefully chosen. Make sure to add this to every active event and be as specific as possible.


# Parameters

Events passed through the Analytics system should minimally have the following URI parameters.
These will depend on the type of object that the event is linked to, and various event anomalies (URL for exits, etc).

- Campaign & Display & Chooser

  - **cID**: Campaign ID: Required if available
  - **dID**: Display ID: Required if event is linked to a specific display
  - **dTp**: Display Type: Required for display-related events
  - **dVs**: Display Version: Required for display-related events
  - **mcID**: Media Chooser ID: Required if event is linked to a media chooser

- Item Identifiers

  - **aID**: Asset Shortcut: Required if event is linked to a specific asset
  - **lID**: Album ID: Required if event is linked to a specific album
  - **pID**: Product ID: Required if event is linked to a specific product

- Event Details

  - **eTp**: Event Type: Required. See [Events](#events) for list of standard events.
  - **eCx**: Event Context: Optional. Describes the user context of event (lightbox, grid, etc.)
  - **eUr**: Event URL: Optional. Included when available, e.g. as the destination URL for click_url event.
  - **rUrl**: Redirect URL: Optional. Included with the click_url event, contains the tunnel URL the tracking server should redirect the user to. Can be different from the final destination eUr if there are multiple trackthrough servers in the middle.
  - **sec**: Seconds: Optional. Included with view_time, represents number of seconds since the previous view_time (or view_load) event.

- Order Details

  - **oID**: Order ID: Optional. Included with purchase event.
  - **oVa**: Order value: Optional. Included with purchase event.
  - **oCu**: Order currency: Optional. Included with purchase event. If not specified, it's assumed to be USD.

- User

  - **uID**: User ID: Included automatically. Received by lib from cookie. Used to determine uniques.
  - **uSe**: Session ID: Included automatically. Unique for every page view.
  - **udTp**: User device type: *Currently omitted, need to replace wurfl.io*

- Additional Parameters can be added for custom filtering

  - **tags**: hashtags that are associated with the object.

Analytics.js also accepts full-sized keys and converts them to their short alternatives:

```js
{
  'asset': 'aID',
  'album': 'lID',
  'product': 'pID',
  'campaign': 'cID',
  'display': 'dID',
  'displayType': 'dTp',
  'displayVersion': 'dVs',
  'context': 'eCx',
  'redirect': 'rUrl',
  'url': 'eUr'
}
```

So, whether you do this:

```js
analytics.trigger('some_event', {
  asset: '123456'
});
```

or this:

```js
analytics.trigger('some_event', {
  aID: '123456'
});
```

it won't make any difference.

# Events

You are free to emit any event with any parameters. However, if any of the events described below occurs, use the standardized event type:

### View

Treated as passive events and operated on by specific aggregation functions

- **view_serve**: Display served
- **view_load** (formerly **pageview**): Display (JavaScript) loaded
- **view_time**: Fires every X seconds while user is on a page that contains the display
- **view_exit**: Fires before page unload whenever possible

### Hover, Click, and Share

Treated as active events and aggregated in the events endpoint. Using these namespaces with custom events will yield their inclusion in the events analytics for that display.

- **hover_int**: Hover interaction with a tracked element
- **click_lightbox**: User opens lightbox
- **click_prev**: User navigates to previous item
- **click_next**: User navigates to next item
- **click_url**: User clicks on external link
- **click_heart**: User hearts an asset
- **click_unheart**: User unhearts an asset
- **click_vote**: User votes for an asset
- **click_unvote**: User unvotes an asset
- **click_chooser**: User opens media chooser
- **share_facebook**: Asset is shared on Facebook
- **share_twitter**: Asset is shared on Twitter
- **share_tumblr**: Asset is shared on Tumblr
- **share_pinterest**: Asset is shared on Pinterest
- **share_googleplus**: Asset is shared on Google+

### E-commerce

- **purchase**: User creates an order

To trigger purchase event, client should include the following script on the checkout page:

```html
<script src="//static.getchute.com/js/analytics/1/purchase.min.js" id="chute-purchase-script" data-campaign-id="{{ Campaign ID }}" data-order-id="{{ Order ID }}" data-order-value="{{ Order value in cents }}" data-order-currency="{{ Order currency }}"></script>
```

Example for Shopify:

```html
<script src="//static.getchute.com/js/analytics/1/purchase.min.js" id="chute-purchase-script" data-campaign-id="328" data-order-id="{{ order.order_number }}" data-order-value="{{ order.subtotal_price }}" data-order-currency="USD"></script>
```

# Methods

### trigger

Notify server that some event, you want to track, happened:

```js
analytics.trigger('open_lightbox', {
  asset: ASSET_SHORTCUT
});
```

### pageview

Pageviews are typically tracked automatically when the Analytics object is instantiated, triggering **view_load** event, and initiating time tracking.

However, you can postpone this event (e.g. your content is on a tab that is not initially visible) by setting **autoPageview** to false. Then you can trigger `pageview` event explicitly:

```js
var analytics = new Analytics({...}, {autoPageview: false});
// ...
analytics.pageview();
```

In any case, calling `pageview` repeatedly won't have any additional effect.

### trackTime

Time tracking is typically started automatically when the Analytics object is instantiated.

However, you can postpone time tracking by setting **autoTrackTime** to false. Then you can trigger `trackTime` event explicitly:

```js
var analytics = new Analytics({...}, {autoTrackTime: false});
// ...
analytics.trackTime();
```

Also, if you set `autoPageview` to false, time tracking won't start until you call `pageview` or `trackTime`.

### trackLink

Wrapper for **trigger** method, attaches a listener for *click* event on an anchor element:

```js
analytics.trackLink('a.logout');
analytics.trackLink($('a.logout'));
analytics.trackLink(logoutLinkEl);
```

Can also track multiple links:

```js
analytics.trackLink(['div.first-wall a.like', 'div.second-wall a.like']);
analytics.trackLink($('div a.like'));  // can evaluate to multiple elements
analytics.trackLink([$('div.first-wall a.like'), $('div.second-wall a.like')]);
analytics.trackLink([like1, like2]);
```

You can also pass context as the last argument to provide more information:

```js
analytics.trackLink('li.winners a', 'clicked link to e-shop');
```

If additional parameters need to be passed to the server, pass an object as the last argument. The context is then taken from the *context* attribute:

```js
analytics.trackLink('li.winners a', { album: 'abcd', context: 'clicked link to e-shop' });
```

Instead of an object, a function that returns an object can be passed:

```js
analytics.trackLink('li.winners a', function(el) {
	// el is a HTMLAnchorElement

	return {
		description: 'liked an asset',
		asset: $(el).data('asset')
	};
});
```

If function returns **false**, event will not be sent.


### trackModel

Wrapper for **trigger** method, behaves similar to **trackLink**, listens to model changes (hearts number, specifically) and sends data to server:

```js
// asset is a Backbone.Model
analytics.trackModel(asset);
```

An event with pre-defined name 'hearted an asset' or 'unhearted an asset' will be sent to server with model's details. If you need to customize what data will be sent to the server, **trackModel** accepts function as a second argument:

```js
analytics.trackModel(asset, function(){
	return {
		shortcut: asset.get('shortcut'),
		video_url: asset.get('video_url')
	};
});
```

Just like **trackLink**, this method also can track multiple models. It also accepts a function to customize what data needs to be sent to the server and passes a model that was changed as an argument to it:

```js
analytics.trackModel([firstAsset, secondAsset], function(model){
	return {
		shortcut: model.get('shortcut'),
		video_url: model.get('video_url')
	};
});
```

You can add **success** and **error** params to listen to callbacks:

```js
analytics.trackLink('li.winners a', {
	success: function() {
		// event successfully reported
	},
	error: function(err) {
		// error happened during submission of event
	}
});
```


### trackHover

Attach events on hovering over element. Will trigger **hover_int** event.

```js
analytics.trackHover('img.banner');
```

You can add listener to elements similarly to `trackLink`:

```js
analytics.trackHover(['img.banner', 'img.logo']);
analytics.trackHover($('img'));  // can evaluate to multiple elements
analytics.trackHover([bannerEl, logoEl]);
```

Additional parameters can be passed in using the second argument:

```js
analytics.trackHover('img.banner', {eCx: 'banner'});
```

The default timeout for which the user has to hover over an element (or any element on top of it) is 1000ms. You can change it using the timeout parameter:

```js
analytics.trackHover('img.banner', {timeout: 500});
```
