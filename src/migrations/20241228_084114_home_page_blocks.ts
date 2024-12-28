import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "home_page_options_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"title_left" varchar NOT NULL,
  	"title_right" varchar NOT NULL,
  	"tag" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_options_blocks_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_page_options_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_blocks_hero" ADD CONSTRAINT "home_page_options_blocks_hero_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_blocks_hero" ADD CONSTRAINT "home_page_options_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_blocks_products" ADD CONSTRAINT "home_page_options_blocks_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_rels" ADD CONSTRAINT "home_page_options_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_page_options_rels" ADD CONSTRAINT "home_page_options_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_hero_order_idx" ON "home_page_options_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_hero_parent_id_idx" ON "home_page_options_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_hero_path_idx" ON "home_page_options_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_hero_product_idx" ON "home_page_options_blocks_hero" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_products_order_idx" ON "home_page_options_blocks_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_products_parent_id_idx" ON "home_page_options_blocks_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_options_blocks_products_path_idx" ON "home_page_options_blocks_products" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_page_options_rels_order_idx" ON "home_page_options_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "home_page_options_rels_parent_idx" ON "home_page_options_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "home_page_options_rels_path_idx" ON "home_page_options_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "home_page_options_rels_products_id_idx" ON "home_page_options_rels" USING btree ("products_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "home_page_options_blocks_hero" CASCADE;
  DROP TABLE "home_page_options_blocks_products" CASCADE;
  DROP TABLE "home_page_options_rels" CASCADE;`)
}
