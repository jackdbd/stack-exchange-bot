# Stack Exchange Telegram Bot

[![Build Status](https://travis-ci.com/jackdbd/stack-exchange-bot.svg?branch=master)](https://travis-ci.com/jackdbd/stack-exchange-bot) [![codecov](https://codecov.io/gh/jackdbd/stack-exchange-bot/branch/master/graph/badge.svg)](https://codecov.io/gh/jackdbd/stack-exchange-bot) [![Known Vulnerabilities](https://snyk.io//test/github/jackdbd/stack-exchange-bot/badge.svg?targetFile=package.json)](https://snyk.io//test/github/jackdbd/stack-exchange-bot?targetFile=package.json)

A Telegram bot to explore the [Stack Exchange API](https://api.stackexchange.com/docs). Built with [Claudia.js](https://claudiajs.com/).

## Installation and Configuration

### Create the Telegram bot

Create a new bot by talking to [BotFather](https://core.telegram.org/bots#3-how-do-i-create-a-bot) and following a few simple steps. You will get an [authorization token](https://core.telegram.org/bots#creating-a-new-bot).

### Setup Node.js version for local development/testing

[Claudia.js v.5.10.0+](https://www.claudiajs.com/news/2019/11/19/claudia-5.10.html) deploys your lambda on AWS Lambda and configures it to be executed on a Node.js `12.x` environment.

When testing your lambda locally, be sure to use the same Node.js version. I included a `.nvmrc` file in the repo, so if you use [nvm](https://github.com/nvm-sh/nvm) you just have to type:

```shell
nvm use
```

Since this project includes a `.nvmrc` file, the same Node.js version will be used on [Travis CI](https://docs.travis-ci.com/user/languages/javascript-with-nodejs#specifying-nodejs-versions-using-nvmrc).

### Install dependencies

Install both production and development dependencies:

```shell
yarn
```

### First deployment

The first time you deploy your bot, you will need to create an API on [AWS API Gateway](https://aws.amazon.com/api-gateway/), create a lambda on [AWS Lambda](https://aws.amazon.com/lambda/), create a security role on [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/), setup policies for your lambda to use other AWS services such as S3 or DynamoDB.

You can do all of the above with this command:

```shell
yarn bot:create
```

### Configure the bot

Now that the bot is deployed on AWS, you need to configure it with the `authorization token` that BotFather gave you.

```shell
yarn bot:configure-telegram  # type access token when prompted
```

## Development

Whenever you want to deploy a new version of the bot, run one of these commands:

```shell
yarn bot:update:dev  # development
yarn bot:update:prod && yarn api:release  # production
```

*Note:* You can invoke [npm Task List](https://github.com/ruyadorno/ntl) with: `yarn menu` to avoid typing the commands.

## Typescript type definitions

At the moment [claudia-api-builder](https://www.claudiajs.com/claudia-api-builder.html) and [claudia-bot-builder](https://claudiajs.com/claudia-bot-builder.html) don't ship their type definitions. I included some type definitions in the `@types` directory. They are ok for the current needs of this project, but they are incomplete. Don't rely on them too much.
