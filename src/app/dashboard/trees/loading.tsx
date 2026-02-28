export default function TreesLoading() {
    return (
        <div className="w-full h-full min-h-screen font-outfit p-8 animate-pulse text-slate-50 relative pb-20 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-10 w-full">
                <div className="flex flex-col gap-3">
                    <div className="h-8 w-64 bg-[#111827] rounded-xl border border-white/5"></div>
                    <div className="h-4 w-96 bg-[#0F172A] rounded border border-white/5"></div>
                </div>
                <div className="h-12 w-32 bg-[#111827] rounded-xl border border-white/5 hidden md:block"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-[#111827] border border-white/5 p-6 rounded-3xl h-64 flex flex-col">
                        <div className="h-6 w-48 bg-[#0F172A] rounded-lg mb-4"></div>
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="h-4 w-full bg-[#0F172A] rounded-md"></div>
                            <div className="h-4 w-3/4 bg-[#0F172A] rounded-md"></div>
                        </div>
                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                            <div className="h-4 w-24 bg-[#0F172A] rounded-md"></div>
                            <div className="h-8 w-24 bg-[#0F172A] rounded-xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
