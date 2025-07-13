"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Table } from "@/components/table/Table";
import { DashboardLayout } from "@/components/layout";
import type { FarmerType } from "@/types";

export default function FarmersPage() {
  const router = useRouter();
  const [farmers, setFarmers] = useState<FarmerType[]>([]);

  useEffect(() => {
    fetch("/api/farmers")
      .then((res) => res.json())
      .then(setFarmers);
  }, []);

  const handleEdit = (farmer: FarmerType) => {
    router.push(`/farmers/${farmer.id}`);
  };

  const handleAdd = () => {
    router.push("/farmers/new");
  };

  return (
    <DashboardLayout>
      <Table
        label="👨‍🌾 Farmers"
        data={farmers}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "address", label: "Address" },
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </DashboardLayout>
  );
}
