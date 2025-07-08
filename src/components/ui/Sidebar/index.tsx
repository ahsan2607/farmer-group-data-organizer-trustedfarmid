"use client";
import { useState } from "react";
import { Menu, X, Home, Folder, Settings, LayoutDashboard, FileText } from "lucide-react";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <aside
        className={`h-screen bg-gray-900 text-white p-4 flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}`}
      >
        <div className={`flex justify-between items-center gap-4 mb-6 ${collapsed ? "flex-col" : "flex-row"}`}>
          {!collapsed && (
            <>
              <div className="flex items-center gap-2">
                <LayoutDashboard size={24} />
                <span className="text-xl font-semibold">MyApp</span>
              </div>
            </>
          )}
          <button className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-md cursor-pointer" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <Menu size={20} /> : <X size={20} />}</button>
        </div>
        <div className={`flex flex-col gap-4 ${collapsed ? "items-center" : ""}`}>
          <div className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-md cursor-pointer">
            <Home size={20} />
            {!collapsed && <span>Dashboard</span>}
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-md cursor-pointer">
            <Folder size={20} />
            {!collapsed && <span>Projects</span>}
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-md cursor-pointer">
            <FileText size={20} />
            {!collapsed && <span>Reports</span>}
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-md cursor-pointer">
            <Settings size={20} />
            {!collapsed && <span>Settings</span>}
          </div>
        </div>
      </aside>
  );
};
