exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, name: 'John Doe', email: 'doe.john@test.com' }
            ]);
        });
};
