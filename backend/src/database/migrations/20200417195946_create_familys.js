exports.up = function(knex) {
    return knex.schema.createTable('familys', function(table){
      table.increments();
      table.string('name_family').notNullable();
      table.string('about', 10000);
      table.string('user_id');
      table.foreign('user_id').references('id').inTable('users');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('familys');
  };
  