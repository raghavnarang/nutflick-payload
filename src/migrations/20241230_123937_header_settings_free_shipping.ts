import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "header_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"message_strip" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "shipping_options" ADD COLUMN "free_shipping_settings_enable" boolean DEFAULT false;
  ALTER TABLE "shipping_options" ADD COLUMN "free_shipping_settings_subtotal" numeric DEFAULT 0 NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "header_settings" CASCADE;
  ALTER TABLE "shipping_options" DROP COLUMN IF EXISTS "free_shipping_settings_enable";
  ALTER TABLE "shipping_options" DROP COLUMN IF EXISTS "free_shipping_settings_subtotal";`)
}
