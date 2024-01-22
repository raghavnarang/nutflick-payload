"use server";

import { z } from "zod";
import { signIn } from ".";
import { Status } from "@/shared/types/status";
import { RedirectType, redirect } from "next/navigation";

const baseUrl =
  process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

const emailSchema = z.string().min(1).email();
const currentSiteUrlSchema = z.union([
  z.string().url().startsWith(baseUrl).nullish(),
  z.literal(""),
]);

export const login = async (prevState: any, data: FormData) => {
  const email = data.get("email") as string;
  const callbackUrl = data.get("callbackUrl") as string;
  if (!emailSchema.safeParse(email).success) {
    return { message: "Email is invalid", status: Status.error };
  }

  if (!currentSiteUrlSchema.safeParse(callbackUrl).success) {
    return {
      message: "Something went wrong. Please try again",
      status: Status.error,
    };
  }

  let url: string;
  try {
    url = await signIn("zoho", {
      email,
      redirect: false,
      redirectTo: callbackUrl,
    });
  } catch (e) {
    return {
      message: "Something went wrong. Please try again",
      status: Status.error,
    };
  }

  redirect(url);
};
