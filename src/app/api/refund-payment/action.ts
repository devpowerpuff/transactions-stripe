import { eq } from "drizzle-orm";

import { dbClient } from "../../../db/dbClient";
import logger from "@/logger";
import { policies } from "@/db/schema/policies";

export async function updatePolicyStatus(policyId: string, newStatus: string) {
  try {
    const result = await dbClient
      .update(policies)
      .set({ status: newStatus })
      .where(eq(policies.id, policyId))
      .returning();

    if (result.length === 1) {
      logger.info({
        event: "POLICY:STATUS_UPDATED",
        policyId,
        newStatus,
      });

      return result[0];
    } else throw new Error(`Policy ${policyId} not found`);
  } catch (error) {
    console.error(`Error updating policy ${policyId} status:`, error);
    logger.error({
      event: "POLICY:STATUS_UPDATE_ERROR",
      policyId,
      message: (error as Error).message,
    });

    throw error;
  }
}
