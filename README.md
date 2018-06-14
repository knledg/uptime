# Uptime Monitoring That Logs To Sentry

## Requirements

- You must have `SENTRY_DSN` specified in your .env

## Config

- In the below example, the request object gets passed directly to [Axios](https://github.com/axios/axios)
- If you don't specify an HTTP Method in the request, it will default to GET
- If you don't specify an interval it will default to 60 seconds

```javascript
const uptime = require('@jwdotjs/uptime');

uptime({
  monitoring: [
    {
      request: {
        url: '',
        method?: 'GET'|'POST'|'PUT'|'DELETE',
        headers?: {},
        data?: {},
      },
      interval?: 60000,
    },
    maxAttempts: 2, // how many total times a request should fail consecutively before we log an error
  ],
}).init();
```

## Example Usage

```javascript
const uptime = require("@jwdotjs/uptime");

uptime({
  monitoring: [
    { request: { url: "http://www.google.com" } },
    { request: { url: "http://www.yahoo.com" } },
    { request: { url: "http://www.sitewithanoutage.com" } }
  ],
  maxAttempts: 2 // how many total times a request should fail consecutively before we log an error
}).init();
```

![Result In Console](https://i.imgur.com/9ezZwYX.png)
