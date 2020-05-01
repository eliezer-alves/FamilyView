exports.up = function(knex) {
    return knex.schema.createTable('profile_image', function(table){
      table.increments();
      table.string('name');
      table.integer('size');
      table.string('key');
      table.string('url');
      table.string('person_id');
      table.foreign('person_id').references('id_person').inTable('persons');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('profile_image');
  };
  