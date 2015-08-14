/* @flow */
'use strict';
const utils = require('./utils');
const validate = utils.common.validate;
const composeAsync = utils.common.composeAsync;
const parseLedger = require('./parse/ledger');

function getLedgerAsync(options, callback) {
  validate.getLedgerOptions(options);

  const request = {
    ledger: options.ledgerVersion || 'validated',
    expand: options.includeAllData,
    transactions: options.includeTransactions,
    accounts: options.includeAccounts
  };

  this.remote.requestLedger(request,
    composeAsync(response => parseLedger(response.ledger), callback));
}

function getLedger(options={}) {
  return utils.promisify(getLedgerAsync).call(this, options);
}

module.exports = getLedger;
