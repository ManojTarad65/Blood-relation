'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserPlus, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const memberSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    date_of_birth: z.string().optional(),
    date_of_death: z.string().optional(),
    place_of_birth: z.string().optional(),
    gender: z.enum(['male', 'female', 'other', 'unknown']).default('unknown'),
    blood_group: z.string().optional(),
    notes: z.string().optional()
    // Health history JSON and life events would use complex field arrays or external inputs
})

type MemberFormValues = z.infer<typeof memberSchema>

export default function MemberForm({ treeId }: { treeId: string }) {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MemberFormValues>({
        resolver: zodResolver(memberSchema),
        defaultValues: { gender: 'unknown' }
    })

    const onSubmit = async (data: MemberFormValues) => {
        // Mock submit - in reality this calls a server action to insert into family_members
        console.log("Submitting:", { ...data, treeId })
        await new Promise(r => setTimeout(r, 1000))
        alert("Member added successfully!")
        router.push(`/trees/${treeId}`)
    }

    return (
        <div className="max-w-3xl mx-auto w-full font-outfit text-slate-50 relative">

            <div className="flex items-center gap-4 mb-8">
                <Link
                    href={`/trees/${treeId}`}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                    <UserPlus className="text-indigo-400 w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Add Relative</h1>
                    <p className="text-sm text-slate-400">Add a new person to this family tree</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-10 flex flex-col gap-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">First Name <span className="text-red-400">*</span></label>
                        <input
                            {...register('first_name')}
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-600"
                        />
                        {errors.first_name && <span className="text-red-400 text-xs">{errors.first_name.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Last Name <span className="text-red-400">*</span></label>
                        <input
                            {...register('last_name')}
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-600"
                        />
                        {errors.last_name && <span className="text-red-400 text-xs">{errors.last_name.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Date of Birth</label>
                        <input
                            type="date"
                            {...register('date_of_birth')}
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all text-slate-300 [color-scheme:dark]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Date of Death</label>
                        <input
                            type="date"
                            {...register('date_of_death')}
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all text-slate-300 [color-scheme:dark]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Gender</label>
                        <select
                            {...register('gender')}
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all text-slate-300 appearance-none"
                        >
                            <option value="unknown">Unknown</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Blood Group</label>
                        <input
                            {...register('blood_group')}
                            placeholder="e.g. O+, A-, AB+"
                            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Place of Birth</label>
                    <input
                        {...register('place_of_birth')}
                        placeholder="City, Country"
                        className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-600"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">Notes & Bio</label>
                    <textarea
                        {...register('notes')}
                        rows={4}
                        placeholder="Additional public context..."
                        className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 outline-none transition-all resize-none placeholder:text-slate-600"
                    />
                </div>

                <div className="pt-4 border-t border-slate-800/50 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center gap-2"
                    >
                        {isSubmitting ? 'Saving...' : <><Save size={18} /> Save Member</>}
                    </button>
                </div>
            </form>

        </div>
    )
}
