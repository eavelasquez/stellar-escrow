# stellar-escrow
This app's an implementation of an escrow smart contract between Alice and Bob on the Stellar Network.

To run it, follow these steps:

1. Copy .env.example to an .env.
  ```bash
  cp .env.example .env
  ```

1. Go to [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test) and create three accounts, copy their public and secrets keys in .env for Alice, Bob and Escrow.

1. Fund Alice and Bob accounts using Stellar Friendbot.

After the above steps, you can run the application to interact with smart contract, run:
```bash
npm start
```

Be sure execute the options in order:

## Alice
1. **Create Escrow:** this option will create an escrow account.
1. **Fund Escrow:** this option will fund the escrow account.
1. **Set Multisig:** this option is used to set the multi-signature account.
1. **Release Funds:** this option is used to release funds from the escrow account.
1. **Sign Funds:** this option is used to sign the funds release transaction for Alice.

## Bob
1. **Withdraw Funds:** this option is used to withdraw funds from Bob's account.
