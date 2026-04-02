'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SignOutBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('signedOut') === 'true') {
      setShow(true);
      router.replace('/');
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  if (!show) return null;

  return (
    <p className="text-amber-400 text-sm text-center bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3">
      You've been signed out successfully.
    </p>
  );
}
