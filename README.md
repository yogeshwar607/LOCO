
## Requirements

* Node 8 ++ 
* Git

## Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/yogeshwar607/remotepanda.git
cd remotepanda
```

```bash
npm install
```

Open `envConfig.json` and inject your credentials , as of now i have added my credential for testing purpose.


To start the express server, run the following
```bash
npm start 
```

Test cases are written for api testing at /test/apiTest.js using supertest and mocha
Install supertest 
```bash
npm install supertest --save-dev
```

To test api, run the following
```bash
npm test 
```

Test case output
![test cases](https://raw.githubusercontent.com/yogeshwar607/LOCO/master/testresult.png)



# For testing and verification

Postman Collection - https://www.getpostman.com/collections/b840a6f8f5337ede1bbf


##Approach for apis 

#Note:

All the apis are validated using Joi schema (npm package).

Boom (npm package) is used for error handling.

For in-memory implementation , transaction array is defined in at /models/index.js below format  

```bash
transaction array = [{"type":"debit","amount":121,"parent_id":46564}];
```
1. /web/api/transaction/create

    After basic sanitization check below function is called 
    transactionList.addTxn(txnObj) defined at /models/index 
    
    This function will check whether transaction exits with same transaction id , 
    if yes then throws error otherwise adds record to transaction list array

2. /web/api/transaction/get

   Based on request url , this is handling get requests
   After checking url , 3 request types are defined in logic based on url inputs
        
        * transaction
        * types
        * sum

    transaction request type - transactionList().getTxnById(transactionId) is called 
    which is defined at /models/index

        It will find transaction detail based on transaction_id as input
    Response is returned if valid transaction is found.

    types request type - transactionList().getTxnByType(type) is called 
    which is defined at /models/index
        It will filter and return transactions id in array with have same type - debit/credit

    sum request type - transactionList().getSumByParentId(transactionId) is called 
    which is defined at /models/index

        It will find parent_id based on transaction_id as input.
        After finding parent_id , it will return all the transaction linked to parent_id.

    Sum of these filtered transaction is calculated using Array.reduce() and response is returned

