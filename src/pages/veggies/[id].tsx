"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { VeggieForm } from '@/components/form';
import { DashboardLayout } from '@/components/layout';
import type { VeggieType } from '@/types';

export default function EditVeggiePage() {
  const router = useRouter();
  const id = router.query.id as string;
  const [veggie, setVeggie] = useState<VeggieType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    fetch(`/api/veggies?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVeggie(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load veggie');
        setLoading(false);
      });
  }, [router.isReady, id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!veggie) return <p className="p-4 text-red-500">Veggie not found</p>;

  return (
    <DashboardLayout>
      <VeggieForm id={Number(id)} initialData={veggie} />
    </DashboardLayout>
  );
}
