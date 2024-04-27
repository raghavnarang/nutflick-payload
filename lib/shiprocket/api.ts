import { getToken } from "./db";

const srFetch = (
  url: string,
  data?: any,
  method?: "GET" | "POST",
  token?: string
) => {
  const finalMethod = method || (data ? "POST" : "GET");
  return fetch(url, {
    method: finalMethod,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(finalMethod === "POST" && {
      body: JSON.stringify(data),
    }),
  });
};

const srAuthenticatedFetch = async (
  url: string,
  data?: any,
  method?: "GET" | "POST"
) => {
  const token = await getToken();
  return srFetch(url, data, method, token);
};

export const fetchToken = async () => {
  const response = await srFetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      email: process.env.SHIPROCKET_API_EMAIL,
      password: process.env.SHIPROCKET_API_PASS,
    }
  );

  return (await response.json()).token as string;
};
