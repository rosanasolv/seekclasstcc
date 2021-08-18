
exports.up = function(knex) {
    return knex.schema.createTable('turmas', table =>{//criação da tabela
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('turno')
        table.string('sala')
        table.integer('representante').unsigned()
            
        table.foreign('representante')
            .references('id')
            .inTable('usuarios')
    })
};

exports.down = function(knex) {//delete da tabela
    return knex.schema.dropTable('turmas')
};
