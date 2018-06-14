## [v2.0.0]

> June 14th, 2018

- Add option to specify total attempts to make successful request before reporting error that there is a connection issue

Breaking change: Default is set to two and in v1.1.0 this functionality did not exist. No action needed if this functionality is desired otherwise pass `maxAttempts: 1` to the options to maintain existing functionality.

## [v1.1.0]

> March 16th, 2018

- Sentry errors include failing domain and error status code or error message in the title

## [v1.0.0]

> March 2nd, 2018

- Simple uptime monitoring script that reports errors to Sentry

```javascript
const sites = ["http://intermittentlyfailingdomain.com"];
const monitoring = sites.map(url => ({ request: { url } }));
require("@jwdotjs/uptime")({ monitoring }).init();
```
