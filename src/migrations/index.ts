import * as migration_20241207_192615_prod_migration from './20241207_192615_prod_migration';
import * as migration_20241207_192707_add_optimised_size from './20241207_192707_add_optimised_size';
import * as migration_20241222_185726_remove_optimised_img_sizes from './20241222_185726_remove_optimised_img_sizes';
import * as migration_20241228_084114_home_page_blocks from './20241228_084114_home_page_blocks';
import * as migration_20241230_123937_header_settings_free_shipping from './20241230_123937_header_settings_free_shipping';

export const migrations = [
  {
    up: migration_20241207_192615_prod_migration.up,
    down: migration_20241207_192615_prod_migration.down,
    name: '20241207_192615_prod_migration',
  },
  {
    up: migration_20241207_192707_add_optimised_size.up,
    down: migration_20241207_192707_add_optimised_size.down,
    name: '20241207_192707_add_optimised_size',
  },
  {
    up: migration_20241222_185726_remove_optimised_img_sizes.up,
    down: migration_20241222_185726_remove_optimised_img_sizes.down,
    name: '20241222_185726_remove_optimised_img_sizes',
  },
  {
    up: migration_20241228_084114_home_page_blocks.up,
    down: migration_20241228_084114_home_page_blocks.down,
    name: '20241228_084114_home_page_blocks',
  },
  {
    up: migration_20241230_123937_header_settings_free_shipping.up,
    down: migration_20241230_123937_header_settings_free_shipping.down,
    name: '20241230_123937_header_settings_free_shipping'
  },
];
