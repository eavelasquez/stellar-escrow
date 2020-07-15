'use strict'

const fs = require('fs').promises
const path = require('path')
const StellarSdk = require('stellar-sdk')
const { alice } = require('../../config/index')

/**
 * This method is used to sign the funds release transaction for Alice.
 */
async function signFunds () {
  const aliceKeypair = StellarSdk.Keypair.fromSecret(alice.secret) // Alice's keypair.

  // Load the transaction envelope from a file.
  const fundReleaseTx = await fs.readFile(
    path.join(__dirname, '../../fundsReleaseTx.txt'),
    { encoding: 'base64' }
  )

  // envelopeXDR is the transaction envelope as a base64 encoded string.
  const envelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(
    fundReleaseTx,
    'base64'
  )

  const transaction = new StellarSdk.Transaction(
    envelope,
    StellarSdk.Networks.TESTNET
  )

  // Sign the transaction.
  transaction.sign(aliceKeypair)

  const txEnvelopeXDR = transaction.toEnvelope().toXDR('base64')

  // Save the signed transaction envelope to a file.
  await fs.writeFile(
    path.join(__dirname, '../../fundsReleaseTx.txt'),
    txEnvelopeXDR,
    { encoding: 'base64' }
  )
  console.log('Signing transaction')
}

module.exports = { signFunds }
