import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "home_page_options_blocks_brand_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"image_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_blocks_brand_features_features" ADD CONSTRAINT "home_page_options_blocks_brand_features_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_blocks_brand_features_features" ADD CONSTRAINT "home_page_options_blocks_brand_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_options_blocks_brand_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_brand_features_features_order_idx" ON "home_page_options_blocks_brand_features_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_brand_features_features_parent_id_idx" ON "home_page_options_blocks_brand_features_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_brand_features_features_image_idx" ON "home_page_options_blocks_brand_features_features" USING btree ("image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "home_page_options_blocks_brand_features_features" CASCADE;`)
}
