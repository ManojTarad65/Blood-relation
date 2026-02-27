import { createTree } from '../actions'
import { TreePine } from 'lucide-react'

export default function NewTreePage() {
    return (
        <div className="p-8 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] font-outfit text-slate-50">

            <div className="glass-card p-10 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-500/20 rounded-xl">
                        <TreePine className="text-indigo-400 w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Initialize New Tree</h1>
                        <p className="text-sm text-slate-400">Start a new family legacy project</p>
                    </div>
                </div>

                <form action={createTree} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Tree Name</label>
                        <input
                            name="name"
                            required
                            placeholder="e.g. The Smith Family Legacy"
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Description (Optional)</label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="A brief description of this lineage..."
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all resize-none placeholder:text-slate-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex justify-center items-center gap-2"
                    >
                        Create Tree
                    </button>
                </form>
            </div>

        </div>
    )
}
