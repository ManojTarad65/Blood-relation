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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!message.trim() || isLoading) return;

        // Add user message to chat
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: message.trim()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setMessage(''); // Clear input
        setIsLoading(true); // Show typing indicator

        // Simulate bot response placeholder
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: "I'm currently running in mockup mode, but I am ready to analyze your genetic history and ancestral data!"
            };
            setMessages(prev => [...prev, botResponse]);
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div className="flex flex-col h-full bg-[#0F172A] p-6 max-h-screen">
            <div className="mb-6 flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">AI Ancestry Chatbot</h1>
                <p className="text-sm text-slate-400">Ask questions about your family lineage, inherited traits, or general genealogy.</p>
            </div>

            <div className="flex-1 flex flex-col bg-[#111827] border border-white/5 rounded-2xl shadow-xl relative overflow-hidden max-h-[600px]">
                {/* Chat History Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 opacity-50">
                            <Bot size={48} className="text-purple-500/50" />
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
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-zinc-800 text-slate-300 border border-white/10 mt-1">
                                        <Bot size={16} />
                                    </div>
                                )}

                                <div className={`px-5 py-3.5 text-sm whitespace-pre-wrap max-w-md shadow-md ${m.role === 'user'
                                        ? 'bg-purple-600 text-white rounded-xl rounded-tr-sm'
                                        : 'bg-zinc-800 text-white rounded-xl rounded-tl-sm border border-white/5'
                                    }`}>
                                    {m.content}
                                </div>

                                {m.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-purple-600/20 text-purple-400 border border-purple-500/30 mt-1">
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
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-zinc-800 text-slate-300 border border-white/10 mt-1">
                                <Bot size={16} />
                            </div>
                            <div className="bg-zinc-800 text-white border border-white/5 rounded-xl rounded-tl-sm px-5 py-4 text-sm flex items-center gap-1.5 shadow-md">
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0, ease: "easeInOut" }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2, ease: "easeInOut" }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4, ease: "easeInOut" }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} className="h-2 shrink-0" />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#111827] border-t border-white/5">
                    <form onSubmit={handleSubmit} className="flex gap-3 relative max-w-4xl mx-auto">
                        <input
                            className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-inner"
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
                            className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-5 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
                        >
                            {isLoading ? <Loader2 className="animate-spin text-white" size={20} /> : <Send className="text-white ml-0.5" size={20} />}
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    )
}
