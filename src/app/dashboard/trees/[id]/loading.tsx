import { TreeDeciduous } from 'lucide-react'

export default function TreeViewerLoading() {
    return (
        <div className="w-full h-[calc(100vh-64px)] relative bg-transparent overflow-hidden flex items-center justify-center">

            <div className="flex flex-col items-center gap-6 z-10 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center p-4">
                    <TreeDeciduous size={32} className="text-white/40 mb-1" />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="h-6 w-48 bg-white/10 rounded-md"></div>
                    <div className="h-4 w-64 bg-white/5 rounded-md"></div>
                </div>

                <div className="relative w-full max-w-lg h-64 mt-10 opacity-30">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-white/[0.05] rounded-xl border border-white/10"></div>
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20"></div>

                    <div className="absolute top-28 left-1/4 w-32 h-16 bg-white/[0.05] rounded-xl border border-white/10"></div>
                    <div className="absolute top-28 right-1/4 w-32 h-16 bg-white/[0.05] rounded-xl border border-white/10"></div>

                    <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[50%] h-px bg-white/20"></div>
                </div>
            </div>
        </div>
    )
}
