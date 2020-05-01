exports.up = function(knex) {
    return knex.schema.createTable('person', function(table){
      table.increments();
      table.string('name_person').notNullable();
      table.string('nickname');
      table.string('genre', 1).notNullable();
      table.string('birth_date', 10);
      table.string('death_date', 10);
      table.integer('father_id');
      table.foreign('father_id').references('id').inTable('person');
      table.integer('mother_id');
      table.foreign('mother_id').references('id').inTable('person');
      table.integer('family_id');
      table.foreign('family_id').references('id').inTable('family');
      table.string('city_person').notNullable();
      table.string('uf_person', 2).notNullable();
      table.string('user_id_person');
      table.foreign('user_id_person').references('id').inTable('users');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('person');
  };
  