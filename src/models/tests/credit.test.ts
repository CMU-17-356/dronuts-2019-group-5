import {
  getCompanyInfoRequest,
  getCompanyInfoResponse,
  putCompanyInfoRequest,
  putCompanyInfoResponse,
  getTransactionInfoRequest,
  getTransactionInfoResponse,
  createTransactionRequest,
  createTransactionResponse,
  cancelTransactionRequest,
  cancelTransactionResponse,
  processTransactionRequest,
  processTransactionResponse
} from '../credit';

import clone from 'clone';


/*
 * getCompanyInfo
 */
test('getCompanyInfoRequest allows a correct company info request', () => {
  const request = '1';
  expect(getCompanyInfoRequest.validate(request).error).toBeNull();
});

test('getCompanyInfoRequest rejects an empty company info request', () => {
  const request = '';

  const result = getCompanyInfoRequest.validate(request);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

const correctCompanyInfo = {
  // from the Swagger explorer
  "id": "string",
  "friendly_name": "string"
};

test('getCompanyInfoResponse allows a correct company info object', () => {
  const companyInfo = clone(correctCompanyInfo);
  expect(getCompanyInfoResponse.validate(companyInfo).error).toBeNull();
})

/*
 * putCompanyInfo
 */
test('putCompanyInfoRequest allows a correct company info request', () => {
  const companyInfo = clone(correctCompanyInfo);
  expect(putCompanyInfoRequest.validate(companyInfo).error).toBeNull();
});

test('putCompanyInfoResponse allows a correct company info object', () => {
  const companyInfo = clone(correctCompanyInfo);
  expect(putCompanyInfoResponse.validate(companyInfo).error).toBeNull();
});

test('putCompanyInfoResponse rejects a company info object missing id', () => {
  const companyInfo = clone(correctCompanyInfo);
  delete companyInfo.id;

  const result = putCompanyInfoResponse.validate(companyInfo);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

/*
 * getTransactionInfo
 */
test('getTransactionInfoRequest allows a correct transaction request', () => {
  const request = '1';
  expect(getTransactionInfoRequest.validate(request).error).toBeNull();
});

test('getTransactionInfoRequest rejects an empty transaction request', () => {
  const request = '';

  const result = getTransactionInfoRequest.validate(request);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

const correctTransaction = {
  // from the Swagger explorer
  "id": "string",
  "companyId": "string",
  "amount": 0,
  "status": "pending"
};

test('getTransactionInfoResponse allows a correct transaction object', () => {
  const transaction = clone(correctTransaction);
  expect(getTransactionInfoResponse.validate(transaction).error).toBeNull();
})

test('getTransactionInfoResponse rejects non-enum status', () => {
  const transaction = clone(correctTransaction);
  transaction.status = 'eaten';

  const result = getTransactionInfoResponse.validate(transaction);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
})

/*
 * createTransaction
 */
test('createTransactionRequest allows a correct company info request', () => {
  const request = {
    companyId: '1',
    amount: 200,
  };
  expect(createTransactionRequest.validate(request).error).toBeNull();
});

test('createTransactionResponse allows a correct transaction object', () => {
  const transaction = clone(correctTransaction);
  expect(createTransactionResponse.validate(transaction).error).toBeNull();
})

test('createTransactionResponse rejects missing amount', () => {
  const transaction = clone(correctTransaction);
  delete transaction.amount;

  const result = createTransactionResponse.validate(transaction);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

/*
 * cancelTransaction
 */
test('cancelTransactionRequest allows a correct transaction request', () => {
  const request = '1';
  expect(cancelTransactionRequest.validate(request).error).toBeNull();
});

test('cancelTransactionRequest rejects an empty transaction request', () => {
  const request = '';

  const result = cancelTransactionRequest.validate(request);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

test('cancelTransactionResponse allows a correct transaction object', () => {
  const transaction = clone(correctTransaction);
  expect(cancelTransactionResponse.validate(transaction).error).toBeNull();
})

test('cancelTransactionResponse rejects missing status', () => {
  const transaction = clone(correctTransaction);
  delete transaction.status;

  const result = cancelTransactionResponse.validate(transaction);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});

/*
 * processTransaction
 */
test('processTransactionRequest allows a valid request object', () => {
  const request = {
    id: '1',
    customer_details: 'Wow',
    credit_card: '1234',
  };
  expect(processTransactionRequest.validate(request).error).toBeNull();
});

test('processTransactionResponse allows a correct transaction object', () => {
  const transaction = clone(correctTransaction);
  expect(processTransactionResponse.validate(transaction).error).toBeNull();
});

test('processTransactionResponse rejects a missing companyId', () => {
  const transaction = clone(correctTransaction);
  delete transaction.companyId;

  const result = processTransactionResponse.validate(transaction);
  expect(result.error).not.toBeNull();
  expect(result.error.name).toBe('ValidationError');
});
