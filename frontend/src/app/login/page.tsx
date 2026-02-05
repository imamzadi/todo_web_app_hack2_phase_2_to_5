"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Loader2, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Fetch user details
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.detail || "Failed to fetch user details");
      }

      const userData = await userResponse.json();

      login(accessToken, userData);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-500/10 via-transparent to-indigo-500/10 p-4">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px] pointer-events-none" />
      <Card className="w-full max-w-md border-0 bg-white/10 backdrop-blur-xl shadow-2xl text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white/20">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-slate-200">
            Enter your credentials to access your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 focus-visible:border-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 focus-visible:border-white/50"
              />
            </div>
            {error && <p className="text-sm text-red-300 font-medium bg-red-500/20 p-2 rounded">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-white text-purple-600 hover:bg-slate-100 font-semibold text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center justify-center text-slate-200">
          Don't have an account?{" "}
          <Link href="/signup" className="ml-1 font-semibold text-white hover:underline transition-all">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
