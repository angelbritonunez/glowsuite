'use client';
import { usePaddle } from '@/hooks/usePaddle';
import { usePaddleCheckout } from '@/hooks/usePaddleCheckout';

export default function PaddleTestPage() {
  const paddle = usePaddle();
  const { openCheckout } = usePaddleCheckout();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Paddle Checkout — Sandbox</h1>
      <p className="text-sm text-gray-500">
        {paddle ? 'Paddle inicializado ✓' : 'Cargando Paddle…'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => openCheckout(process.env.NEXT_PUBLIC_PADDLE_PRICE_BASIC!)}
          disabled={!paddle}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium disabled:opacity-40 hover:bg-blue-700 transition-colors"
        >
          Probar Basic ($9)
        </button>
        <button
          onClick={() => openCheckout(process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO!)}
          disabled={!paddle}
          className="rounded-lg px-6 py-3 text-white font-medium disabled:opacity-40 transition-colors"
          style={{ backgroundColor: '#E75480' }}
        >
          Probar Pro ($19)
        </button>
      </div>
    </main>
  );
}
