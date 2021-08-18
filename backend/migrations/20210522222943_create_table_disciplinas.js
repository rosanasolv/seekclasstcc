
exports.up = function(knex) {
    return knex.schema.createTable('disciplinas', table =>{//criação da tabela
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('professor').unsigned()
        table.integer('turma').unsigned()
        table.string('turno')
        table.string('link')

        table.foreign('professor')
            .references('id')
            .inTable('usuarios')

        table.foreign('turma')
            .references('id')
            .inTable('turmas')
    })
};

exports.down = function(knex) {//delete da tabela
    return knex.schema.dropTable('disciplinas')
};
