CREATE TABLE IF NOT EXISTS "policies" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "underwritingDetailsId" uuid NOT NULL,
    "quote_id" uuid NOT NULL,
    "policy_number" text NOT NULL,
    "status" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now()
);