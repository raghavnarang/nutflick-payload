import * as migration_20241207_192615_prod_migration from './20241207_192615_prod_migration';
import * as migration_20241207_192707_add_optimised_size from './20241207_192707_add_optimised_size';

export const migrations = [
  {
    up: migration_20241207_192615_prod_migration.up,
    down: migration_20241207_192615_prod_migration.down,
    name: '20241207_192615_prod_migration',
  },
  {
    up: migration_20241207_192707_add_optimised_size.up,
    down: migration_20241207_192707_add_optimised_size.down,
    name: '20241207_192707_add_optimised_size'
  },
];
