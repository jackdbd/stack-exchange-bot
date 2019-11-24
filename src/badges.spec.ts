import cheerio from 'cheerio';
import showdown from 'showdown';

import { makeReply } from './badges';

describe('badges', () => {
  const converter = new showdown.Converter();

  const apiResponse = {
    items: [
      {
        badge_type: 'tag_based',
        award_count: 35,
        rank: 'bronze',
        badge_id: 263,
        link: 'https://stackoverflow.com/badges/263/cryptography',
        name: 'cryptography',
      },
      {
        badge_type: 'tag_based',
        award_count: 63,
        rank: 'bronze',
        badge_id: 264,
        link: 'https://stackoverflow.com/badges/264/reference',
        name: 'reference',
      },
    ],
  };

  const response = {
    body: JSON.stringify(apiResponse),
  };

  it('contains the substring `awarded` for each badge', () => {
    const reply = makeReply(response);
    // showdown outputs the incorrect html here. It outputs only 1 <li>, not 2.
    const html = converter.makeHtml(reply.text);
    const $ = cheerio.load(html);

    $('li').each((i, elem) => {
      expect($(elem).text()).toEqual(expect.stringContaining('awarded'));
    });
  });
});
