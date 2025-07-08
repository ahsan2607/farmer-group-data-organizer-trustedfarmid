import { useEffect, useState } from 'react';
import { DashboardLayout, Table } from '@/components';
import type { FarmerType } from '@/types';

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<FarmerType[]>([]);

  useEffect(() => {
    fetch('/api/farmers')
      .then((res) => res.json())
      .then(setFarmers);
  }, []);

  const handleEdit = (farmer: FarmerType) => {
    alert(`Edit ${farmer.name}`);
    // Optional: open modal or redirect
  };

  return (
    <DashboardLayout>
      <h2 className="text-xl font-bold mb-4">👨‍🌾 Farmers</h2>
      <Table
        data={farmers}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'address', label: 'Address' },
        ]}
        onEdit={handleEdit}
      />
    </DashboardLayout>
  );
}