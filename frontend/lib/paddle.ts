import { initializePaddle, Paddle } from '@paddle/paddle-js';

let paddleInstance: Paddle | undefined;
let checkoutCompletedCallback: (() => void) | undefined;

export function setCheckoutCompletedCallback(cb: () => void) {
  checkoutCompletedCallback = cb;
}

export async function getPaddle(): Promise<Paddle | undefined> {
  if (paddleInstance) return paddleInstance;

  paddleInstance = await initializePaddle({
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ? 'production' : 'sandbox',
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    eventCallback(event) {
      if (event.name === 'checkout.completed') {
        checkoutCompletedCallback?.();
      }
    },
  });

  return paddleInstance;
}
