'use client';

import { Plus, MessageSquare, Trash2, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Session {
  id: number;
  title: string;
  updated_at: string;
}

interface ChatSidebarProps {
  sessions: Session[];
  currentId: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onNew: () => void;
}

export function ChatSidebar({ sessions, currentId, onSelect, onDelete, onNew }: ChatSidebarProps) {
  return (
    <div className="w-full flex flex-col h-full bg-transparent text-white">
      <div className="p-6 border-b border-white/5 space-y-4">
        <div className="flex items-center gap-2 opacity-30">
          <History size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Temporal Logs</span>
        </div>
        <Button
          onClick={onNew}
          className="w-full aurora-btn h-12 rounded-xl justify-start gap-3 px-4 font-bold tracking-tight shadow-lg shadow-cyan-500/10"
        >
          <Plus size={18} className="text-white" />
          <span>Initialize Logic</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {sessions.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <MessageSquare size={20} className="text-white/10" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 leading-relaxed">No active historical streams detected.</p>
            </div>
          )}

          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group relative flex items-center justify-between rounded-[1.25rem] px-4 py-3.5 transition-all duration-300 cursor-pointer overflow-hidden",
                currentId === session.id
                  ? "bg-white/[0.05] border border-white/10 shadow-xl"
                  : "text-white/40 hover:bg-white/[0.02] hover:text-white border border-transparent"
              )}
              onClick={() => onSelect(session.id)}
            >
              {currentId === session.id && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-cyan-500 rounded-r-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              )}

              <div className="flex items-center gap-4 overflow-hidden">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                  currentId === session.id
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                    : "bg-white/[0.02] border-white/5 text-white/20 group-hover:text-white/40"
                )}>
                  <MessageSquare size={18} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className={cn(
                    "truncate font-bold tracking-tight text-sm",
                    currentId === session.id ? "text-white" : "text-white/60"
                  )}>
                    {session.title || "Untitled Fragment"}
                  </span>
                  <span className="text-[10px] font-medium opacity-30 truncate mt-0.5">
                    {formatDistanceToNow(new Date(session.updated_at), { addSuffix: true })}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(session.id);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
