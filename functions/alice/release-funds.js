'use strict'

const fs = require('fs').promises
const path = require('path')
const StellarSdk = require('stellar-sdk')
const { server } = require('../../api/index')
const { escrow, bob } = require('../../config/index')

/**
 * This method is used to release funds from the escrow account.
 */
async function releaseFunds () {
  const escrowAccount = await server.loadAccount(escrow.public) // Escrow's account.

  const txOptions = {
    fee: StellarSdk.BASE_FEE,
    memo: StellarSdk.Memo.text('Release Bob'),
    networkPassphrase: StellarSdk.Networks.TESTNET
  }

  // Options for the payment to Bob.
  const paymentToBob = {
    destination: bob.public,
    asset: StellarSdk.Asset.native(),
    amount: '10.000'
  }

  const transaction = new StellarSdk.TransactionBuilder(
    escrowAccount,
    txOptions
  )
    // Add operation to transaction.
    .addOperation(StellarSdk.Operation.payment(paymentToBob))
    // Timeout for transaction.
    .setTimeout(100)
    .build()

  const txEnvelopeXDR = transaction.toEnvelope().toXDR('base64')

  // Save the transaction envelope to a file.
  await fs.writeFile(
    path.join(__dirname, '../../fundsReleaseTx.txt'),
    txEnvelopeXDR,
    { encoding: 'base64' }
  )
  console.log('Transaction generated.')
}

module.exports = { releaseFunds }
