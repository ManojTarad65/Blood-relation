export default function TreesLoading() {
    return (
        <div className="w-full h-full min-h-screen pb-12 p-6 md:p-8 animate-pulse relative">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                <div className="flex justify-between items-end w-full mb-2 pb-6 border-b border-white/5">
                    <div className="flex flex-col gap-3">
                        <div className="h-8 w-64 bg-white/[0.05] rounded-xl"></div>
                        <div className="h-4 w-96 bg-white/[0.02] rounded"></div>
                    </div>
                    <div className="h-10 w-32 bg-white/[0.05] rounded-xl hidden md:block"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl h-48 flex flex-col justify-between">
                            <div className="flex justify-between">
                                <div className="h-10 w-10 bg-white/5 rounded-full mb-4"></div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-white/5 rounded-full"></div>
                                    <div className="h-8 w-8 bg-white/5 rounded-full"></div>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-3">
                                <div className="h-5 w-48 bg-white/10 rounded-md"></div>
                                <div className="h-3 w-3/4 bg-white/5 rounded-md"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
