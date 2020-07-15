'use strict'

const inquirer = require('inquirer')
const { createEscrow } = require('./functions/alice/create-escrow')
const { fundEscrow } = require('./functions/alice/fund-escrow')
const { setMultiSig } = require('./functions/alice/set-multisig')
const { releaseFunds } = require('./functions/alice/release-funds')
const { signFunds } = require('./functions/alice/sign-funds')
const { withdraw } = require('./functions/bob/withdraw')

inquirer
  .prompt([
    {
      type: 'list',
      name: 'who',
      message: 'Who you are?',
      choices: ['Alice', 'Bob']
    }
  ])
  .then((answers) => {
    if (answers.who === 'Alice') {
      inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices: ['Create Escrow', 'Fund Escrow', 'Set Multisig', 'Release Funds', 'Sign Funds']
        }
      ]).then(async (answers) => {
        if (answers.action === 'Create Escrow') {
          createEscrow()
        }
        if (answers.action === 'Fund Escrow') {
          fundEscrow()
        }
        if (answers.action === 'Set Multisig') {
          setMultiSig()
        }
        if (answers.action === 'Release Funds') {
          releaseFunds()
        }
        if (answers.action === 'Sign Funds') {
          signFunds()
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices: ['Withdraw Funds']
        }
      ]).then(async (answers) => {
        if (answers.action === 'Withdraw Funds') {
          withdraw()
        }
      }).catch((error) => {
        if (error.isTtyError) {} else {}
      })
    }
  })
  .catch((error) => {
    console.log(error)
  })
