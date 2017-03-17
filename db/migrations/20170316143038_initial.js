exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('folders', function(table) {
            table.increments('id').primary();
            table.string('name').unique();
            table.timestamps();
        }),

        knex.schema.createTable('urls', function(table){
          table.increments('id').primary();
          table.string('shortURL');
          table.string('longURL');
          table.integer('visitCount');
          table.string('created_at');
          table.integer('folder_id')
               .references('id')
               .inTable('folders');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('urls'),
        knex.schema.dropTable('folders')
    ])
};
