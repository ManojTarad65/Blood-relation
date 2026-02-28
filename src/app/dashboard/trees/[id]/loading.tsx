import { TreeDeciduous } from 'lucide-react'

export default function TreeViewerLoading() {
    return (
        <div className="w-full h-[calc(100vh-64px)] relative bg-[#0B0F1A] overflow-hidden flex items-center justify-center">
            {/* Background Grid Illusion */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10" />

            {/* Central Loading Pulse */}
            <div className="flex flex-col items-center gap-6 z-10 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center p-4">
                    <TreeDeciduous size={32} className="text-indigo-400 mb-1 animate-bounce" />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="h-6 w-48 bg-[#111827] rounded-md border border-white/5"></div>
                    <div className="h-4 w-64 bg-[#0F172A] rounded-md border border-white/5"></div>
                </div>

                {/* Simulated Nodes Structure */}
                <div className="relative w-full max-w-lg h-64 mt-10 opacity-50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#111827] rounded-xl border border-white/10"></div>
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-indigo-500/30"></div>

                    <div className="absolute top-28 left-1/4 w-32 h-16 bg-[#111827] rounded-xl border border-white/10"></div>
                    <div className="absolute top-28 right-1/4 w-32 h-16 bg-[#111827] rounded-xl border border-white/10"></div>

                    <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[50%] h-0.5 bg-indigo-500/30"></div>
                </div>
            </div>
        </div>
    )
}
