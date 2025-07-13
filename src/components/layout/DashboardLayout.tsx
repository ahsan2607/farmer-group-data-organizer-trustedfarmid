'use client';
import { Sidebar } from "../structure";
import "../../app/globals.css";

type DashboardLayoutType = {
  children?: React.ReactNode
}

export const DashboardLayout = (props: DashboardLayoutType) => {
  const { children } = props

  return (
    <main className="flex">
      <Sidebar />
      <section className="px-4 sm:px-8 md:px-16 py-12 w-full">
        {children}
      </section>
    </main>
  );
}
