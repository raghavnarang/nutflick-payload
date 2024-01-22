import NextAuth from "next-auth";
import VercelAdapter from "./adapters/vercel";
import { sendVerificationRequestMail } from "@/lib/email";

export const { handlers, auth, signIn } = NextAuth({
  adapter: VercelAdapter(),
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isAdmin = nextUrl.pathname.startsWith("/admin");
      const isAdminUser =
        isLoggedIn && auth?.user?.email === process.env.ADMIN_EMAIL;

      return (isAdmin && isAdminUser) || isLoggedIn;
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request'
  },
  providers: [
    {
      id: "zoho",
      // @ts-ignore
      type: "email",
      name: "Email",
      sendVerificationRequest: async ({
        identifier: to,
        url,
      }: {
        identifier: string;
        url: string;
      }) => {
        const result = await sendVerificationRequestMail(to, url);

        if (!result.ok) {
          const resultData = await result.json();
          throw new Error(
            `${resultData.error.message} - ${resultData.error.code}`
          );
        }
      },
    },
  ],
});
