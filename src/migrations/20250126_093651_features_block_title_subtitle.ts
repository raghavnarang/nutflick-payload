import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "home_page_options_blocks_brand_features" ADD COLUMN "title" varchar;
  ALTER TABLE "home_page_options_blocks_brand_features" ADD COLUMN "subtitle" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "home_page_options_blocks_brand_features" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "home_page_options_blocks_brand_features" DROP COLUMN IF EXISTS "subtitle";`)
}
