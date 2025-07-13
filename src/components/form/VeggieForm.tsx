"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Form } from "@/components/ui";
import type { VeggieInputType } from "@/types";

type VeggieFormProps = {
  initialData?: VeggieInputType;
  id?: number;
};

export const VeggieForm = ({ initialData, id }: VeggieFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState<VeggieInputType>({
    name: "",
    type: "",
    pricePerKg: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "pricePerKg" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/veggies?id=${id}` : "/api/veggies";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/veggies");
    } else {
      alert("Failed to save veggie data");
    }
  };

  return (
    <Form
      title={id ? "Edit Veggie" : "Create Veggie"}
      onSubmit={handleSubmit}
      submitLabel={id ? "Update" : "Create"}
    >
      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter veggie name"
        required
      />
      <Input
        label="Type"
        name="type"
        value={form.type ?? ""}
        onChange={handleChange}
        placeholder="Optional: e.g. leafy, root, fruit"
      />
      <Input
        label="Price per Kg"
        name="pricePerKg"
        type="number"
        value={String(form.pricePerKg)}
        onChange={handleChange}
        placeholder="e.g. 12000"
        required
      />
    </Form>
  );
};
