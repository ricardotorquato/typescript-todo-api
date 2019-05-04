
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id').unsigned().primary();
            table.string('name', 100);
            table.string('email', 100);
            table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
            table.charset('utf8mb4');
            table.collate('utf8mb4_bin');
            table.engine('InnoDB');
        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('users');
};
