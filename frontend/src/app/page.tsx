import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Layout, Zap, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              New: Version 2.0 is now live
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
              Master your day with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-blue-400">
                TaskFlow
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              The minimalist productivity tool designed to help you focus on what matters.
              Organize tasks, set priorities, and achieve your goals with ease.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="px-8 h-14 text-lg rounded-full group" asChild>
                <Link href="/signup">
                  Start for free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-14 text-lg rounded-full" asChild>
                <Link href="/login">View Demo</Link>
              </Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-primary" />,
                title: "Lightning Fast",
                description: "Optimized for speed. Manage your tasks without any friction or delay."
              },
              {
                icon: <Layout className="w-6 h-6 text-primary" />,
                title: "Clean Interface",
                description: "A distraction-free environment designed to keep your focus on the work."
              },
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "Secure & Private",
                description: "Your data is encrypted and synchronized across all your devices securely."
              }
            ].map((feature, i) => (
              <div key={i} className="relative p-8 rounded-3xl border bg-card/50 hover:bg-card transition-colors">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            TaskFlow
          </div>
          <div>© {new Date().getFullYear()} TaskFlow Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
