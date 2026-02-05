'use client';

import { useAuth, authFetch } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { Loader2, MessageCircle, X, Maximize2, Minimize2, PanelLeft, Plus } from 'lucide-react';
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
        // If no current session selected, select the first one if available?
        // Actually better to have a "welcome" screen if no session selected.
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
        // Backend returns { client_secret, conversation_id }
        // Refresh list
        await fetchSessions();
        setCurrentConversationId(data.conversation_id);
        // If on mobile/small view, close sidebar after selection
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
    <div className={cn("fixed z-50 flex flex-col transition-all duration-300",
      isExpanded
        ? "inset-0 items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        : isOpen
          ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:items-end sm:gap-4" // Mobile: Fullscreen. Desktop: Bottom-right
          : "bottom-6 right-6 items-end gap-4"
    )}>

      {/* Main Container */}
      <div
        className={cn(
          "ease-in-out transition-all duration-300 bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden flex flex-col",
          isExpanded ? "w-full max-w-5xl h-[85vh] rounded-xl scale-100 opacity-100" :
            isOpen ? "w-full h-full sm:w-[380px] sm:h-[600px] rounded-none sm:rounded-xl scale-100 opacity-100" :
              "h-0 w-0 scale-95 opacity-0 overflow-hidden rounded-xl"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-3 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 text-white h-8 w-8"
              onClick={() => setShowSidebar(!showSidebar)}
              title="Toggle Sidebar"
            >
              <PanelLeft size={18} />
            </Button>
            <div className="flex items-center gap-2 ml-1">
              <span className="font-semibold tracking-wide">AI Assistant</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 text-white h-8 w-8"
              onClick={() => createNewSession()}
              title="New Chat"
            >
              <Plus size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 text-white h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/20 text-white h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden bg-zinc-900">
          {/* Sidebar (Collapsible) */}
          <div className={cn(
            "transition-all duration-300 overflow-hidden border-r border-white/5",
            showSidebar ? "w-64" : "w-0 opacity-0"
          )}>
            <ChatSidebar
              sessions={sessions}
              currentId={currentConversationId}
              onSelect={(id) => setCurrentConversationId(id)}
              onDelete={deleteSession}
              onNew={createNewSession}
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col relative bg-zinc-950">
            {!currentConversationId ? (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-4">
                <MessageCircle className="h-16 w-16 opacity-20" />
                <p>Select a conversation or start a new one.</p>
                <Button onClick={createNewSession} variant="outline" className="border-white/10 hover:bg-white/5 text-zinc-300">
                  Start New Chat
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
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95",
            isOpen ? "hidden sm:flex bg-red-500 hover:bg-red-600 rotate-90" : "flex bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 hover:shadow-violet-500/25"
          )}
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </Button>
      )}
    </div>
  );
}
