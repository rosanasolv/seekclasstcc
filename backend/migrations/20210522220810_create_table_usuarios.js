
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table =>{//criação da tabela
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        table.string('senha')
        table.boolean('status').defaultTo(false)
        table.boolean('admin').defaultTo(false)
        table.string('contato')
        table.integer('tipoUsuario')
        table.boolean('representante').defaultTo(false)
    })
};

exports.down = function(knex) {//delete da tabela
    return knex.schema.dropTable('usuarios')
};