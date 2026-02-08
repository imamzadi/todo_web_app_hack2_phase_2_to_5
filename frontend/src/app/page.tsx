import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Layout, Zap, Shield, ArrowRight, Sparkles, MousePointer2, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <main className="pt-40 pb-20 relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-10 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-white/5 border border-white/10 backdrop-blur-md text-cyan-300 ring-1 ring-inset ring-white/10">
              <Sparkles className="w-4 h-4" />
              <span>Experience the future of productivity</span>
            </div>

            <h1 className="text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl leading-[1.1] mb-8">
              Focus on what <br />
              <span className="aurora-text">truly matters</span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-medium">
              TaskFlow is more than a todo list. It's an elegant workspace designed
              to bring clarity to your day and momentum to your goals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Button size="lg" className="aurora-btn px-10 h-16 text-lg rounded-2xl group shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]" asChild>
                <Link href="/signup">
                  Start Building
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="px-10 h-16 text-lg rounded-2xl text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10" asChild>
                <Link href="/login">Explore Demo</Link>
              </Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="mt-48 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-cyan-400" />,
                title: "Hyper-speed",
                description: "Built for performance. Navigate through your tasks with zero friction and instant feedback.",
                border: "hover:border-cyan-500/30"
              },
              {
                icon: <Layout className="w-6 h-6 text-blue-400" />,
                title: "Fluid Design",
                description: "A gorgeous, distraction-free environment that adapts to your workflow seamlessly.",
                border: "hover:border-blue-500/30"
              },
              {
                icon: <Shield className="w-6 h-6 text-purple-400" />,
                title: "Total Sync",
                description: "Your workspace is always in sync, encrypted and accessible from any device, anywhere.",
                border: "hover:border-purple-500/30"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`group glass-card p-10 rounded-[2.5rem] text-left border border-white/5 transition-all duration-500 ${feature.border} hover:-translate-y-2`}
              >
                <div className="mb-6 inline-flex p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 relative z-10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-white group cursor-pointer">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            TaskFlow
          </div>
          <div className="text-white/40 text-sm font-medium">
            © {new Date().getFullYear()} TaskFlow Inc. Redefining Productivity.
          </div>
          <div className="flex items-center gap-6 text-white/40 text-sm font-medium">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
