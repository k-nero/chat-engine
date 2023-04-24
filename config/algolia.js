const algolia = require('algoliasearch');

const client = algolia(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);

module.exports = client;
