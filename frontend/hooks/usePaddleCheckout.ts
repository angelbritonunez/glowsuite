'use client';
import { usePaddle } from '@/hooks/usePaddle';
import { createClient } from '@/lib/supabase';

export function usePaddleCheckout() {
  const paddle = usePaddle();

  const openCheckout = async (priceId: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    paddle?.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: {
        user_id: user.id,
      },
    });
  };

  return { openCheckout };
}
