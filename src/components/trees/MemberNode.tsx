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
                className="w-3 h-3 bg-white border-2 border-[#0B0F1A] shadow-sm"
            />

            <div className="w-56 bg-white/[0.03] border border-white/[0.08] rounded-2xl group overflow-hidden cursor-pointer relative hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300">

                {/* Header Photo */}
                <div className="h-16 w-full bg-white/[0.02] flex items-center justify-center relative border-b border-white/[0.08]">
                    {data.photo_url ? (
                        <img src={data.photo_url} alt={fullName} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mt-2 border border-white/10">
                            <Camera className="w-4 h-4 text-white/40" />
                        </div>
                    )}
                    {isDeceased && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                    )}
                </div>

                {/* Content */}
                <div className="p-4 relative">

                    <h3 className={`font-bold text-base leading-tight tracking-tight mb-1 truncate ${isDeceased ? 'text-white/40' : 'text-white group-hover:text-white transition-colors'}`}>
                        {fullName}
                    </h3>

                    <div className="text-[10px] font-bold text-white/40 mb-3 uppercase tracking-widest">
                        {birthYear} - {deathYear}
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                        {hasHealthFlags ? (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                <HeartPulse size={10} className="animate-pulse" /> Flags
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 text-white/50 border border-white/10 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                Normal
                            </span>
                        )}

                        {isDeceased && (
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/40 rounded text-[9px] font-bold uppercase tracking-widest shadow-sm">
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
                className="w-3 h-3 bg-white/40 border-2 border-[#0B0F1A] shadow-sm"
            />
        </>
    );
});

export default MemberNode;
