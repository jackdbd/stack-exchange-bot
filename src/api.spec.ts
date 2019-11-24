import { makeErrorReply, messageHandler } from './api';

describe('messageHandler', () => {
  const addInlineKeyboardMock = jest.fn();
  const addReplyKeyboardMock = jest.fn();
  const disableNotificationMock = jest.fn();
  const forceReplyMock = jest.fn();
  const getMock = jest.fn();
  const replyKeyboardHideMock = jest.fn();

  const telegramMessageWithNoText = {
    addInlineKeyboard: addInlineKeyboardMock,
    addReplyKeyboard: addReplyKeyboardMock,
    disableNotification: disableNotificationMock,
    forceReply: forceReplyMock,
    get: getMock,
    replyKeyboardHide: replyKeyboardHideMock,
  };

  it('replies with a help message when the user types `help`', () => {
    const telegramMessage = {
      ...telegramMessageWithNoText,
      text: 'help',
    };
    expect(messageHandler(telegramMessage)).toEqual(
      expect.objectContaining({
        parse_mode: 'Markdown',
        text: expect.stringContaining('list of commands'),
      })
    );
  });

  it('replies saying that it does not understand when the user types an unsupported command', () => {
    const telegramMessage = {
      ...telegramMessageWithNoText,
      text: 'some unsupported command',
    };
    expect(messageHandler(telegramMessage)).toEqual(
      expect.stringContaining("I don't understand")
    );
  });

  it('replies with 3 responses when the user types `quiz`', () => {
    const telegramMessage = {
      ...telegramMessageWithNoText,
      text: 'quiz',
    };
    const responses = messageHandler(telegramMessage);
    expect(responses).toHaveLength(3);
  });
});

describe('makeErrorReply', () => {
  it('replies with the expected text', () => {
    const err = new Error('This is a test error');
    expect(makeErrorReply(err).text).toEqual(
      expect.stringContaining('Sorry, there was an error with your request')
    );
  });
});
