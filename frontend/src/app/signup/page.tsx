"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus, Mail, Lock, User, Sparkles, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";


export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Signup failed");
      }

      toast("Account Created!", {
        description: "You can now log in with your new account.",
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      toast.error("Uh oh! Something went wrong.", {
        description: err.message || "There was a problem creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-lg glass-card border-white/5 bg-white/[0.03] backdrop-blur-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] rounded-[2.5rem] overflow-hidden mt-20">
        <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500" />

        <CardHeader className="space-y-4 text-center pt-10 pb-8 px-10">
          <div className="flex justify-center">
            <div className="p-4 rounded-[1.25rem] bg-white/5 border border-white/10 shadow-inner group">
              <UserPlus className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-black tracking-tighter text-white">
              Create <span className="aurora-text">Account</span>
            </CardTitle>
            <CardDescription className="text-white/40 text-lg font-medium">
              Join TaskFlow and start your journey today.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-10 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <Label htmlFor="username" className="text-white/60 text-sm font-semibold ml-1 uppercase tracking-widest">
                Username
              </Label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 pl-12 rounded-2xl focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all duration-300"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-purple-400/60 transition-colors" />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-white/60 text-sm font-semibold ml-1 uppercase tracking-widest">
                Email
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 pl-12 rounded-2xl focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all duration-300"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-blue-400/60 transition-colors" />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-white/60 text-sm font-semibold ml-1 uppercase tracking-widest">
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 pl-12 rounded-2xl focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50 transition-all duration-300"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-cyan-400/60 transition-colors" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 animate-in fade-in slide-in-from-top-2">
                <div className="w-1 h-6 bg-red-500 rounded-full" />
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="aurora-btn w-full h-16 rounded-2xl font-bold text-lg group shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Initializing...
                </>
              ) : (
                <span className="flex items-center">
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="px-10 pb-10 flex flex-col items-center gap-4">
          <div className="w-full h-px bg-white/5" />
          <p className="text-white/30 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors hover:underline underline-offset-4 decoration-purple-400/30">
              Go to login
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/10 font-bold tracking-widest text-xs uppercase">
        <Sparkles className="w-4 h-4" />
        TaskFlow Universal Identity
      </div>
    </div>
  );
}
