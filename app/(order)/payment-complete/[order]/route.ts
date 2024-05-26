import "server-only";
import { createClient } from "@/lib/supabase/service";
import { sha256 } from "js-sha256";
import { NextRequest } from "next/server";
import { zfd } from "zod-form-data";

export async function POST(
  request: NextRequest,
  { params: { order } }: { params: { order: string } }
) {
  const rzpParams = zfd
    .formData({
      razorpay_payment_id: zfd.text(),
      razorpay_order_id: zfd.text(),
      razorpay_signature: zfd.text(),
    })
    .parse(await request.formData());

  const dbClient = createClient();
  const { data: rzpOrder, error } = await dbClient
    .from("razorpay_orders")
    .select("rzp_order_id")
    .eq("order_id", order);
  if (error || !rzpOrder || rzpOrder.length === 0) {
    console.log(error);
    return Response.json({ error: "payment data is invalid" }, { status: 403 });
  }

  const dbRzpOrderId = rzpOrder[0].rzp_order_id;
  const generatedSignature = sha256.hmac(
    process.env.RAZORPAY_KEY_SECRET!,
    dbRzpOrderId + "|" + rzpParams.razorpay_payment_id
  );

  if (generatedSignature !== rzpParams.razorpay_signature) {
    return Response.json({ error: "payment data is invalid" }, { status: 403 });
  }

  const { error: updateError } = await dbClient
    .from("razorpay_orders")
    .update({
      rzp_payment_id: rzpParams.razorpay_payment_id,
      rzp_signature: rzpParams.razorpay_signature,
    })
    .eq("order_id", order);

  if (updateError) {
    console.log(updateError);
    return Response.json({ error: "unable to update order" }, { status: 403 });
  }

  return Response.redirect(`${process.env.NEXT_PUBLIC_VERCEL_URL}/order-complete/${order}`);
}
