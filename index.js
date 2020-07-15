'use strict'

const inquirer = require('inquirer')
const { createEscrow } = require('./functions/alice/create-escrow')
const { fundEscrow } = require('./functions/alice/fund-escrow')

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
          choices: ['Create Escrow', 'Fund Escrow']
        }
      ]).then(async (answers) => {
        if (answers.action === 'Create Escrow') {
          createEscrow()
        }
        if (answers.action === 'Fund Escrow') {
          fundEscrow()
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  })
  .catch((error) => {
    console.log(error)
  })
