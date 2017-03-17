exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 1,
        shortURL: "abcde",
        longURL: "http://google.com",
        visitCount: 1,
        created_at: "1489710492580",
        folder_id: 1
      }),
      knex('urls').insert({
        id: 2,
        shortURL: "fghki",
        longURL: "http://reddit.com",
        visitCount: 2,
        created_at: "1489710492580",
        folder_id: 1

      }),
      knex('urls').insert({
        id: 3,
        shortURL: "querty",
        longURL: "http://wham.com/",
        visitCount: 1,
        created_at: "1489710492580",
        folder_id: 2
      })
    ]);
  });
};
