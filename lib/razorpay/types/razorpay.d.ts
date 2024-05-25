declare class Razorpay {
  constructor(config: {
    key: string;
    amount: number;
    currency: string;
    order_id: string;
    callback_url: string;
    image: string;
    name: string;
    prefill: {
      name: string;
      contact: string;
    };
    modal?: {
      ondismiss?: () => void;
    };
  });

  open(): void;
}
