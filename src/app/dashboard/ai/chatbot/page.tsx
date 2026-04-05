'use client'

import { Send, User, Bot, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
    id: string;
    role: 'user' | 'bot';
    content: string;
}

export default function ChatbotPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'bot', content: 'Hello! I am your AI Ancestry Assistant. How can I help you explore your family lineage today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!message.trim() || isLoading) return;

        const userContent = message.trim();

        // Add user message to chat
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: userContent
        };

        setMessages(prev => [...prev, newUserMessage]);
        setMessage(''); // Clear input
        setIsLoading(true); // Show typing indicator

        // Call the Groq API Route
        try {
            const res = await fetch("/api/ai/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userContent })
            });

            if (!res.ok) {
                throw new Error("Failed to fetch from API");
            }

            const data = await res.json();

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: data.reply || "No response generated."
            };

            setMessages(prev => [...prev, botResponse]);

        } catch (error) {
            console.error(error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: "AI service temporarily unavailable. Please try again."
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-12 p-6 md:p-8">
            <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
                {/* Header Uniform System */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/5 shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">AI Ancestry Chatbot</h1>
                        <p className="text-sm text-white/50">Ask questions about your family lineage, inherited traits, or general genealogy.</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-white/[0.02] border border-white/[0.08] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
                    {/* Chat History Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 custom-scrollbar">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-white/40 gap-4 opacity-50">
                                <Bot size={48} className="text-white/20" />
                                <p>Start a conversation...</p>
                            </div>
                        )}

                        <AnimatePresence initial={false}>
                            {messages.map((m) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    key={m.id}
                                    className={`flex gap-4 w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {m.role === 'bot' && (
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/5 text-white/60 border border-white/10 mt-1">
                                            <Bot size={16} />
                                        </div>
                                    )}

                                    <div className={`px-5 py-3.5 text-sm whitespace-pre-wrap max-w-md shadow-md ${m.role === 'user'
                                        ? 'bg-white/10 text-white rounded-xl rounded-tr-sm border border-white/10 backdrop-blur-md'
                                        : 'bg-white/[0.04] text-white/90 rounded-xl rounded-tl-sm border border-white/5 backdrop-blur-md'
                                        }`}>
                                        {m.content}
                                    </div>

                                    {m.role === 'user' && (
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-white shadow-inner border border-white/20 mt-1">
                                            <User size={16} />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4 justify-start w-full"
                            >
                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/5 text-white/60 border border-white/10 mt-1">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-white/[0.04] text-white/60 border border-white/5 rounded-xl rounded-tl-sm px-5 py-3.5 text-sm flex items-center gap-1 shadow-md font-medium">
                                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                        Thinking...
                                    </motion.span>
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} className="h-2 shrink-0" />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/[0.01] border-t border-white/5 backdrop-blur-xl">
                        <form onSubmit={handleSubmit} className="flex gap-3 relative w-full">
                            <input
                                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                disabled={isLoading}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl px-5 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                {isLoading ? <Loader2 className="animate-spin text-white" size={20} /> : <Send className="text-white ml-0.5" size={20} />}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
