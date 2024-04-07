"use server";

import { createClient } from "@/lib/supabase/actions";
import { Status } from "@/shared/types/status";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const UrlPathnameSchema = z
  .string()
  .refine((pathname) => {
    // Customize the logic to match your requirements
    const pathnameRegex = /^(\/([a-zA-Z0-9\_\-\/]+)?)+$/;
    return pathnameRegex.test(pathname);
  })
  .optional();

export const login = async (prevState: any, formData: FormData) => {
  const validation = zfd.formData({
    email: zfd.text(z.string().email()),
    "h-captcha-response": zfd.text(),
    ref: zfd.text(UrlPathnameSchema),
  });

  const result = validation.safeParse(formData);
  if (!result.success) {
    return {
      status: Status.error,
      message: "Something went wrong. Please try again later",
    };
  }

  const { email, "h-captcha-response": captchaToken, ref } = result.data;

  const client = createClient(cookies());
  const { error } = await client.auth.signInWithOtp({
    email,
    options: { captchaToken },
  });

  if (error) {
    return {
      status: Status.error,
      message: "Something went wrong. Please try again later",
    };
  }

  redirect(`/verify-request?email=${email}${ref ? `&ref=${ref}` : ""}`);
};

export const verifyOtp = async (prevState: any, formData: FormData) => {
  const validation = zfd.formData({
    email: zfd.text(z.string().email()),
    otp: zfd.text(z.string().length(6)),
    ref: zfd.text(UrlPathnameSchema),
  });

  const result = validation.safeParse(formData);
  if (!result.success) {
    console.log(result.error);
    return {
      status: Status.error,
      message: "Something went wrong. Please try again later",
    };
  }

  const { email, otp: token, ref } = result.data;

  const client = createClient(cookies());
  const {
    error,
    data: { user },
  } = await client.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    console.log(error);
    return {
      status: Status.error,
      message: "Something went wrong. Please try again later",
    };
  }

  const isAdmin = user?.email && process.env.ADMIN_EMAIL! === user?.email;
  const redirectRefUrl = !ref?.includes("/admin") || isAdmin ? ref : undefined;
  const redirectUrl = redirectRefUrl || (isAdmin ? "/admin" : "/account");

  redirect(redirectUrl);
};
