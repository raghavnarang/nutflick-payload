import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "home_page_options_blocks_brand_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_blocks_brand_features" ADD CONSTRAINT "home_page_options_blocks_brand_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_brand_features_order_idx" ON "home_page_options_blocks_brand_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_brand_features_parent_id_idx" ON "home_page_options_blocks_brand_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_brand_features_path_idx" ON "home_page_options_blocks_brand_features" USING btree ("_path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "home_page_options_blocks_brand_features" CASCADE;`)
}
