"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Form } from "@/components/ui";
import type { FarmerInputType } from "@/types";

type FarmerFormProps = {
  initialData?: FarmerInputType;
  id?: number;
};

export const FarmerForm = ({ initialData, id }: FarmerFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState<FarmerInputType>({
    name: "",
    email: "",
    phone: "",
    address: "",
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
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/farmers?id=${id}` : "/api/farmers";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/farmers");
    } else {
      alert("Failed to save farmer data");
    }
  };

  return (
    <Form title={id ? "Edit Farmer" : "Create Farmer"} onSubmit={handleSubmit} submitLabel={id ? "Update" : "Create"}>
      <Input label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter farmer's name" required />
      <Input label="Email" name="email" type="email" value={form.email ?? ""} onChange={handleChange} placeholder="Enter email address" />
      <Input label="Phone" name="phone" value={form.phone ?? ""} onChange={handleChange} placeholder="Enter phone number" />
      <Input label="Address" name="address" value={form.address ?? ""} onChange={handleChange} placeholder="Enter address" />
    </Form>
  );
};
