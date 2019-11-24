import ApiBuilder from 'claudia-api-builder';

import {
  configOption,
  postDeployCallback,
  prompt,
  setupDemoEndpoint,
  stageVarName,
} from './configure-stage-variable';

describe('configure-stage-variable', () => {
  const apiInitial = new ApiBuilder();
  // I tried addPostDeployConfig as jest.Mock<any, [string, string, string]> but
  // typescript didn't like it ¯\_(ツ)_/¯.
  apiInitial.addPostDeployConfig = jest.fn();
  apiInitial.addPostDeployStep = jest.fn();

  beforeEach(() => {
    (apiInitial.addPostDeployConfig as any).mockClear();
    (apiInitial.addPostDeployStep as any).mockClear();
  });

  it('setupDemoEndpoint mutates the ApiBuilder object passed in', () => {
    const apiFinal = setupDemoEndpoint(apiInitial);
    expect(apiFinal).toBeInstanceOf(ApiBuilder);
    expect(apiFinal).toBe(apiInitial);
  });

  it('addPostDeployConfig is called once, with the expected arguments', () => {
    setupDemoEndpoint(apiInitial);
    expect(apiInitial.addPostDeployConfig).toHaveBeenCalledTimes(1);
    expect(apiInitial.addPostDeployConfig).toHaveBeenCalledWith(
      stageVarName,
      prompt,
      configOption
    );
  });

  it('addPostDeployStep is called once, with the expected arguments', () => {
    setupDemoEndpoint(apiInitial);
    expect(apiInitial.addPostDeployStep).toHaveBeenCalledTimes(1);
    expect(apiInitial.addPostDeployStep).toHaveBeenCalledWith(
      'demo-page',
      postDeployCallback
    );
  });
});
