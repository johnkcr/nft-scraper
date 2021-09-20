
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./nft-scraper.cjs.production.min.js')
} else {
  module.exports = require('./nft-scraper.cjs.development.js')
}
