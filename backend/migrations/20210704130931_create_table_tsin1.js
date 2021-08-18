
exports.up = function(knex) {
    return knex.schema.createTable('tsin1', table =>{//criação da tabela
        table.increments('id').primary()
        table.string('horario').notNull()
        table.string('segunda').notNull()
        table.string('terca').notNull()
        table.string('quarta').notNull()
        table.string('quinta').notNull()
        table.string('sexta').notNull()
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tsin1')
};