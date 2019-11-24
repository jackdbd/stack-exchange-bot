export const STACK_API = 'https://api.stackexchange.com/2.2';

export const FOOTER = `_Source_: [Stack Exchange API v.2.2](${STACK_API}).`;

export const COMMAND = {
  BADGES: 'badges',
  FETCH_TOP_20: 'top20',
  GET_USERS: 'get_users',
  HELP: 'help',
  POST_USER: 'post_user',
  QUIZ: 'quiz',
  TEST: 'test',
};

const commandsWithDescriptions: [string, string][] = [
  [COMMAND.BADGES, 'All badges that you can collect on Stack Overflow'],
  [COMMAND.FETCH_TOP_20, 'Find who the best 20 answerers are'],
  [COMMAND.GET_USERS, 'Get all users from a DynamoDB table'],
  [COMMAND.HELP, 'Show how to use this bot'],
  [COMMAND.POST_USER, 'Insert a new user in a DynamoDB table'],
  [COMMAND.QUIZ, 'Quiz (to test the Telegram reply keyboard)'],
  [COMMAND.TEST, 'Command used to quickly prototype new things'],
];

export const commandDescriptionMap = new Map<string, string>(
  commandsWithDescriptions
);
