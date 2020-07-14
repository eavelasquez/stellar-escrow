'use strict'

const StellarSdk = require('stellar-sdk')

// instantiate the server.
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')

export { server }
