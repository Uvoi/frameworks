"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Moon, Settings, Sun } from "lucide-react";

const SidePanel = () => {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Личный кабинет" },
    { href: "/plan", label: "План тренировок" },
    { href: "/charts", label: "Графики активности" },
    { href: "/history", label: "История активностей" },
  ];

  return (
    <div className="SidePanel w-24/100 h-screen flex flex-col justify-between bg-menu text-foreground p-6 box-border">
      <div className="Menu flex flex-col justify-evenly gap-6 text-xl text-muted">
        <h3 className="text-primary text-4xl font-bold pb-10">BaobabTrain</h3>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "text-foreground font-semibold" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="subMenu flex w-full justify-between">
        <Link href="/settings">
          <Settings className="text-primary" size={25}/>
        </Link>
        <ThemeToggle
          darkLabel={<Moon className="text-primary" size={25}/>}
          lightLabel={<Sun className="text-primary" size={25}/>}
        />
      </div>
    </div>
  );
};

export default SidePanel;
