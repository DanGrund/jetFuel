exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        name: 'LimboLineLucy'
      }),
      knex('folders').insert({
        id: 2,
        name: 'FunBunDanGrun'
      })
    ]);
  });
};
