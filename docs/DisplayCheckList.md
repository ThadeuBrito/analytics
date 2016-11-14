## Display checklist

### Instalation

Import the `Analytics.js` lib

```html
<script src="//static.getchute.com/js/analytics/1/analytics.min.js"></script>
```

Initialize the Analytics

```javascript
var analytics = new Chute.Analytics({
  campaign: '1234', // campaign id - cID
  display: '000000', // display id - dID
}, {});

// Requests expected
// http://pixel.getchute.com/x.gif?eTp=view_load&cID=...&dID=...&uID=...&uSe=...&eUr=...&_=...
// http://pixel.getchute.com/x.gif?eTp=view_time&cID=...&dID=...&uID=...&uSe=...&sec=...&_=...
```
It will trigger the impressions, engagements and timespent

### Events

If the display has lightbox feature, a event `click_lightbox` should be triggered when open the lightbox.
It is interesting send this events after lightbox opened.

```javascript
analytics.trigger('click_lightbox', {
  album: '', // album shortcut - lID
  asset: '' // asset shortcut - aID
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_lightbox&cID=...&dID=...&aID=...&uID=...&uSe=...&_=...
```

When the user click on next or previous arrows `click_next` or `click_prev` should be triggered.

```javascript
analytics.trigger('click_next', {});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_next&cID=...&dID=...&uID=...&uSe=...&_=...

analytics.trigger('click_prev', {});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_prev&cID=...&dID=...&uID=...&uSe=...&_=...
```

The actions like `vote`, `unvote`, `heart` and `unheart` should be tracked too. Attention, currently we don't track how many hearts or votes has one asset, so if you send the album and asset for these events bellow it will count as click for the assets. Probably it will be duplicated because the `click_lightbox` already be counted a click to the asset.

```javascript
analytics.trigger('click_vote', {
  // album: '', // album shortcut - lID
  // asset: '' // asset shortcut - aID
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_vote&cID=...&dID=...&lID=...&aID=...&uID=...&uSe=...&_=...

analytics.trigger('click_unvote', {
  // album: '', // album shortcut - lID
  // asset: '' // asset shortcut - aID
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_unvote&cID=...&dID=...&lID=...&aID=...&uID=...&uSe=...&_=...

analytics.trigger('click_heart', {
  // album: '', // album shortcut - lID
  // asset: '' // asset shortcut - aID
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_heart&cID=...&dID=...&lID=...&aID=...&uID=...&uSe=...&_=...

analytics.trigger('click_unheart', {
  // album: '', // album shortcut - lID
  // asset: '' // asset shortcut - aID
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_unheart&cID=...&dID=...&lID=...&aID=...&uID=...&uSe=...&_=...
```

If the display has a button to open the media chooser

```javascript
analytics.trigger('click_chooser', {
  mcID: '' // media chooser id
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_chooser&mcID=...&cID=...&dID=...&uID=...&uSe=...&_=...
```

The buttons to share a asset should be tracked too. For it we have the events type `share_facebook`, `share_twitter`, `share_tumblr`, `share_pinterest` and `share_googleplus`

```javascript
analytics.trigger('share_facebook', {
  asset: '', // asset shortcut - aID
  album: '' // album shortcut - lID
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=share_facebook&cID=...&dID=...&lID=...&aID=...&uID=...&uSe=...&_=...
```

### Other events
The events above are the mostly common events in the display


### E-commerce

If the lightbox has a E-commerce feature the event `view_lightbox` should be sent, but for this case it will count as view for the product.

```javascript
analytics.trigger('view_lightbox', {
  product: '' // product sku
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=view_lightbox&cID=...&dID=...&aID=...&uID=...&uSe=...&_=...
```

External links should trigger `click_url` when clicked. if the event is trigerred by shop button, the product `sku` must be passed.

```javascript
analytics.trigger('click_url', {
  eUr: 'http://example.com', // url
  product: '', // product sku, if there is one - pID
});

// Expected request
// http://pixel.getchute.com/x.gif?eTp=click_url&cID=...&dID=...&uID=...&uSe=...&eUr=...&_=...
```

To trigger purchase event, client should include the following script on the checkout page:

```html
<script src="//static.getchute.com/js/analytics/1/purchase.min.js" id="chute-purchase-script" data-campaign-id="{{ Campaign ID }}" data-order-id="{{ Order ID }}" data-order-value="{{ Order value in cents }}" data-order-currency="{{ Order currency }}"></script>
```

```javascript
// Expected request
// http://pixel.getchute.com/x.gif?uID=...&eTp=purchase&cID=...&oID=...&pID=...&oVa=...&oCu=...&dID=...&aID=null&lID=null&_=...
```

Currently the `aID` and `lID` are null because we don't need it yet.

### Parameters

Events passed through the Analytics system should minimally have the following URI parameters.
These will depend on the type of object that the event is linked to, and various event anomalies (URL for exits, etc).

Campaign & Display & Chooser

  - **cID**: Campaign ID: Required if available
  - **dID**: Display ID: Required if event is linked to a specific display
  - **dTp**: Display Type: Required for display-related events
  - **dVs**: Display Version: Required for display-related events
  - **mcID**: Media Chooser ID: Required if event is linked to a media chooser

Item Identifiers

  - **aID**: Asset Shortcut: Required if event is linked to a specific asset
  - **lID**: Album ID: Required if event is linked to a specific album
  - **pID**: Product ID: Required if event is linked to a specific product

Event Details

  - **eTp**: Event Type: Required. See [Events](#events) for list of standard events.
  - **eCx**: Event Context: Optional. Describes the user context of event (lightbox, grid, etc.)
  - **eUr**: Event URL: Optional. Included when available, e.g. as the destination URL for click_url event.
  - **rUrl**: Redirect URL: Optional. Included with the click_url event, contains the tunnel URL the tracking server should redirect the user to. Can be different from the final destination eUr if there are multiple trackthrough servers in the middle.
  - **sec**: Seconds: Optional. Included with view_time, represents number of seconds since the previous view_time (or view_load) event.

Order Details

  - **oID**: Order ID: Optional. Included with purchase event.
  - **oVa**: Order value: Optional. Included with purchase event.
  - **oCu**: Order currency: Optional. Included with purchase event. If not specified, it's assumed to be USD.

User

  - **uID**: User ID: Included automatically. Received by lib from cookie. Used to determine uniques.
  - **uSe**: Session ID: Included automatically. Unique for every page view.
  - **udTp**: User device type: *Currently omitted, need to replace wurfl.io*

Additional Parameters can be added for custom filtering

  - **tags**: hashtags that are associated with the object.
