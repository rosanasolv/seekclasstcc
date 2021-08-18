
exports.up = function(knex) {
    return knex.schema.createTable('notificacoes', table =>{//criação da tabela
        table.increments('id').primary()
        table.string('assunto').notNull()
        table.string('conteudo').notNull()//colocar mais limites de palavras
        table.integer('remetente').unsigned()
        table.integer('turmas').unsigned().defaultTo(0)
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        //table.boolean('postar').defaultTo(false)
            
        table.foreign('turmas')
            .references('id')
            .inTable('turmas')

        table.foreign('remetente')
            .references('id')
            .inTable('usuarios')
    })
};

exports.down = function(knex) {//delete da tabela
    return knex.schema.dropTable('notificacoes')
};
