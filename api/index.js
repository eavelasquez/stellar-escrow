'use strict'

const StellarSdk = require('stellar-sdk')

// Instantiate the server.
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')

module.exports = { server }
