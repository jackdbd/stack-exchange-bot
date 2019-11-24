import { makeReply } from './users';

describe('users', () => {
  const apiResponse = {
    items: [
      {
        user: {
          reputation: 774821,
          user_id: 100297,
          user_type: 'moderator',
          profile_image:
            'https://www.gravatar.com/avatar/24780fb6df85a943c7aea0402c843737?s=128&d=identicon&r=PG',
          display_name: 'Martijn Pieters',
          link: 'https://stackoverflow.com/users/100297/martijn-pieters',
        },
        post_count: 18875,
        score: 126799,
      },
      {
        user: {
          reputation: 605942,
          user_id: 190597,
          user_type: 'registered',
          accept_rate: 88,
          profile_image:
            'https://www.gravatar.com/avatar/aabc98d5c6482ca0e1405ec97710f30a?s=128&d=identicon&r=PG&f=1',
          display_name: 'unutbu',
          link: 'https://stackoverflow.com/users/190597/unutbu',
        },
        post_count: 6902,
        score: 66309,
      },
    ],
  };

  const response = {
    body: JSON.stringify(apiResponse),
  };

  it('contains the substring `Score count` in the text reply', () => {
    const reply = makeReply(response);
    expect(reply.text).toEqual(expect.stringContaining('Score count'));
  });
});
