exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 9998,
        name: 'LimboLineLucy'
      }),
      knex('folders').insert({
        id: 9999,
        name: 'FunBunDanGrun'
      })
    ]);
  });
};
