import { Response } from 'claudia-api-builder';
import got from 'got';

import { STACK_API } from './constants';

export const makeReply = (response: Response) => {
  const body = JSON.parse(response.body);
  const item = body.items.slice(0, 1)[0];

  const { post_count, score } = item;

  const md = `
  *TESTO*

  *Characters*
  Post count ${post_count}

  Score count ${score}

  ---

  *Summary*

  ---
  footer
  `;

  return {
    parse_mode: 'Markdown',
    text: md,
  };
};

export const promise = got(
  `${STACK_API}/tags/python/top-answerers/all_time?site=stackoverflow`
);
