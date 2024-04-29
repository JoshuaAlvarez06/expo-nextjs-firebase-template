import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables

import { env } from "~/env";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: env.FB_ADMIN_PRIVATE_KEY,
      clientEmail: env.FB_ADMIN_CLIENT_EMAIL,
      projectId: env.FB_ADMIN_PROJECT_ID,
    }),
  });
}

export { firebaseAdmin };
