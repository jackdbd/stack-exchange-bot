import { COMMAND, commandDescriptionMap, FOOTER } from './constants';

const makeCommandHelp = (command: string) => {
  return `- *${command}* - ${commandDescriptionMap.get(command)}`;
};

export const makeReply = () => {
  const md = `
    Here is the list of commands I understand:\n\n${Object.values(COMMAND)
      .map(makeCommandHelp)
      .join('\n')
      .concat('\n---\n')
      .concat(FOOTER)}.
    `;

  return {
    parse_mode: 'Markdown',
    text: md,
  };
};
