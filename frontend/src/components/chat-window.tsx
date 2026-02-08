'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User as UserIcon, Bot, Loader2, Sparkles, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { authFetch, useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  conversationId: number;
  className?: string;
}

export function ChatWindow({ conversationId, className }: ChatWindowProps) {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsFetchingHistory(true);
      try {
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/session/${conversationId}`,
          { method: 'GET' },
          token
        );
        if (response.ok) {
          const data = await response.json();
          if (data.messages) {
            setMessages(data.messages);
          } else {
            setMessages([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setIsFetchingHistory(false);
      }
    };

    if (conversationId) {
      fetchHistory();
    }
  }, [conversationId, token]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isFetchingHistory]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/message`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            conversation_id: conversationId,
          }),
        },
        token
      );

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to send message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-transparent text-white", className)}>
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-8 pb-4">
          {isFetchingHistory ? (
            <div className="flex flex-col justify-center items-center h-full mt-20 gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse rounded-full" />
                <Loader2 className="h-10 w-10 animate-spin text-blue-400 relative" />
              </div>
              <p className="text-white/20 text-xs font-black uppercase tracking-[0.2em]">Syncing History</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-white/20 mt-20 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 shadow-2xl">
                <Sparkles className="h-12 w-12 opacity-30" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-black tracking-tighter uppercase italic">Neutral State</p>
                <p className="text-xs font-bold leading-relaxed max-w-[200px] mx-auto opacity-50">Initiate a query to begin processing.</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4 text-sm animate-in fade-in slide-in-from-bottom-2 duration-500",
                  msg.role === 'user' ? "ml-auto flex-row-reverse max-w-[90%]" : "mr-auto flex-row max-w-[90%]"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-xl transition-transform hover:scale-110",
                    msg.role === 'user'
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                      : "bg-white/5 text-cyan-400 backdrop-blur-xl"
                  )}
                >
                  {msg.role === 'user' ? <UserIcon size={20} /> : <Bot size={20} />}
                </div>

                <div className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "rounded-[1.5rem] px-5 py-3.5 shadow-2xl leading-relaxed text-[15px] font-medium transition-all hover:bg-white/[0.05]",
                      msg.role === 'user'
                        ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-100 rounded-tr-none"
                        : "bg-white/[0.03] border border-white/10 text-white/90 rounded-tl-none backdrop-blur-md"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-20 px-1">
                    {msg.role === 'user' ? 'Client' : 'Assistant'}
                  </span>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex items-start gap-4 text-sm max-w-[90%] mr-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="w-10 h-10 rounded-2xl bg-white/5 text-cyan-400 flex items-center justify-center shrink-0 border border-white/5 shadow-xl backdrop-blur-xl">
                <Bot size={20} />
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-[1.5rem] rounded-tl-none px-6 py-4 backdrop-blur-md">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-white/5 bg-white/[0.01] backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-4 items-end"
        >
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur" />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query neural network..."
              disabled={isLoading}
              className="relative flex-1 bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 h-14 px-6 rounded-2xl focus-visible:ring-0 focus-visible:border-white/20 transition-all font-medium"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className={cn(
              "h-14 w-14 rounded-2xl shadow-xl transition-all duration-300",
              input.trim() ? "aurora-btn text-white scale-100" : "bg-white/5 text-white/20 scale-95"
            )}
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
