
exports.up = function(knex) {
    return knex.schema.createTable('avisos', table =>{//criação da tabela
        table.increments('id').primary()
        table.string('assunto').notNull()
        table.string('descricao', 1000).notNull()
        table.integer('remetente').unsigned()
            
        table.foreign('remetente')
            .references('id')
            .inTable('usuarios')
    })
};

exports.down = function(knex) {//delete da tabela
    return knex.schema.dropTable('avisos')
};
