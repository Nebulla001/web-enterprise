"use client";

import { Home, Database, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "CRUD Items", href: "/crud", icon: Database },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 250 }}
      className="h-screen bg-slate-900 text-white fixed"
    >
      <div className="flex justify-between items-center p-4">
        {!collapsed && <h1 className="font-bold">Admin SaaS</h1>}
        <Menu
          className="cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <nav className="space-y-2 p-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}