export default function DashboardLoading() {
    return (
        <div className="w-full h-full min-h-screen font-outfit p-8 animate-pulse text-slate-50 relative pb-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 w-full max-w-7xl mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="h-8 w-48 bg-[#111827] rounded-xl border border-white/5"></div>
                    <div className="h-4 w-64 bg-[#0F172A] rounded border border-white/5"></div>
                </div>
                <div className="w-12 h-12 bg-[#111827] rounded-full border border-white/5 hidden md:block"></div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mb-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-28 bg-[#111827] border border-white/5 rounded-2xl"></div>
                ))}
            </div>

            {/* Main Stats Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12 h-[350px]">
                <div className="h-full bg-[#111827] border border-white/5 rounded-3xl p-8 flex flex-col gap-6">
                    <div className="h-6 w-32 bg-[#0F172A] rounded-lg"></div>
                    <div className="h-40 w-full bg-[#0F172A] rounded-2xl"></div>
                    <div className="h-10 w-full bg-[#0F172A] rounded-2xl mt-auto"></div>
                </div>
                <div className="h-full bg-[#111827] border border-white/5 rounded-3xl p-8 flex flex-col gap-6">
                    <div className="h-6 w-32 bg-[#0F172A] rounded-lg"></div>
                    <div className="flex-1 flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 w-full bg-[#0F172A] rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
