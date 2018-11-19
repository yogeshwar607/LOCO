
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




For testing and verification

Postman Collection - https://www.getpostman.com/collections/b840a6f8f5337ede1bbf


Folder Structure for reference

![folder structure](https://raw.githubusercontent.com/yogeshwar607/remotepanda/master/screenshot.png)