'use strict'

const StellarSdk = require('stellar-sdk')
const { server } = require('../../api/index')
const { alice, escrow, bob } = require('../../config/index')

/**
 * This method is used to set the multisig account.
 */
async function setMultiSig () {
  const escrowKeypair = StellarSdk.Keypair.fromSecret(escrow.secret) // Escrow's keypair.
  const escrowAccount = await server.loadAccount(escrow.public) // Escrow's account.

  // Options for the Alice signature.
  const aliceSigner = {
    signer: {
      ed25519PublicKey: alice.public,
      weight: 1
    }
  }

  // Options for the Bob signature.
  const bobSigner = {
    signer: {
      ed25519PublicKey: bob.public,
      weight: 1
    }
  }

  // Options for the transaction.
  const txOptions = {
    fee: StellarSdk.BASE_FEE,
    memo: StellarSdk.Memo.text('Set multisig escrow.'),
    networkPassphrase: StellarSdk.Networks.TESTNET
  }

  const transaction = new StellarSdk.TransactionBuilder(escrowAccount, txOptions)
    // Add operations to transaction
    .addOperation(StellarSdk.Operation.setOptions({
      masterWeight: 0, // Escrow account has a master weight of 0.
      lowThreshold: 1,
      medThreshold: 2,  // Payment is medium-weighted.
      highThreshold: 2
    }))
    .addOperation(StellarSdk.Operation.setOptions(aliceSigner))
    .addOperation(StellarSdk.Operation.setOptions(bobSigner))
    // Timeout for transaction
    .setTimeout(100)
    .build()

  // Sign the transaction with Escrow Account.
  transaction.sign(escrowKeypair)

  await server.submitTransaction(transaction)
  console.log('Multi-signature enabled.')
}

module.exports = { setMultiSig }
