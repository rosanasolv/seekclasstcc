
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usuarios').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuarios').insert([
        {nome: 'Rosana Soares', email: 'rosana.soares@estudante.ifb.edu.br', admin: true, tipoUsuario: 1, representante: true}
        
      ]);
    });
};
