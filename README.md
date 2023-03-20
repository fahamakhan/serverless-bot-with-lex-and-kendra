# Serverless NestJS Bot with Lex and Kendra
This app answers user's query regarding founder of companies. The flow is described below and also can be easily understood by reading the self explanatory code
1. App first check if Lex bot has answer to the question
2. If found then Lex returns the answer
3. If not found then the question then would be passed to Kendra
4. Kendra has some web crawled data in it from Wikipedia
5. Kendra then return the answer if found
6. If not found in Kendra too then app returns "Can't find answer to that"

## Installation

```bash
$ yarn
```

## Running the app

```bash
# watch mode
$ yarn start:dev
```

Note: Before starting the server ,ensure the below keys are updated in the `.env`
```
BOT_ID=
BOT_ALIAS_ID=
INDEX_ID=
```

## Deploy to Cloud

1. Configure your AWS credentials using `aws configure` command.
2. Put aws access key and secret in terminal
2. `sls deploy`

This command will deploy the APIs as lambda serverless functions and you will be given link to access the app

Note: Ensure you have Serverless Framework installed. If not , you can install it globally using `npm install -g serverless`


## Test Serverless Locally

`sls offline`


## Test Deployed Version

Test the deployed version of the app in the postman. link is given below and APIs are self explanatory by name
```
https://documenter.getpostman.com/view/17101335/2s93K1pKRa
```
