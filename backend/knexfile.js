// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

/*Comandos:
  init [opções] Crie um novo arquivo de knex.
  migrate: make [options] <name> Crie um arquivo de migração nomeado.
  migrate: latest [opções] Execute todas as migrações que ainda não foram executadas.
  migrate: up [<name>] Execute a próxima migração ou a migração especificada que ainda não foi executada.
  migrate: rollback [opções] Retrocede o último lote de migrações realizadas.
  migrate: down [<name>] Desfaz a última ou a migração especificada que já foi executada.
  migrate: currentVersion Exibir a versão atual da migração.
  migrate: list | migrate: status Listar todos os arquivos de migração com status.
  seed: make [opções] <name> Crie um arquivo de semente nomeado.
  seed: run [opções] Execute arquivos de semente.*/