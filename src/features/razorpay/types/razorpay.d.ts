declare class Razorpay {
  constructor(config: {
    key: string
    amount: number
    currency: string
    order_id: string
    callback_url?: string
    image: string
    name: string
    prefill: {
      name: string
      contact: string
    }
    modal?: {
      ondismiss?: () => void
    }
    handler?: (response: {
      razorpay_payment_id?: string
      razorpay_order_id?: string
      razorpay_signature?: string
    }) => void
  })

  open(): void
}
