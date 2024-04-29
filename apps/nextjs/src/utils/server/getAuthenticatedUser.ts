import { cookies, headers } from "next/headers";

import type { User } from "@acme/db";
import { prisma } from "@acme/db";

import { firebaseAdmin } from "~/lib/firebaseAdmin";

export const getAuthenticatedUser = async (): Promise<User | null> => {
  try {
    const authToken =
      cookies().get("token")?.value ??
      headers().get("authorization")?.replace("Bearer ", "");

    const token = authToken
      ? await firebaseAdmin.auth().verifyIdToken(authToken)
      : null;

    let user;
    if (token?.phone_number) {
      const phoneNumber = token.phone_number;
      user = await prisma.user.upsert({
        where: {
          phoneNumber,
        },
        update: {
          authServiceId: token.uid,
        },
        create: {
          phoneNumber,
          authServiceId: token.uid,
        },
      });
    }

    return user ?? null;
  } catch {
    return null;
  }
};
