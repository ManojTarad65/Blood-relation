import { ImageIcon } from 'lucide-react'

export default function MemoryGalleryLoading() {
    return (
        <div className="w-full h-full min-h-screen font-outfit p-8 animate-pulse text-slate-50 relative pb-20 max-w-7xl mx-auto">

            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-10 w-full">
                <div className="flex flex-col gap-3">
                    <div className="h-8 w-64 bg-[#111827] rounded-xl border border-white/5"></div>
                    <div className="h-4 w-96 bg-[#0F172A] rounded border border-white/5"></div>
                </div>
                <div className="h-12 w-32 bg-[#111827] rounded-xl border border-white/5 hidden md:block"></div>
            </div>

            {/* Masonry Grid Skeleton Layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

                {/* Simulated Cards with varying heights for masonry look */}
                <div className="w-full h-64 bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-end">
                    <div className="h-5 w-48 bg-[#0F172A] rounded-md mb-2"></div>
                    <div className="h-3 w-32 bg-[#0F172A] rounded-sm"></div>
                </div>

                <div className="w-full h-96 bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center">
                    <ImageIcon size={48} className="text-white/5 mb-4" />
                    <div className="h-5 w-32 bg-[#0F172A] rounded-md mb-2"></div>
                </div>

                <div className="w-full h-72 bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-end">
                    <div className="h-5 w-56 bg-[#0F172A] rounded-md mb-2"></div>
                    <div className="h-3 w-40 bg-[#0F172A] rounded-sm"></div>
                </div>

                <div className="w-full h-56 bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-end">
                    <div className="h-5 w-32 bg-[#0F172A] rounded-md mb-2"></div>
                    <div className="h-3 w-24 bg-[#0F172A] rounded-sm"></div>
                </div>

                <div className="w-full h-80 bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center">
                    <ImageIcon size={48} className="text-white/5 mb-4" />
                </div>

                <div className="w-full h-64 bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-end">
                    <div className="h-5 w-48 bg-[#0F172A] rounded-md mb-2"></div>
                    <div className="h-3 w-32 bg-[#0F172A] rounded-sm"></div>
                </div>
            </div>
        </div>
    )
}
