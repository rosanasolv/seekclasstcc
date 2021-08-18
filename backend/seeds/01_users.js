
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usuarios').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuarios').insert([
        {nome: 'Neto Nascimento', email: 'netolima1992@gmail.com', admin: true, tipoUsuario: 1, representante: true}
        
      ]);
    });
};
