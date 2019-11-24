declare module 'claudia-api-builder' {
  interface KeyStringValueString {
    [key: string]: string;
  }

  interface Context {
    accountId: any;
    apiKey: string;
    authorizerPrincipalId: any;
    caller: any;
    cognitoAuthenticationProvider: any;
    cognitoAuthenticationType: any;
    cognitoIdentityId: any;
    cognitoIdentityPoolId: any;
    method: string;
    path: string;
    sourceIp: string;
    stage: string;
    user: any;
    userAgent: string;
    userArn: any;
  }

  interface LambdaContext {
    awsRequestId: string;
    callbackWaitsForEmptyEventLoop: boolean;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: number;
    logGroupName: string;
    logStreamName: string;
  }

  interface Request {
    body: string | Buffer | JSON;
    context: Context;
    env: KeyStringValueString;
    headers: KeyStringValueString;
    lambdaContext: LambdaContext;
    normalizedHeaders: KeyStringValueString;
    pathParams: any;
    post: KeyStringValueString;
    queryString: KeyStringValueString;
    rawBody: string;
  }

  interface Response {
    body: string;
    header?: Headers;
    httpCode?: number;
  }

  export interface LambdaProperties {
    alias: string;
    apiCacheReused: boolean;
    apiId: string;
    apiUrl: string;
    name: string;
    region: string;
  }

  interface Utils {
    apiGatewayPromise: any;
    aws: any; // TODO; types of AWS SDK
    Promise: any;
  }

  class ApiResponse {
    public constructor(
      response: Response,
      headers: KeyStringValueString,
      code?: any
    );
  }

  export type PostDeployStepCallback = (
    commandLineOptions: KeyStringValueString,
    lambdaProperties: LambdaProperties,
    utils: Utils
  ) => Promise<string>;

  type Logger = (message?: any, ...optionalParams: any[]) => void;
  type Prompter = (question: string) => Promise<void>;

  interface ApiBuilderOptions {
    logger?: Logger;
    mergeVars?: boolean;
    prompter?: Prompter;
    requestFormat?: string;
  }

  interface ApiGatewayResponseConfiguration {
    responseParameters?: KeyStringValueString;
    responseTemplates?: KeyStringValueString;
    statusCode?: number;
  }

  interface GetResponse {
    success: number | { contentType: string };
  }

  export default class ApiBuilder {
    public constructor(options?: ApiBuilderOptions);
    public static ApiResponse: typeof ApiResponse;
    addPostDeployConfig(
      stageVarName: string,
      prompt: string,
      configOption: string
    ): void;
    addPostDeployStep(stepName: string, callback: PostDeployStepCallback): void;
    get(uri: string, callback: Function, response?: GetResponse): void;
    post(uri: string, callback: Function): void;
    post(uri: string, callback: Function, response: { success: number }): void;
    put(uri: string, callback: Function): void;
    setGatewayResponse(responseType: string, responseConfig: any): void;
  }
}
