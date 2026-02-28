import React from 'react';
import { Handle, Position } from 'reactflow';
import { HeartPulse, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const MemberNode = React.memo(function MemberNode({ data }: { data: any }) {
    const hasHealthFlags = data.health?.flags?.length > 0;
    const isDeceased = data.death_date !== null && data.death_date !== undefined && data.death_date !== '';

    // Safety for missing dates
    const birthYear = data.birth_date ? new Date(data.birth_date).getFullYear() : 'Unknown';
    const deathYear = isDeceased ? new Date(data.death_date).getFullYear() : 'Present';

    const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown Member';

    return (
        <>
            {/* Top Handle for Parent connections */}
            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 bg-indigo-500 border-2 border-[#111827] shadow-sm"
            />

            <div className="w-56 bg-[#111827] border border-white/10 rounded-2xl group overflow-hidden cursor-pointer relative hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">

                {/* Subtle Top Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50 opacity-50" />

                {/* Header Photo */}
                <div className="h-16 w-full bg-[#0F172A] flex items-center justify-center relative border-b border-white/5">
                    {data.photo_url ? (
                        <img src={data.photo_url} alt={fullName} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center mt-2 border border-white/5">
                            <Camera className="w-4 h-4 text-slate-500" />
                        </div>
                    )}
                    {isDeceased && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                    )}
                </div>

                {/* Content */}
                <div className="p-4 relative">

                    <h3 className={`font-semibold text-base leading-tight tracking-tight mb-1 truncate ${isDeceased ? 'text-slate-400' : 'text-slate-50 group-hover:text-indigo-100 transition-colors'}`}>
                        {fullName}
                    </h3>

                    <div className="text-[10px] font-medium text-slate-500 mb-3 uppercase tracking-wider">
                        {birthYear} - {deathYear}
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                        {hasHealthFlags ? (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                <HeartPulse size={10} className="animate-pulse" /> Flags
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                Normal
                            </span>
                        )}

                        {isDeceased && (
                            <span className="px-2 py-0.5 bg-[#1e293b] border border-white/10 text-slate-400 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
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
                className="w-3 h-3 bg-slate-300 border-2 border-[#111827] shadow-sm"
            />
        </>
    );
});

export default MemberNode;
