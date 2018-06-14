const { request, logErr } = require("distraught");

const DEFAULT_INTERVAL = 60000;
const MAX_ATTEMPTS = 2;
function uptime(config = {}, attempt = 1) {
  return {
    request(payload) {
      if (!payload.url) {
        throw new Error("URL is required for uptime monitoring requests");
      }

      if (!payload.method) {
        payload.method = "GET";
      }

      payload.logErrors = false; // turn off default logging

      return request(payload).catch(err => {
        if (
          attempt <
          (this.config.hasOwnProperty("maxAttempts")
            ? this.config.maxAttempts
            : MAX_ATTEMPTS)
        ) {
          return this.request(payload, attempt + 1);
        }

        let statusOrMessage = err.message;
        if (err.response && err.response.status) {
          statusOrMessage = `status code ${err.response.status}`;
        }
        logErr(new Error(`${payload.url} responded with ${statusOrMessage}`), {
          url: payload.url,
          debug: payload.debug,
          data: payload.data || ""
        });
      });
    },

    init() {
      this.config = config;
      if (!config) {
        throw new Error(
          "Uptime config must be specified. See docs for details."
        );
      }
      if (
        !(
          config.monitoring &&
          config.monitoring.length &&
          Array.isArray(config.monitoring)
        )
      ) {
        throw new Error(
          "Uptime config monitoring must be specified. See docs for details."
        );
      }

      config.monitoring.forEach(site => {
        setInterval(
          () => this.request(site.request),
          site.interval || DEFAULT_INTERVAL
        );
      });
    }
  };
}

module.exports = uptime;
