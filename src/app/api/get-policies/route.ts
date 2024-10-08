import { NextRequest, NextResponse } from "next/server";

import { dbClient } from "@/db/dbClient";
import { policies } from "@/db/schema/policies";
import logger from "@/logger";

export async function GET(req: NextRequest) {
  try {
    const result = await dbClient.select().from(policies);

    if (!result)
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    logger.error({
      event: "QUOTE:FETCH:ERROR",
      message: (error as Error).message,
    });

    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
