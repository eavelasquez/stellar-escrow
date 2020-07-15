'use strict'

const fs = require('fs').promises
const path = require('path')
const StellarSdk = require('stellar-sdk')
const { server } = require('../../api/index')
const { bob } = require('../../config/index')

/**
 * This method is used to withdraw funds from Bob's account.
 */
async function withdraw () {
  try {
    const bobKeypair = StellarSdk.Keypair.fromSecret(bob.secret) // Bob's keypair.

    // Load the transaction envelope from a file.
    const fundReleaseTx = await fs.readFile(
      path.join(__dirname, '../../fundsReleaseTx.txt'),
      { encoding: 'base64' }
    )

    // buffer to string
    const buffer = Buffer.from(fundReleaseTx, 'base64')

    // envelopeXDR is the transaction envelope as a base64 encoded string.
    const envelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(buffer, 'base64')

    const transaction = new StellarSdk.Transaction(
      envelope,
      StellarSdk.Networks.TESTNET
    )

    // Sign the transaction.
    transaction.sign(bobKeypair)

    // Submit the transaction to the Horizon server.
    await server.submitTransaction(transaction)
    console.log('Withdraw by Bob')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { withdraw }
