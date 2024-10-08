ALTER TABLE "policies" ADD COLUMN "charge_id" varchar(255);--> statement-breakpoint
ALTER TABLE "policies" ADD COLUMN "amount" integer;--> statement-breakpoint
ALTER TABLE "policies" ADD COLUMN "currency" varchar(10);--> statement-breakpoint
ALTER TABLE "policies" ADD COLUMN "receipt_url" text;--> statement-breakpoint
ALTER TABLE "policies" ADD COLUMN "balance_transaction_id" varchar(255);