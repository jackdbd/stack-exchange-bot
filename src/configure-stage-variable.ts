import ApiBuilder, { Request } from 'claudia-api-builder';

// Stage variable on AWS API Gateway
export const stageVarName = 'customStageVar';
export const prompt = `Enter the value for ${stageVarName}:`;

// Command line option passed to the claudia CLI
export const configOption = 'custom-stage-var';

// postDeployCallback accepts these arguments: options, lambdaProperties, utils
export const postDeployCallback = () => {
  return new Promise<string>((resolve: any) => resolve(`Resolved`));
};

const handler = (request: Request) => {
  const style = 'outline: 3px dashed slategray;background-color: papayawhip';
  const isStageVarConfigured = request.env.customStageVar ? true : false;
  const div = isStageVarConfigured
    ? `<div style="${style}">The stage variable ${stageVarName} is ${request.env.customStageVar}</div>`
    : `<div style="${style}">${stageVarName} is not configured. Configure it: claudia update --${configOption} YOUR-VALUE-HERE</div>`;

  return `
    <html>
      <body>
        <h1>Hello from Claudia.js</h1>
        <ul>
          <li><a href="https://www.claudiajs.com/">Claudia.js</a></li>
          <li><a href="https://www.claudiajs.com/claudia-api-builder.html">Claudia.js API Builder</a></li>
          <li><a href="https://www.claudiajs.com/claudia-bot-builder.html">Claudia.js Bot Builder</a></li>
          <li><a href="redirect">Redirect to repo on GitHub</a></li>
        </ul>
        ${div}
      </body>
    </html>
    `;
};

const handlerRedirect = () => {
  return 'https://github.com/claudiajs/claudia';
};

const endpoint = 'demo-page';

export const setupDemoEndpoint = (api: ApiBuilder) => {
  api.get(`/${endpoint}`, handler, { success: { contentType: 'text/html' } });

  // because the success code is 3xx, the content will be used as the redirect location
  api.get('/redirect', handlerRedirect, { success: 302 });

  api.addPostDeployConfig(stageVarName, prompt, configOption);
  api.addPostDeployStep(endpoint, postDeployCallback);
  return api;
};
