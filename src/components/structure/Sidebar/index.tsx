"use client";
import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Folder,
  Settings,
  LayoutDashboard,
  FileText,
  ChevronDown,
  ChevronRight,
  Leaf,
  CalendarCheck,
  Repeat,
  PackageCheck,
  BarChart3,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: JSX.Element;
  href?: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    label: "Data Manager",
    icon: <Folder size={20} />,
    children: [
      { label: "Farmers", icon: <FileText size={18} />, href: "/farmers" },
      { label: "Veggies", icon: <Leaf size={18} />, href: "/veggies" },
      { label: "Crop Harvests", icon: <CalendarCheck size={18} />, href: "/crop-harvests" },
      { label: "Predictions", icon: <BarChart3 size={18} />, href: "/crop-yield-predictions" },
    ],
  },
  {
    label: "Transaction",
    icon: <Folder size={20} />,
    children: [
      { label: "Crop Orders", icon: <PackageCheck size={18} />, href: "/crop-orders" },
      { label: "Returned Crops", icon: <Repeat size={18} />, href: "/crop-returned" },
    ],
  },
  {
    label: "Settings",
    icon: <Settings size={20} />,
    href: "/settings",
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebar-collapsed");
    const savedExpanded = localStorage.getItem("sidebar-expanded-groups");

    setCollapsed(savedCollapsed === "true");

    if (savedExpanded) {
      try {
        setExpandedGroups(JSON.parse(savedExpanded));
      } catch {
        setExpandedGroups({});
      }
    }
  }, []);

  useEffect(() => {
    if (collapsed !== null) {
      localStorage.setItem("sidebar-collapsed", collapsed.toString());
    }
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded-groups", JSON.stringify(expandedGroups));
  }, [expandedGroups]);

  if (collapsed === null) return null;

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`h-screen bg-gray-900 text-white px-4 py-6 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-6 ${
          collapsed ? "flex-col gap-2" : "flex-row"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <LayoutDashboard size={24} />
            <span className="text-xl font-semibold">MyApp</span>
          </div>
        )}
        <button
          className="hover:bg-gray-800 p-2 rounded-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Nav Items */}
      <div className={`flex flex-col gap-2 ${collapsed ? "items-center" : ""}`}>
        {navItems.map((item, i) => {
          const hasChildren = !!item.children?.length;
          const isExpanded = expandedGroups[item.label] ?? false;

          return (
            <div key={i} className="w-full">
              {/* === PARENT ITEM === */}
              <div className="group relative w-full">
                {item.href && !hasChildren ? (
                  // Normal Link (Dashboard, Settings)
                  <Link
                    href={item.href}
                    className={`flex items-center hover:bg-gray-800 p-2 rounded-md transition-all cursor-pointer ${
                      collapsed ? "justify-center" : "justify-between"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                  </Link>
                ) : (
                  // Dropdown parent
                  <div
                    onClick={() => toggleGroup(item.label)}
                    className={`flex items-center hover:bg-gray-800 p-2 rounded-md transition-all cursor-pointer ${
                      collapsed ? "justify-center" : "justify-between"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <span className="transition-transform duration-200">
                        {isExpanded ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                      </span>
                    )}
                  </div>
                )}

                {/* Tooltip */}
                {collapsed && (
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-opacity duration-200">
                    {item.label}
                  </div>
                )}
              </div>

              {/* === CHILDREN === */}
              {hasChildren && isExpanded && (
                <div
                  className={`mt-1 flex flex-col gap-1 ${
                    collapsed
                      ? "items-center"
                      : "ml-4 border-l border-gray-700 pl-2"
                  }`}
                >
                  {item.children!.map((child, j) => (
                    <div key={j} className="group relative w-full">
                      <Link
                        href={child.href!}
                        className={`hover:bg-gray-800 p-2 rounded-md flex items-center gap-2 cursor-pointer transition-all ${
                          collapsed ? "justify-center" : ""
                        }`}
                      >
                        <span>{child.icon}</span>
                        {!collapsed && <span>{child.label}</span>}
                      </Link>

                      {collapsed && (
                        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 transition-opacity duration-200">
                          {child.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
