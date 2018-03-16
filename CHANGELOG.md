
## [v1.1.0]
> March 16th, 2018

- Sentry errors include failing domain and error status code or error message in the title

## [v1.0.0]
> March 2nd, 2018

- Simple uptime monitoring script that reports errors to Sentry

```javascript
const sites = ['http://intermittentlyfailingdomain.com'];
const monitoring = sites.map((url) => ({request: {url}}));
require('@jwdotjs/uptime')({monitoring}).init();
```