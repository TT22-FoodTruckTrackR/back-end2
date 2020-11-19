
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username:"bob",
          password:"bob",
          email:"bob@bobsburgers.com",
          isOperator:1,
          location:1,
        },
        {
          username:"linda",
          password:"linda",
          email:"linda@bobsburgers.com",
          isOperator:1,
          location:2,
        },
        {
          username:"tina",
          password:"tina",
          email:"tina@bobsburgers.com",
          isOperator:0,
          location:1,
        },
        {
          username:"louise",
          password:"louise",
          email:"louise@bobsburgers.com",
          isOperator:0,
          location:2,
        },
        {
          username:"gene",
          password:"gene",
          email:"gene@bobsburgers.com",
          isOperator:0,
          location:1,
        },
        {
          username:"jimmy",
          password:"jimmy",
          email:"jimmy@pestopizzeria.com",
          isOperator:1,
          location:2,
        },
        {
          username:"tommy",
          password:"tommy",
          email:"tommy@email.com",
          isOperator:1,
          location:3,
        },
      ]);
    });
};
