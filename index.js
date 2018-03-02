const {request} = require('distraught');

const DEFAULT_INTERVAL = 60000;
function uptime(config = {}) {
  return {
    request(payload) {
      if (!payload.url) {
        throw new Error('URL is required for uptime monitoring requests');
      }

      if (!payload.method) {
        payload.method = 'GET';
      }

      return request(payload)
        .catch((err) => {});
    },

    init() {
      this.config = config;
      if (!config) {
        throw new Error('Uptime config must be specified. See docs for details.');
      }
      if (!(config.monitoring && config.monitoring.length && Array.isArray(config.monitoring))) {
        throw new Error('Uptime config monitoring must be specified. See docs for details.');
      } 

      config.monitoring.forEach((site) => {
        setInterval(() => this.request(site.request), site.interval || DEFAULT_INTERVAL);
      });
    }
  };
}

module.exports = uptime;