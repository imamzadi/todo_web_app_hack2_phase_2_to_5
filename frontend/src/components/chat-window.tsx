'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User as UserIcon, Bot, Loader2 } from 'lucide-react';
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
  className?: string; // For flexibility
}

export function ChatWindow({ conversationId, className }: ChatWindowProps) {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch history when conversationId changes
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
          // Map backend messages to frontend format
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


  // Auto-scroll to bottom
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
    <div className={cn("flex flex-col h-full bg-zinc-950 text-white", className)}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {isFetchingHistory ? (
            <div className="flex justify-center items-center h-full mt-10">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-zinc-500 text-sm mt-20">
              <Bot className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Start a conversation with your AI Assistant.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4 text-sm max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/5",
                    msg.role === 'user'
                      ? "bg-violet-600 text-white"
                      : "bg-zinc-800 text-zinc-300"
                  )}
                >
                  {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                </div>

                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed",
                      msg.role === 'user'
                        ? "bg-violet-600 text-white rounded-tr-sm"
                        : "bg-zinc-900 border border-white/10 text-zinc-200 rounded-tl-sm"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex items-start gap-4 text-sm max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 border border-white/5">
                <Bot size={16} />
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10 bg-zinc-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-3 relative"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 focus-visible:border-violet-600"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
