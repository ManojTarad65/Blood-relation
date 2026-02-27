import { Handle, Position } from 'reactflow';
import { HeartPulse, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MemberNode({ data }: { data: any }) {
    const hasHealthFlags = data.health?.flags?.length > 0;
    const isDeceased = data.death_date !== null && data.death_date !== undefined && data.death_date !== '';

    return (
        <>
            {/* Top Handle for Parent connections */}
            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 bg-indigo-500 border-2 border-[#0B0F1A] shadow-[0_0_10px_rgba(99,102,241,0.8)]"
            />

            <div className="w-56 glass-card border border-white/10 group overflow-hidden cursor-pointer relative bg-[#0B0F1A]/90 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300">

                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-[20px] rounded-full group-hover:bg-indigo-500/20 -z-10 transition-colors" />

                {/* Header Photo */}
                <div className="h-20 w-full bg-gradient-to-br from-indigo-900/50 to-slate-900 flex items-center justify-center relative border-b border-white/5">
                    {data.photo_url ? (
                        <img src={data.photo_url} alt={data.name} className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" />
                    ) : (
                        <Camera className="w-6 h-6 text-indigo-500/50" />
                    )}
                    {isDeceased && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                    )}
                </div>

                {/* Content */}
                <div className="p-4 relative">

                    <h3 className={`font-bold text-lg leading-tight tracking-tight mb-1 truncate ${isDeceased ? 'text-slate-400' : 'text-white group-hover:text-indigo-300 transition-colors'}`}>
                        {data.name}
                    </h3>

                    <div className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest">
                        {new Date(data.birth_date).getFullYear()} - {isDeceased ? new Date(data.death_date).getFullYear() : 'Present'}
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                        {hasHealthFlags ? (
                            <span className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-[inset_0_1px_0_0_rgba(245,158,11,0.2)]">
                                <HeartPulse size={12} className="animate-pulse" /> Anomalies
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2)]">
                                Normal
                            </span>
                        )}

                        {isDeceased && (
                            <span className="px-2 py-1 bg-white/5 border border-white/10 text-slate-400 rounded-md text-[10px] font-bold uppercase tracking-widest">
                                Deceased
                            </span>
                        )}
                    </div>
                </div>

            </div>

            {/* Bottom Handle for Children connections */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 bg-cyan-500 border-2 border-[#0B0F1A] shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
        </>
    );
}
