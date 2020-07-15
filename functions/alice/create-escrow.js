'use strict'

const StellarSdk = require('stellar-sdk')
const { server } = require('../../api/index')
const { alice, escrow } = require('../../config/index')

/**
 * This method will create an escrow account. Create, sign and
 * send a transaction using JS Stellar SDK.
 */
async function createEscrow () {
  try {
    const aliceKeypair = StellarSdk.Keypair.fromSecret(alice.secret) // Alice's keypair.
    const aliceAccount = await server.loadAccount(aliceKeypair.publicKey()) // Alice's account.

    const escrowAccountConfig = {
      destination: escrow.public, // Escrow's public key.
      startingBalance: '1.0' // Escrow's starting balance.
    }

    // Options for transaction.
    const txOptions = {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    }

    // Create transaction.
    const transaction = new StellarSdk.TransactionBuilder(
      aliceAccount,
      txOptions
    )
      // Add operation to transaction.
      .addOperation(StellarSdk.Operation.createAccount(escrowAccountConfig))
      // Timeout for transaction.
      .setTimeout(30)
      .build()

    // Sign the transaction with Alice Account.
    transaction.sign(aliceKeypair)

    await server.submitTransaction(transaction)
    console.info('Created Escrow Account.')
  } catch (error) {
    console.error(error)
  }
}

module.exports = { createEscrow }
