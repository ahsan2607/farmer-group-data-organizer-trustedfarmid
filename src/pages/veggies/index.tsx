"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Table } from "@/components/table/Table";
import { DashboardLayout } from "@/components/layout";
import type { VeggieType } from "@/types";

export default function VeggiesPage() {
  const router = useRouter();
  const [veggies, setVeggies] = useState<VeggieType[]>([]);

  useEffect(() => {
    fetch("/api/veggies")
      .then((res) => res.json())
      .then(setVeggies);
  }, []);

  const handleEdit = (veggie: VeggieType) => {
    router.push(`/veggies/${veggie.id}`);
  };

  const handleAdd = () => {
    router.push("/veggies/new");
  };

  return (
    <DashboardLayout>
      <Table
        label="🥬 Veggies"
        data={veggies}
        columns={[
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "pricePerKg", label: "Price per Kg" },
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </DashboardLayout>
  );
}
