'use client';
import { useRouter } from 'next/navigation';
import { usePaddle } from '@/hooks/usePaddle';
import { createClient } from '@/lib/supabase';
import { setCheckoutCompletedCallback } from '@/lib/paddle';

export function usePaddleCheckout() {
  const paddle = usePaddle();
  const router = useRouter();

  const openCheckout = async (priceId: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    setCheckoutCompletedCallback(() => {
      setTimeout(() => {
        paddle?.Checkout.close();
        router.push('/dashboard');
      }, 3000);
    });

    paddle?.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: {
        user_id: user.id,
      },
      settings: {
        locale: 'es',
      },
    });
  };

  return { openCheckout };
}
