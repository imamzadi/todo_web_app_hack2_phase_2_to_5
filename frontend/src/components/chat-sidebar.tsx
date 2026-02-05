'use client';

import { Plus, MessageSquare, Trash2 } from 'lucide-react';
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
    <div className="w-64 border-r bg-muted/30 flex flex-col h-full bg-black/90 text-white border-white/10">
      <div className="p-4 border-b border-white/10">
        <Button 
            onClick={onNew} 
            className="w-full bg-violet-600 hover:bg-violet-700 text-white justify-start gap-2"
        >
            <Plus size={16} /> New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
            {sessions.length === 0 && (
                <div className="text-center text-zinc-500 text-sm mt-8 px-4">
                    No history. Start a new chat!
                </div>
            )}
            
            {sessions.map((session) => (
            <div
                key={session.id}
                className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
                currentId === session.id 
                    ? "bg-violet-600/20 text-white" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => onSelect(session.id)}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare size={16} className="shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                        <span className="truncate font-medium">{session.title || "New Chat"}</span>
                        <span className="text-xs text-zinc-500 truncate">
                            {formatDistanceToNow(new Date(session.updated_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>
                
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 hover:bg-transparent"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(session.id);
                    }}
                >
                    <Trash2 size={14} />
                </Button>
            </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
