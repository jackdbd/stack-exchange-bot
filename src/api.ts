import * as AWS from 'aws-sdk';
import botBuilder, { TelegramMessage } from 'claudia-bot-builder';
import { text } from 'print-error';
import uuidv4 from 'uuid/v4';

import {
  makeReply as makeReplyBadges,
  promise as promiseBadges,
} from './badges';
import { setupDemoEndpoint } from './configure-stage-variable';
import { COMMAND } from './constants';
import { makeReply as makeReplyHelp } from './help';
import {
  makeReply as makeReplyAnswerers,
  promise as promiseAnswerers,
} from './users';

const { telegramTemplate } = botBuilder;

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const table = 'users';

export const makeErrorReply = (err: any) => {
  const md = `
  Sorry, there was an error with your request.

  ---

  *Stacktrace*

  ${text(err)}
  `;

  return {
    parse_mode: 'Markdown',
    text: md,
  };
};

// const putUser = (request: Request) => {
//   const params = {
//     TableName: table,
//     Item: {
//       userid: request.body.userId,
//       name: request.body.name,
//     },
//   };
//   return dynamoDb.put(params).promise();
// };

const putDemoUser = () => {
  const userid = uuidv4();
  const params = {
    TableName: table,
    Item: {
      name: `Bob-${userid.slice(0, 5)}`,
      userid,
    },
  };
  return dynamoDb.put(params).promise();
};

const scanUsers = async () => {
  try {
    const response = await dynamoDb.scan({ TableName: table }).promise();
    return response.Items;
  } catch (err) {
    return { message: 'There was an error' };
  }
};

const makeReplyGetUsers = (users: any) => {
  return `We have ${users.length} users`;
};

const makeReplyPostUser = () => {
  return `Item created in "${table}" table`;
};

const OPTION_A = COMMAND.GET_USERS;
const OPTION_B = COMMAND.POST_USER;

const replyKeyboard = [[OPTION_A], [OPTION_B]];

export const messageHandler = (message: TelegramMessage) => {
  const msg = message.text.toLowerCase();
  switch (msg) {
    case COMMAND.BADGES: {
      return promiseBadges.then(makeReplyBadges).catch(makeErrorReply);
    }

    case COMMAND.FETCH_TOP_20: {
      return promiseAnswerers.then(makeReplyAnswerers).catch(makeErrorReply);
    }

    case COMMAND.GET_USERS: {
      return scanUsers()
        .then(makeReplyGetUsers)
        .catch(makeErrorReply);
    }

    case COMMAND.HELP: {
      return makeReplyHelp();
    }

    case COMMAND.POST_USER: {
      return putDemoUser()
        .then(makeReplyPostUser)
        .catch(makeErrorReply);
    }

    case COMMAND.QUIZ: {
      return [
        new telegramTemplate.Text('How can I help?').get(),
        new telegramTemplate.Pause(1000).get(),
        new telegramTemplate.Text('Here is what I can do...')
          .addReplyKeyboard(replyKeyboard)
          .get(),
      ];
    }

    case COMMAND.TEST: {
      return 'This is a test reply';
    }

    default:
      return `I don't understand ${
        message.text
      }. I understand only: ${Object.values(COMMAND).join()}.`;
  }
};

const options = { platforms: ['telegram'] };
const optionalLogError = undefined;

// Call botBuilder first, because it instantiates ApiBuilder internally.
const apiWithBot = botBuilder(messageHandler, options, optionalLogError);

// This function mutates the instance of ApiBuilder passed in.
export const apiFinal = setupDemoEndpoint(apiWithBot);
