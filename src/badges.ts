import { Response } from 'claudia-api-builder';
import got from 'got';

import { FOOTER, STACK_API } from './constants';

const makeBadge = (item: any) => {
  const { award_count, link, name } = item;

  return `- [${name}](${link}) (awarded ${award_count} times)`;
};

export const makeReply = (response: Response) => {
  const body = JSON.parse(response.body);
  const badges = body.items.map(makeBadge);

  return {
    parse_mode: 'Markdown',
    text: badges
      .join('\n')
      .concat('\n---\n')
      .concat(FOOTER),
  };
};

export const promise = got(`${STACK_API}/badges?&site=stackoverflow`);
