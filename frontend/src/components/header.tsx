"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, CheckCircle2, LayoutDashboard, LogIn, UserPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { label: "Workbench", href: "/dashboard", icon: LayoutDashboard, show: isAuthenticated },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="glass-card rounded-[2rem] px-8 py-4 flex items-center justify-between bg-white/[0.02] border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        <Link href="/" className="flex items-center gap-3 group/logo relative z-10">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all group-hover/logo:scale-110 group-hover/logo:rotate-3">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter text-white leading-none">
              AURA <span className="aurora-text uppercase text-lg italic">Stack</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mt-1">Unified Command</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6 relative z-10">
          {navItems.filter(item => item.show).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 rounded-2xl transition-all duration-500 text-sm font-bold tracking-tight",
                pathname === item.href
                  ? "bg-white/10 text-white shadow-xl shadow-black/20"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-4 h-4 transition-transform", pathname === item.href ? "text-cyan-400" : "")} />
              <span className="hidden md:block uppercase tracking-wider text-[11px]">{item.label}</span>
            </Link>
          ))}

          {isAuthenticated && <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block" />}

          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white/30 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all font-bold uppercase tracking-widest text-[10px]"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:block">Disconnect</span>
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="text-white/40 hover:text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] h-11 px-6">
                <Link href="/login">
                  <span className="">Login</span>
                </Link>
              </Button>
              <Button size="sm" asChild className="aurora-btn rounded-2xl shadow-[0_10px_20px_-5px_rgba(6,182,212,0.3)] h-11 px-8 font-black uppercase tracking-tight italic">
                <Link href="/signup">
                  <span className="">Enlist</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
