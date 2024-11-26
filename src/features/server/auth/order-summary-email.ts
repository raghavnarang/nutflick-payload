import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Order } from '@/payload-types'
import { getFormattedPrice, getLogoURL } from '@/utils/misc'

export async function sendOrderSummaryEmail(email: string, order: Order) {
  const parsedEmail = z.string().email().parse(email)
  const message = orderSummaryTemplate(order)
  const payload = await getPayload({ config })
  await payload.sendEmail({
    from: `"${payload.email.defaultFromName}" <${payload.email.defaultFromAddress}>`,
    html: message,
    subject: 'Your Nutflick order',
    to: parsedEmail,
  })
}

function orderSummaryTemplate(order: Order) {
  const orderNumber = order.id
  const date = new Date(order.updatedAt).toLocaleDateString('en-US', {
    weekday: 'long', // "Monday"
    year: 'numeric', // "2024"
    month: 'long', // "October"
    day: 'numeric', // "29"
  })

  const address = `${order.name}, ${order.address}, ${order.city}, ${order.state}, ${order.pincode}`
  const phone = order.phone

  const orderItems = order.products
    .map(
      (p) => `<tr>
            <td class="table-cell item-name order">${p.title} (x${p.qty})</td>
            <td align="right" class="table-cell order">${getFormattedPrice(p.price * p.qty)}</td>
          </tr>`,
    )
    .join('')

  const shipping = `<tr>
            <td class="table-cell item-name order">Shipping (${order.mode})</td>
            <td align="right" class="table-cell order">${getFormattedPrice(order.rate || 0)}</td>
          </tr>`

  const discount = order.coupon
    ? `<tr>
            <td class="table-cell item-name order">Discount (${order.coupon})</td>
            <td align="right" class="table-cell order" style="color:green;">${getFormattedPrice(order.discount || 0, true)}</td>
          </tr>`
    : ''

  const orderSummaryItems = orderItems + shipping + discount

  const total = getFormattedPrice(order.razorpay?.total || 0)

  return `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:480px) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }</style><style type="text/css">.heading {
      margin-top: 30px;
      margin-bottom: 20px;
      }
      .body {
      font-size: 16px;
      line-height: 30px;
      }
      .order {
	      font-size:14px;
      	line-height: 25px;
      }
      .order-details,
      .footer-text {
      font-size: 14px;
      }
      .item-name {
      font-weight: bold;
      padding: 10px 0;
      }
      .table-cell {
      padding: 10px 0;
      min-width:70px;
      }
      .total {
      font-weight: bold;
      font-size: 16px;
      }</style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:150px;"><img height="auto" src="${getLogoURL()}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150"></td></tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"><h1 class="heading">Order Summary</h1><p class="body">Thank you for your order. Here are your order details.</p><mj-text><p class="order">Order Number: <strong>#${orderNumber}</strong><br>Order Date: <strong>${date}</strong></p></mj-text><mj-text><p class="order" style="max-width:300px">Address: <strong>${address}</strong><br>Phone: <b>${phone}</b></p></mj-text></div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none;"><tr style="border-bottom: 1px solid #d9d9d9;"><th align="left" class="table-cell order">Item</th><th align="right" class="table-cell order">Price</th></tr>${orderSummaryItems}</table></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 4px #d9d9d9;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #d9d9d9;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr><tr><td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:right;color:#000000;"><p class="total">Total: ${total}</p></div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"><p class="body">If you have any questions, contact us at: <b>hi@nutflick.com</b></p></div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`
}
