
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('tasks', table => {
            table.increments('id').unsigned().primary();
            table.integer('user_id').notNullable().unsigned().index().references('id').inTable('users');
            table.string('description').collate('utf8mb4_bin').notNullable();
            table.date('due_at').notNullable();
            table.date('done_at');
            table.boolean('is_done').defaultTo(false).notNullable();
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
