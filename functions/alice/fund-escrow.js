'use strict'

const StellarSdk = require('stellar-sdk')
const { server } = require('../../api/index')
const { alice, escrow } = require('../../config/index')

/**
 * This method will fund the escrow account. Create, sign and
 * send a transaction using JS Stellar SDK.
 *
 * @param {string} amount - The amount of XLM to send.
 */
async function fundEscrow (amount) {
  try {
    const aliceKeypair = StellarSdk.Keypair.fromSecret(alice.secret) // Alice's keypair.
    const aliceAccount = await server.loadAccount(alice.public) // Alice's account.

    // Options for transaction.
    const txOptions = {
      fee: StellarSdk.BASE_FEE,
      memo: StellarSdk.Memo.text('Funding Escrow.'), // Memo.
      networkPassphrase: StellarSdk.Networks.TESTNET
    }

    // Options for the payment.
    const options = {
      destination: escrow.public,
      asset: StellarSdk.Asset.native(),
      amount: amount || '10.000'
    }

    // Create transaction.
    const transaction = new StellarSdk.TransactionBuilder(aliceAccount, txOptions)
      // Add operation to transaction
      .addOperation(StellarSdk.Operation.payment(options))
      // Timeout for transaction
      .setTimeout(30)
      .build()

    // Sign the transaction with Alice Account
    transaction.sign(aliceKeypair)

    await server.submitTransaction(transaction)
    console.log('Escrow funded.')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { fundEscrow }
