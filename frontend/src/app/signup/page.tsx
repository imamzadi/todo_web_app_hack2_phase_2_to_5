"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-500/10 via-transparent to-indigo-500/10 p-4">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px] pointer-events-none" />
      <Card className="w-full mt-10 max-w-md border-0 bg-white/10 backdrop-blur-xl shadow-2xl text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white/20">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Create Account</CardTitle>
          <CardDescription className="text-slate-200">
            Join us today! Enter your details below.
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
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  Signing up...
                </>
              ) : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center justify-center text-slate-200">
          Already have an account?{" "}
          <Link href="/login" className="ml-1 font-semibold text-white hover:underline transition-all">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
