"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, Plus, CheckCircle2, Circle, Trash2, Edit2, Calendar, Filter, Zap, Clock, Search } from 'lucide-react';
import { useAuth, authFetch } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Chatbot } from "@/components/chatbot";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  create_date: string;
  update_date: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout, token, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      fetchTasks();
    }
  }, [isAuthenticated, router, filterStatus]);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;
      if (filterStatus !== "all") {
        url += `?status=${filterStatus}`;
      }
      const response = await authFetch(url, {}, token);

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch tasks");
      }
      const data: Task[] = await response.json();
      // Sort tasks: pending first, then by date (newest first)
      const sortedData = data.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(b.create_date).getTime() - new Date(a.create_date).getTime();
        }
        return a.status === 'pending' ? -1 : 1;
      });
      setTasks(sortedData);
    } catch (err: any) {
      setError(err.message || "Error fetching tasks.");
      toast.error(err.message || "Could not fetch tasks.");
    } finally {
      setLoading(false);
    }
  };


  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTaskTitle, description: newTaskDescription }),
        },
        token
      );

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsAddingTask(false);
      toast.success("Task Added!");
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Error adding task.");
      toast.error(err.message || "Could not add task.");
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(task.status);
  };

  const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
    setError("");
    try {
      const payload = {
        title: updates.title,
        description: updates.description,
        status: updates.status
      };

      // Populate missing fields from existing task if not in updates
      if (!payload.title || !payload.status) {
        const existing = tasks.find(t => t.id === taskId);
        if (existing) {
          if (!payload.title) payload.title = existing.title;
          if (!payload.status) payload.status = existing.status;
          if (payload.description === undefined) payload.description = existing.description;
        }
      }

      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        token
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      if (editingTask && editingTask.id === taskId) {
        setEditingTask(null);
      }

      toast.success("Task Updated!");
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Error updating task.");
      toast.error(err.message || "Could not update task.");
    }
  };

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    handleUpdateTask(editingTask.id, {
      title: editTitle,
      description: editDescription,
      status: editStatus
    });
  }

  const handleDeleteTask = async (taskId: number) => {
    setError("");

    try {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
        },
        token
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      toast.success("Task Deleted!");
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Error deleting task.");
      toast.error(err.message || "Could not delete task.");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleStatus = (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    handleUpdateTask(task.id, { status: newStatus });
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading && tasks.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center relative overflow-hidden">
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[30%] right-[20%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none animate-pulse" />
        <div className="relative flex flex-col items-center gap-6">
          <div className="p-4 rounded-3xl bg-white/5 border border-white/10 animate-spin">
            <Zap className="h-10 w-10 text-cyan-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
          </div>
          <p className="aurora-text font-black text-xl tracking-tighter">Syncing Workspace...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-0 left-0 w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none transition-all duration-1000" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none transition-all duration-1000" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-white">
              Your <span className="aurora-text">Workbench</span>
            </h1>
            <p className="text-white/40 text-lg font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Welcome back, {user?.username || 'Pilot'}. You have {tasks.filter(t => t.status === 'pending').length} items in focus.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64 group">
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 bg-white/5 border-white/10 text-white pl-10 rounded-xl focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/20"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-cyan-400/60 transition-colors" />
            </div>
            <Button
              onClick={() => setIsAddingTask(!isAddingTask)}
              className="aurora-btn h-12 px-6 rounded-xl font-bold shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Initialize Task
            </Button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40">
              <Filter className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              {['all', 'pending', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${filterStatus === status
                      ? "bg-white/10 text-cyan-400 shadow-inner"
                      : "text-white/30 hover:text-white/60 hover:bg-white/5"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add Task Form (Fluid) */}
        {isAddingTask && (
          <div className="mb-12 animate-in slide-in-from-top-4 fade-in duration-500">
            <Card className="glass-card border-cyan-500/20 bg-white/[0.03] overflow-hidden rounded-3xl">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-600" />
              <CardContent className="p-8">
                <form onSubmit={handleAddTask} className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white/40 uppercase tracking-widest text-xs font-black">Designation</Label>
                      <Input
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        required
                        className="h-14 bg-white/5 border-white/10 text-white rounded-2xl text-lg font-bold"
                        placeholder="Define the objective..."
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white/40 uppercase tracking-widest text-xs font-black">Briefing</Label>
                      <Textarea
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        className="min-h-[120px] bg-white/5 border-white/10 text-white rounded-2xl resize-none py-4"
                        placeholder="Elaborate on the requirements..."
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-white/5">
                    <Button type="button" variant="ghost" onClick={() => setIsAddingTask(false)} className="text-white/40 hover:text-white rounded-xl px-8 h-12">Discard</Button>
                    <Button type="submit" className="aurora-btn rounded-xl px-10 h-12 font-bold">Deploy Task</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.length === 0 && !loading && (
            <div className="col-span-full py-32 flex flex-col items-center text-center space-y-6 animate-in fade-in scale-in duration-1000">
              <div className="p-10 rounded-full bg-white/[0.02] border border-white/5 shadow-2xl">
                <Calendar className="h-20 w-20 text-white/5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white tracking-tighter lowercase">the board is clear.</h3>
                <p className="text-white/30 text-lg font-medium">All systems normal. No active objectives in this sector.</p>
              </div>
              <Button onClick={() => setIsAddingTask(true)} variant="outline" className="h-14 px-10 rounded-2xl border-white/10 text-white hover:bg-white/5">
                Initialize First Resource
              </Button>
            </div>
          )}

          {filteredTasks.map((task, idx) => (
            <Card
              key={task.id}
              className={`group glass-card border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader className="p-8 pb-4 relative">
                <div className={`absolute top-0 right-8 h-1.5 w-16 rounded-b-full transition-all duration-500 ${task.status === 'completed' ? 'bg-cyan-500 blur-[4px]' : 'bg-purple-500 blur-[4px]'}`} />
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className={`text-2xl font-black tracking-tighter leading-tight transition-all duration-500 ${task.status === 'completed' ? 'text-white/20 line-through' : 'text-white'}`}>
                    {task.title}
                  </CardTitle>
                  <button
                    onClick={() => toggleStatus(task)}
                    className={`flex-shrink-0 p-3 rounded-2xl transition-all duration-500 ${task.status === 'completed'
                        ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110'
                        : 'bg-white/5 text-white/20 hover:text-white/40 ring-1 ring-white/10'
                      }`}
                  >
                    {task.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-2 flex-grow flex flex-col gap-6">
                <p className={`text-lg font-medium transition-all duration-500 ${task.status === 'completed' ? 'text-white/10' : 'text-white/40'} line-clamp-4 leading-relaxed`}>
                  {task.description || "No tactical details provided for this objective."}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg ${task.status === 'completed' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-white/10 font-bold text-[10px] tracking-widest uppercase">
                    <Clock className="w-3 h-3" />
                    {new Date(task.create_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </CardContent>

              <div className="px-8 pb-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditClick(task)}
                  className="flex-grow h-12 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-cyan-500/10 border border-white/5"
                >
                  <Edit2 className="h-4 w-4 mr-2" /> Modify
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteTask(task.id)}
                  className="h-12 w-12 rounded-2xl bg-white/5 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 border border-white/5"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl glass-card border-white/10 bg-white/[0.05] rounded-[3rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)]">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
            <CardHeader className="p-10 pb-6 text-center">
              <CardTitle className="text-4xl font-black tracking-tighter text-white">Reconfigure <span className="aurora-text">Objective</span></CardTitle>
              <CardDescription className="text-white/40 text-lg font-medium">Updating tactical parameters for unit {editingTask.id}</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0">
              <form onSubmit={handleEditSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Objective Title</Label>
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="h-14 bg-white/5 border-white/10 text-white rounded-2xl font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Status Protocol</Label>
                      <Select value={editStatus} onValueChange={setEditStatus}>
                        <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white rounded-2xl font-bold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-white/10 text-white rounded-2xl">
                          <SelectItem value="pending">Pending Sync</SelectItem>
                          <SelectItem value="completed">Mission Accomplished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Objective Intel</Label>
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="min-h-[180px] bg-white/5 border-white/10 text-white rounded-2xl resize-none py-4 leading-relaxed"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
                  <Button type="button" variant="ghost" onClick={() => setEditingTask(null)} className="text-white/40 h-14 px-8 rounded-2xl">Discard Changes</Button>
                  <Button type="submit" className="aurora-btn h-14 px-12 rounded-2xl font-black shadow-[0_20px_40px_-10px_rgba(6,182,212,0.3)]">Update Core Intel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="fixed bottom-10 right-10 z-50">
        <Chatbot />
      </div>

      {/* Floating User Anchor (Branding) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-2.5 rounded-full glass-card bg-black/40 border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.4em] pointer-events-none opacity-50">
        Nexus Control Panel v2.0
      </div>
    </div>
  );
}
