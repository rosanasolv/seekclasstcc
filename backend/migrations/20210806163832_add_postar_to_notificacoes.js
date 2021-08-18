
exports.up = function(knex, Promise) {
  knex.schema.table('notificacoes', function(table){
    table.boolean('postar').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  knex.schema.table('notificacoes', function(table){
      table.dropColumn('postar')
  })
};
