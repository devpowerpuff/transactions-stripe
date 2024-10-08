"use server";

import { dbClient } from "../../../db/dbClient";
import logger from "@/logger";
import { policies } from "@/db/schema/policies";

import { PolicyProps } from "@/utils/types/interfaces";

export async function createPolicy({
  status,
  quoteId,
  underwritingDetailsId,
  chargeId,
  amount,
  currency,
}: PolicyProps) {
  try {
    const [policy] = await dbClient
      .insert(policies)
      .values({
        status,
        quoteId,
        underwritingDetailsId,
        chargeId,
        amount,
        currency,
      })
      .returning();

    logger.info({
      event: "POLICY:CREATED",
      policyId: policy.id,
      status,
      chargeId,
      amount,
      currency,
    });

    return policy;
  } catch (error) {
    logger.error({
      event: "POLICY:CREATED:ERROR",
      message: (error as Error).message,
    });
    throw error;
  }
}
