exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 123,
        name: 'LimboLineLucy'
      }),
      knex('folders').insert({
        id: 234,
        name: 'FunBunDanGrun'
      })
    ]);
  });
};
