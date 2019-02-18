import * as Joi from 'joi'

/*
 * Definitions from the Credit API swagger.json
 */

export const Company = Joi.object({
  id: Joi.string().required(),
  friendly_name: Joi.string().required(),
});

export const Transaction = Joi.object({
  id: Joi.string().required(),
  companyId: Joi.string().required(),
  amount: Joi.number().required(),
  status: Joi.string().valid('pending', 'approved', 'denied').required(),
})

export const CustomerDetails = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  billing_addr: Joi.string().required(),
  billing_city: Joi.string().required(),
  billing_state: Joi.string().required(),
  billing_zip: Joi.string().required(),
  billing_country: Joi.string().required(),
});

export const CreditCard = Joi.object({
  number: Joi.number().required(),
  cvv: Joi.number().required(),
  expires_mo: Joi.number().required(),
  expires_yr: Joi.number().required(),
});

/*
 * Definitions in terms of Dronuts use of them
 */
export const getCompanyInfoRequest = Joi.string();
export const getCompanyInfoResponse = Company;

export const putCompanyInfoRequest = Company;
export const putCompanyInfoResponse = Company;

export const getTransactionInfoRequest = Joi.string();
export const getTransactionInfoResponse = Transaction;

export const createTransactionRequest = Joi.object().keys({
  companyId: Joi.string(),
  amount: Joi.number(),
})
export const createTransactionResponse = Transaction;

export const cancelTransactionRequest = Joi.string();
export const cancelTransactionResponse = Transaction;

export const processTransactionRequest = Joi.object().keys({
  id: Joi.string().required(),
  customer_details: Joi.string().required(),
  credit_card: Joi.string().required(),
})
export const processTransactionResponse = Transaction;
