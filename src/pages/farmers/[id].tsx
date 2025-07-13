"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FarmerForm } from '@/components/form';
import { DashboardLayout } from '@/components/layout';
import type { FarmerType } from '@/types';

export default function EditFarmerPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const [farmer, setFarmer] = useState<FarmerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    fetch(`/api/farmers?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFarmer(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load farmer');
        setLoading(false);
      });
  }, [router.isReady, id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!farmer) return <p className="p-4 text-red-500">Farmer not found</p>;

  return (
    <DashboardLayout>
      <FarmerForm id={Number(id)} initialData={farmer} />
    </DashboardLayout>
  );
}
