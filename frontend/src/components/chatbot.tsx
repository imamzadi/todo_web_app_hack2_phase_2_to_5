'use client';

import { useAuth, authFetch } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { Loader2, MessageCircle, X, Maximize2, Minimize2, PanelLeft, Plus, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from './ui/card';
import { ChatWindow } from './chat-window';
import { ChatSidebar } from './chat-sidebar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Session {
  id: number;
  title: string;
  updated_at: string;
}

export function Chatbot() {
  const { token } = useAuth();

  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Data State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);

  // Fetch sessions when chat opens
  useEffect(() => {
    if (isOpen && token) {
      fetchSessions();
    }
  }, [isOpen, token]);

  const fetchSessions = async () => {
    setIsLoadingSessions(true);
    try {
      const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/sessions`, { method: 'GET' }, token);
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error("Failed to fetch sessions", error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const createNewSession = async () => {
    try {
      const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/session`, { method: 'POST' }, token);
      if (response.ok) {
        const data = await response.json();
        await fetchSessions();
        setCurrentConversationId(data.conversation_id);
        if (!isExpanded) setShowSidebar(false);
      }
    } catch (error) {
      toast.error("Failed to create new chat");
    }
  };

  const deleteSession = async (id: number) => {
    try {
      const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/session/${id}`, { method: 'DELETE' }, token);
      if (response.ok) {
        setSessions(prev => prev.filter(s => s.id !== id));
        if (currentConversationId === id) {
          setCurrentConversationId(null);
        }
        toast.success("Conversation deleted");
      }
    } catch (error) {
      toast.error("Failed to delete conversation");
    }
  };

  return (
    <div className={cn("fixed z-50 flex flex-col transition-all duration-500",
      isExpanded
        ? "inset-0 items-center justify-center bg-black/80 backdrop-blur-xl p-4"
        : isOpen
          ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:items-end sm:gap-4"
          : "bottom-6 right-6 items-end gap-4"
    )}>

      {/* Main Container */}
      <div
        className={cn(
          "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col glass-card border-white/5 bg-white/[0.03] backdrop-blur-[40px] border-white/5",
          isExpanded ? "w-full max-w-6xl h-[85vh] rounded-[2.5rem] scale-100 opacity-100" :
            isOpen ? "w-full h-full sm:w-[420px] sm:h-[680px] rounded-none sm:rounded-[2rem] scale-100 opacity-100" :
              "h-0 w-0 scale-90 opacity-0 overflow-hidden rounded-[2rem]"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 p-4 flex justify-between items-center text-white shrink-0 border-b border-white/5 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-50" />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/5 text-white/40 hover:text-cyan-400 h-9 w-9 rounded-xl transition-all"
              onClick={() => setShowSidebar(!showSidebar)}
              title="Toggle Sidebar"
            >
              <PanelLeft size={20} />
            </Button>
            <div className="flex flex-col ml-1">
              <span className="font-black tracking-tighter text-lg leading-none">AURA <span className="aurora-text uppercase">Pilot</span></span>
              <span className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mt-1">Quantum Interface</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/5 text-white/40 hover:text-purple-400 h-9 w-9 rounded-xl transition-all"
              onClick={() => createNewSession()}
              title="New Chat"
            >
              <Plus size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/5 text-white/40 hover:text-blue-400 h-9 w-9 rounded-xl transition-all hidden sm:flex"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/5 text-white/40 hover:text-red-400 h-9 w-9 rounded-xl transition-all"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar (Collapsible) */}
          <div className={cn(
            "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden border-r border-white/5 bg-white/[0.01]",
            showSidebar ? "w-72" : "w-0 opacity-0"
          )}>
            <ChatSidebar
              sessions={sessions}
              currentId={currentConversationId}
              onSelect={(id) => {
                setCurrentConversationId(id);
                if (!isExpanded) setShowSidebar(false);
              }}
              onDelete={deleteSession}
              onNew={createNewSession}
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col relative">
            {!currentConversationId ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-8 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] animate-pulse rounded-full" />
                  <div className="relative p-6 rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl">
                    <Zap className="h-12 w-12 text-cyan-400" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic">Offline Session</h3>
                  <p className="text-white/30 text-sm font-medium max-w-xs mx-auto leading-relaxed">Select a historical stream or initialize a new neural connection.</p>
                </div>
                <Button onClick={createNewSession} className="aurora-btn h-12 px-8 rounded-xl font-bold tracking-tight shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)]">
                  Initialize Sync
                </Button>
              </div>
            ) : (
              <ChatWindow conversationId={currentConversationId} className="h-full" />
            )}
          </div>
        </div>
      </div>

      {/* Floating Toggle Button (Only visible when NOT expanded) */}
      {!isExpanded && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={cn(
            "h-16 w-16 rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(139,92,246,0.3)] transition-all duration-500 hover:scale-110 active:scale-90 group",
            isOpen ? "hidden sm:flex bg-red-500 hover:bg-red-600 rotate-90" : "flex aurora-btn border-white/10"
          )}
        >
          {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageCircle className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />}
        </Button>
      )}
    </div>
  );
}
