"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, Plus, CheckCircle2, Circle, Trash2, Edit2, Calendar } from 'lucide-react';
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

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Dashboard
            </h1>
            <p className="text-slate-100 mt-1 text-sm">
              Welcome back, {user?.username || 'User'}!
            </p>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/10">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm font-medium text-slate-300">Filter:</span>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px] bg-slate-900/50 border-white/10 text-slate-200">
                <SelectValue placeholder="All Tasks" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-slate-200">
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4 mr-2" /> New Task
          </Button>
        </div>

        {/* Add Task Form (Collapsible) */}
        {isAddingTask && (
          <div className="mb-8 animate-in slide-in-from-top-4 fade-in duration-300">
            <Card className="border-0 bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              <CardHeader>
                <CardTitle className="text-xl text-white">Create New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTask} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="newTaskTitle" className="text-slate-300">Title</Label>
                    <Input
                      id="newTaskTitle"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      required
                      className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600"
                      placeholder="What needs to be done?"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newTaskDescription" className="text-slate-300">Description</Label>
                    <Textarea
                      id="newTaskDescription"
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      rows={3}
                      className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 resize-none"
                      placeholder="Add some details..."
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button type="button" variant="ghost" onClick={() => setIsAddingTask(false)} className="text-slate-400 hover:text-white">Cancel</Button>
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white">Save Task</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Task Dialog/Form */}
        {editingTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-lg border-white/10 bg-slate-900 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Edit Task</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEditSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-slate-300">Title</Label>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-slate-800 border-white/10 text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-slate-300">Description</Label>
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-slate-800 border-white/10 text-white resize-none"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-slate-300">Status</Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/10 text-white">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button type="button" variant="ghost" onClick={() => setEditingTask(null)} className="text-slate-400">Cancel</Button>
                    <Button type="submit" className="bg-indigo-600 text-white">Update</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 && !loading && (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-800/50 mb-4">
                <Calendar className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-medium text-slate-300">No tasks found</h3>
              <p className="text-slate-500 mt-2">Get started by creating a new task above.</p>
            </div>
          )}

          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`group relative border-0 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden ${task.status === 'completed' ? 'opacity-75 hover:opacity-100' : ''}`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`} />

              <CardHeader className="pb-2 pl-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 pr-4">
                    <CardTitle className={`text-lg font-semibold leading-tight ${task.status === 'completed' ? 'text-slate-400 line-through decoration-slate-600' : 'text-slate-100'}`}>
                      {task.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${task.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {task.status}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(task.create_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleStatus(task)}
                    className={`rounded-full h-8 w-8 transition-colors ${task.status === 'completed' ? 'text-green-500 hover:text-green-400 hover:bg-green-500/20' : 'text-slate-500 hover:text-green-500 hover:bg-green-500/20'}`}
                    title={task.status === 'completed' ? "Mark as pending" : "Mark as completed"}
                  >
                    {task.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pl-6 pb-12">
                <p className="text-sm text-slate-400 line-clamp-3">
                  {task.description || "No description provided."}
                </p>
              </CardContent>

              <div className="absolute bottom-0 left-0 w-full p-3 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent pl-6">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditClick(task)}
                  className="h-8 text-slate-300 hover:text-white hover:bg-white/20"
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteTask(task.id)}
                  className="h-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <Chatbot />
      </div>
    </div>
  );
}
