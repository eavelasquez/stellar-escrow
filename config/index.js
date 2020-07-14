'use strict'

// Loads .env file contents into process.env.
require('dotenv').config()

// Alice credentials.
const alice = {
  public: process.env.ALICE_PUBLIC,
  secret: process.env.ALICE_SECRET
}

// Bob credentials.
const bob = {
  public: process.env.BOB_PUBLIC,
  secret: process.env.BOB_SECRET
}

// Escrow credentials.
const escrow = {
  public: process.env.ESCROW_PUBLIC,
  secret: process.env.ESCROW_SECRET
}

module.exports = { alice, bob, escrow }
