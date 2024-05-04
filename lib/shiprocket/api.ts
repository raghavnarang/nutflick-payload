import { z } from "zod";
import { fetchToken } from "./auth";
import { SHIPROCKET_API_URL } from "./constants";
import { getCourierProvidersFromApiResponse } from "./utils";

const srFetch = async (
  url: string,
  data?: any,
  method?: "GET" | "POST",
  token?: string
) => {
  const finalMethod = method || (data ? "POST" : "GET");
  const response = await fetch(url, {
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

  return response.json();
};

const srAuthenticatedFetch = async (
  url: string,
  data?: any,
  method?: "GET" | "POST"
) => {
  const token = await fetchToken();
  return srFetch(url, data, method, token);
};

const getApiUrl = (path: string) => `${SHIPROCKET_API_URL}${path}`;

export const fetchTokenFromApi = async () => {
  const response = await srFetch(getApiUrl("/auth/login"), {
    email: process.env.SHIPROCKET_API_EMAIL,
    password: process.env.SHIPROCKET_API_PASS,
  });

  return z.object({ token: z.string() }).parse(response).token;
};

export const getServiceableCouriers = async (
  from: string,
  to: string,
  weight: number,
  cod = false
) => {
  const queryParams = new URLSearchParams({
    cod: !cod ? "0" : "1",
    weight: `${weight}`,
    pickup_postcode: from,
    delivery_postcode: to,
  }).toString();

  const response = await srAuthenticatedFetch(
    getApiUrl(`/courier/serviceability?${queryParams}`)
  );

  return getCourierProvidersFromApiResponse(response);
};
