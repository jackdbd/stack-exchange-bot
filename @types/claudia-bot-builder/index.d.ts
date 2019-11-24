/// <reference types="../claudia-api-builder"/>

declare module 'claudia-bot-builder' {
  import ApiBuilder, { Request } from 'claudia-api-builder';

  type LogError = (error: any) => void;

  interface Options {
    platforms: string[];
  }

  interface Template {
    disable_notification?: boolean;
    reply_markup?: string;
  }

  type KeyboardArray = string[][];

  export class TelegramMessage {
    text: string;
    addInlineKeyboard(keyboardArray: KeyboardArray): this;
    addReplyKeyboard(
      keyboardArray: KeyboardArray,
      resizeKeyboard: boolean,
      oneTimeKeyboard: boolean
    ): this;
    disableNotification(): void;
    forceReply(selective: boolean): this;
    get(): Template;
    replyKeyboardHide(selective: boolean): this;
  }

  export class ViberMessage {
    addKeyboardButton(
      text: string,
      buttonValue: string,
      columnSize?: number,
      rowSize?: number,
      buttonObj?: any
    ): this;
    addReplyKeyboard(isDefaultHeight?: boolean, backgroundColor?: string): this;
    get(): Template;
  }

  type MessageHandler = (
    message: TelegramMessage,
    originalApiBuilderRequest: Request
  ) => void;

  type MessageHandlerPromise = (
    message: TelegramMessage,
    originalApiBuilderRequest: Request
  ) => Promise<void>;

  function botBuilder(
    messageHandler: MessageHandler,
    options: Options,
    optionalLogError?: LogError
  ): ApiBuilder;

  // TODO: don't know how to add a type definition.
  botBuilder.telegramTemplate = {} as any;
  botBuilder.viberTemplate = {} as any;

  export default botBuilder;

  function telegramSetup(
    api: ApiBuilder,
    messageHandlerPromise: any,
    logError: LogError,
    optionalParser?: any,
    optionalResponder?: any
  ): void;
}
