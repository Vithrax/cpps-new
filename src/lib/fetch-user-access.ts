import { Session } from "next-auth";
import { getAuthSession } from "./auth";
import { db } from "./db";

export async function getUserAccessData(session?: Session): Promise<number[]> {
  let userData;

  if (session) {
    userData = session.user;
  } else {
    const session = await getAuthSession();
    if (!session?.user) return [];

    userData = session.user;
  }

  // if you are customer, you have access only to your company cases/orders/proposals
  if (userData.permission === "client") {
    const data = await db.userAccess.findMany({
      where: {
        userId: userData.id,
      },
      select: {
        companyId: true,
      },
    });

    const parsedData = data.map(({ companyId }) => companyId);
    return parsedData;
  }

  // if you are anything else, you have access to everything
  const data = await db.company.findMany({
    select: {
      id: true,
    },
  });

  const parsedData = data.map(({ id }) => id);
  return parsedData;
}
