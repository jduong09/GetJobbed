/* Helper functions for db */
import * as util from 'util';
import * as fs from 'fs';

/**
 * @description Read all files in current directory, filter out files
 * that don't contain SQL and previously ran migrations.
 * Read content of those files.
 * @param {array} migrations 
 */

const getOutstandingMigrations = async (migrations = []) => {
  const files = await util.promisify(fs.readdir)('backend/sql/migrations');
  const sql = await Promise.all(
    files
      .filter((file) => file.split('.')[1] === 'sql' && (!migrations.includes(file)))
      .map(async (file) => ({
        file,
        query: await util.promisify(fs.readFile)(`backend/sql/migrations/${file}`, {
          encoding: 'utf-8',
        }),
      }))
  );
  return sql;
};

export default getOutstandingMigrations;
