
exports.up = function (knex) {
	return knex.schema.createTable('incidents', function (table) {
		//CRIA AUTOMATICAMENTE UMA CHAVE PRIMARIA AUTO INCREMENTAL NA TABELA
		table.increments();

		table.string('title').notNullable();
		table.string('description').notNullable();
		table.decimal('value').notNullable();

		table.string('ong_id').notNullable();

		//FAZ REFERENCIA AO CAMPO DE OUTRA TABELA/CRIA CHAVE ESTRANGEIRA
		table.foreign('ong_id').references('id').inTable('ongs');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('incidents');
};