export default function DashboardLoading() {
    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center text-white/40 flex-col gap-4 bg-transparent pb-20">
            <div className="w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-full animate-spin"></div>
            <span className="text-xs uppercase tracking-widest font-semibold">Loading...</span>
        </div>
    )
}
