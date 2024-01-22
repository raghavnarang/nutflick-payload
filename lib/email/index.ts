import getVerificationEmailTemplate from "./templates/verification";

export const sendEmail = (to: string, body: string) =>
  fetch("https://api.zeptomail.com/v1.1/email", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: process.env.ZEPTOMAIL_TOKEN!,
    },
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      from: { address: "noreply@nutflick.com" },
      to: [
        {
          email_address: {
            address: to,
            name: to,
          },
        },
      ],
      subject: "Login to Nutflick",
      htmlbody: body,
    }),
  });

export const sendVerificationRequestMail = async (to: string, url: string) => {
  const body = await getVerificationEmailTemplate(to, url);
  return sendEmail(to, body);
};
