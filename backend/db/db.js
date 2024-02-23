import pkg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import getOutstandingMigrations from './migrations.js';

dotenv.config();
const { Pool } = pkg;

const poolConfig = { connectionString: process.env.DATABASE_CONNECTION_STRING };

const pgPool = new Pool(poolConfig);

const query = async (text, params) => new Promise((resolve, reject) => {
  pgPool.query(text, params)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
})

/* Run a SQL query given a filepath */
const execute = async(path, params = {}) => {
  const queryVariables = [];
  const queryParam = (qv) => {
    const variable = qv.slice(2, -1);
    const i = queryVariables.indexOf(variable);
    if (i >= 0) {
      return `$${i + 1}`;
    }
    queryVariables.push(variable);
    return `$${queryVariables.length}`;
  }

  let sql = fs.readFileSync(path).toString();
  sql = sql.replace(/\$\{[^{}]+\}/g, queryParam);
  const values = queryVariables ? queryVariables.map(p => params[p]) : [];
  return query(sql, values);
}

/**
 * @description Select all migrations, filter out executed migrations, and executes leftover migrations.
 * Runs a transaction, which will run all leftover migrations, or fail completely.
 */

const migrate = async () => {
  let existingMigrations = [];
  try {
    const result = await execute('backend/sql/migrationQueries/get_all.sql');
    existingMigrations = result.rows.map((r) => r.file_name);
  } catch {
    console.log('First migration');
  }

  const outstandingMigrations = await getOutstandingMigrations(existingMigrations);

  await pgPool.connect(async (error, client, release) => {
    if (error) {
      return console.log('Error connected to db: ', error);
    };

    try {
      await client.query('BEGIN');
      // eslint-disable-next-line no-restricted-syntax
      for (const migration of outstandingMigrations) {
        console.log('Executing outstanding migration: ', `backend/sql/migrations/${migration.file}`);
        await execute(`backend/sql/migrations/${migration.file}`);
        await execute('backend/sql/migrationQueries/put.sql', { file_name: migration.file });
      }
      await client.query('COMMIT');
    } catch (err) {
      // Log some kind of error so client knows what happened on executing migrations.
      await client.query('ROLLBACK');
    } finally {
      release((err) => {
        console.log('Client has disconnected');
        if (err) {
          console.log('ERR: ', err.stack);
        }
      });
    }
  });
};

export {
  execute,
  migrate
}