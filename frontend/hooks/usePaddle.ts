'use client';
import { useEffect, useState } from 'react';
import { Paddle } from '@paddle/paddle-js';
import { getPaddle } from '@/lib/paddle';

export function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle | undefined>();

  useEffect(() => {
    getPaddle().then(setPaddle);
  }, []);

  return paddle;
}
