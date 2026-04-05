'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserPlus, Save, ArrowLeft, Loader2, AlertCircle, HeartPulse, Stethoscope, Coffee, Briefcase, MapPin, Info } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

const memberSchema = z.object({
    // Basic Identity
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    parent_id: z.string().nullable().optional(),
    birth_date: z.string().optional(),
    death_date: z.string().optional(),
    place_of_birth: z.string().optional(),
    gender: z.enum(['male', 'female', 'other', 'unknown']).default('unknown'),
    profile_photo_url: z.string().optional(),

    // Contact Info
    phone_number: z.string().optional(),
    email: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),

    // Professional
    education: z.string().optional(),
    profession: z.string().optional(),
    workplace: z.string().optional(),
    skills: z.string().optional(),

    // Health Info
    blood_group: z.string().optional(),
    height_cm: z.string().optional(),
    weight_kg: z.string().optional(),
    allergies: z.string().optional(),

    // Medical History
    diabetes: z.boolean().default(false),
    heart_disease: z.boolean().default(false),
    cancer: z.boolean().default(false),
    blood_pressure: z.boolean().default(false),
    thyroid: z.boolean().default(false),

    // Lifestyle
    smoking: z.boolean().default(false),
    alcohol: z.boolean().default(false),
    exercise: z.boolean().default(false),

    // Other
    bio: z.string().optional()
})

type MemberFormValues = z.infer<typeof memberSchema>

export default function MemberForm({ treeId }: { treeId: string }) {
    const router = useRouter()
    const supabase = createClient()
    const [existingMembers, setExistingMembers] = useState<any[]>([])
    const [globalError, setGlobalError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MemberFormValues>({
        resolver: zodResolver(memberSchema as any), 
        defaultValues: {
            gender: 'unknown',
            parent_id: 'null',
            diabetes: false,
            heart_disease: false,
            cancer: false,
            blood_pressure: false,
            thyroid: false,
            smoking: false,
            alcohol: false,
            exercise: false
        }
    })

    useEffect(() => {
        async function fetchMembers() {
            const { data } = await supabase
                .from('family_members')
                .select('id, first_name, last_name')
                .eq('tree_id', treeId)

            if (data) {
                setExistingMembers(data)
            }
        }
        fetchMembers()
    }, [treeId, supabase])

    const onSubmit = async (data: any) => {
        setGlobalError(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Unauthorized")

            // Format parent id if empty string
            const pId = (data.parent_id && data.parent_id !== 'null' && data.parent_id !== '') ? data.parent_id : null;

            const { error } = await supabase.from('family_members').insert({
                tree_id: treeId,
                parent_id: pId,

                // Basic Identity
                first_name: data.first_name,
                last_name: data.last_name,
                birth_date: data.birth_date || null,
                death_date: data.death_date || null,
                gender: data.gender,
                place_of_birth: data.place_of_birth || null,
                profile_photo_url: data.profile_photo_url || null,

                // Contact Info
                phone_number: data.phone_number || null,
                email: data.email || null,
                city: data.city || null,
                country: data.country || null,
                address: data.address || null,

                // Professional Info
                education: data.education || null,
                profession: data.profession || null,
                workplace: data.workplace || null,
                skills: data.skills || null,

                // Health Info
                blood_group: data.blood_group || null,
                height_cm: data.height_cm ? Number(data.height_cm) : null,
                weight_kg: data.weight_kg ? Number(data.weight_kg) : null,
                allergies: data.allergies || null,

                // Medical History
                diabetes: !!data.diabetes,
                heart_disease: !!data.heart_disease,
                cancer: !!data.cancer,
                blood_pressure: !!data.blood_pressure,
                thyroid: !!data.thyroid,

                // Lifestyle
                smoking: !!data.smoking,
                alcohol: !!data.alcohol,
                exercise: !!data.exercise,

                // Other
                bio: data.bio || null,
            })

            if (error) throw error

            router.push(`/dashboard/trees/${treeId}`)
            router.refresh() 

        } catch (err: any) {
            console.error("Submission error:", err)
            setGlobalError(err.message || 'Failed to add the family member.')
        }
    }

    const InputBlock = ({ label, name, type = 'text', placeholder = '', registerFn, error }: any) => (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/50 tracking-wide uppercase text-[10px] ml-1">{label}</label>
            <input
                type={type}
                {...registerFn(name)}
                placeholder={placeholder}
                className="px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:bg-white/[0.05] focus:border-white/30 outline-none transition-all placeholder:text-white/20 text-white font-medium [color-scheme:dark]"
            />
            {error && <span className="text-red-400 text-xs ml-1">{error}</span>}
        </div>
    )

    const CheckboxBlock = ({ label, name, registerFn }: any) => (
        <label className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl cursor-pointer hover:bg-white/[0.05] transition-colors group select-none">
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    {...registerFn(name)}
                    className="peer appearance-none w-5 h-5 border border-white/20 rounded cursor-pointer checked:bg-white checked:border-white transition-colors"
                />
                <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">{label}</span>
        </label>
    )

    return (
        <div className="max-w-4xl mx-auto w-full font-outfit relative">

            <div className="flex items-center gap-4 mb-8">
                <Link
                    href={`/dashboard/trees/${treeId}`}
                    className="p-2.5 hover:bg-white/[0.04] border border-transparent hover:border-white/10 rounded-xl transition-all text-white/40 hover:text-white"
                >
                    <ArrowLeft size={18} />
                </Link>
                <div className="p-3 bg-white/5 border border-white/10 text-white/60 rounded-xl">
                    <UserPlus className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Add Relative</h1>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Expand your family tree with a new detailed entry</p>
                </div>
            </div>

            {globalError && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-6">
                    <AlertCircle size={18} className="shrink-0" />
                    <p>{globalError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 md:p-10 flex flex-col gap-10 shadow-lg">

                {/* --- BASIC IDENTITY SECTION --- */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                        <Info size={18} className="text-white/40" />
                        <h2 className="text-lg font-bold text-white tracking-tight">Basic Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputBlock label={<span>First Name <span className="text-red-400">*</span></span>} name="first_name" registerFn={register} error={errors.first_name?.message} />
                        <InputBlock label={<span>Last Name <span className="text-red-400">*</span></span>} name="last_name" registerFn={register} error={errors.last_name?.message} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/50 tracking-wide uppercase text-[10px] ml-1">Relative Parent in Tree (Optional)</label>
                        <select
                            {...register('parent_id')}
                            className="px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:bg-white/[0.05] focus:border-white/30 outline-none transition-all text-white font-medium shadow-sm custom-select-arrow"
                        >
                            <option value="null">No Parent (Sets as a Root Node)</option>
                            {existingMembers.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.first_name} {m.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputBlock type="date" label="Date of Birth" name="birth_date" registerFn={register} />
                        <InputBlock type="date" label="Date of Death" name="death_date" registerFn={register} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-white/50 tracking-wide uppercase text-[10px] ml-1">Gender</label>
                            <select
                                {...register('gender')}
                                className="px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:bg-white/[0.05] focus:border-white/30 outline-none transition-all text-white font-medium shadow-sm custom-select-arrow"
                            >
                                <option value="unknown">Unknown</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <InputBlock label="Place of Birth" name="place_of_birth" placeholder="City, Country" registerFn={register} />
                    </div>

                    <InputBlock label="Profile Photo URL" name="profile_photo_url" placeholder="https://..." registerFn={register} />
                </section>

                {/* --- CONTACT INFO SECTION --- */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                        <MapPin size={18} className="text-white/40" />
                        <h2 className="text-lg font-bold text-white tracking-tight">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputBlock type="tel" label="Phone Number" name="phone_number" placeholder="+1..." registerFn={register} />
                        <InputBlock type="email" label="Email Address" name="email" placeholder="email@example.com" registerFn={register} />
                        <InputBlock label="City" name="city" placeholder="e.g. London" registerFn={register} />
                        <InputBlock label="Country" name="country" placeholder="e.g. United Kingdom" registerFn={register} />
                    </div>

                    <InputBlock label="Full Physical Address" name="address" placeholder="123 Street Name..." registerFn={register} />
                </section>

                {/* --- PROFESSIONAL SECTION --- */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                        <Briefcase size={18} className="text-white/40" />
                        <h2 className="text-lg font-bold text-white tracking-tight">Professional Background</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputBlock label="Education Level / Degree" name="education" placeholder="e.g. BSc Computer Science" registerFn={register} />
                        <InputBlock label="Profession / Job Title" name="profession" placeholder="e.g. Software Engineer" registerFn={register} />
                        <InputBlock label="Primary Workplace" name="workplace" placeholder="e.g. Google" registerFn={register} />
                        <InputBlock label="Notable Skills" name="skills" placeholder="e.g. Engineering, Management..." registerFn={register} />
                    </div>
                </section>

                {/* --- HEALTH INFO SECTION --- */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                        <HeartPulse size={18} className="text-white/40" />
                        <h2 className="text-lg font-bold text-white tracking-tight">Core Health Metrics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputBlock label="Blood Group" name="blood_group" placeholder="e.g. O+, A-" registerFn={register} />
                        <InputBlock type="number" label="Height (cm)" name="height_cm" placeholder="e.g. 175" registerFn={register} />
                        <InputBlock type="number" label="Weight (kg)" name="weight_kg" placeholder="e.g. 70" registerFn={register} />
                    </div>

                    <InputBlock label="Known Allergies" name="allergies" placeholder="e.g. Peanuts, Penicillin..." registerFn={register} />
                </section>

                {/* --- MEDICAL HISTORY (BOOLEANS) --- */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                        <Stethoscope size={18} className="text-white/40" />
                        <h2 className="text-lg font-bold text-white tracking-tight">Medical History Flags</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <CheckboxBlock label="Diabetes" name="diabetes" registerFn={register} />
                        <CheckboxBlock label="Heart Disease / Issues" name="heart_disease" registerFn={register} />
                        <CheckboxBlock label="Cancer / Tumors" name="cancer" registerFn={register} />
                        <CheckboxBlock label="Abnormal Blood Pressure" name="blood_pressure" registerFn={register} />
                        <CheckboxBlock label="Thyroid Conditions" name="thyroid" registerFn={register} />
                    </div>
                </section>

                {/* --- LIFESTYLE (BOOLEANS) --- */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                        <Coffee size={18} className="text-white/40" />
                        <h2 className="text-lg font-bold text-white tracking-tight">Lifestyle Indicators</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <CheckboxBlock label="Regular Smoking" name="smoking" registerFn={register} />
                        <CheckboxBlock label="Regular Alcohol Use" name="alcohol" registerFn={register} />
                        <CheckboxBlock label="Daily Exercise Routine" name="exercise" registerFn={register} />
                    </div>
                </section>

                {/* --- BIO --- */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                        <Info size={18} className="text-white/40" />
                        <h2 className="text-lg font-bold text-white tracking-tight">Additional Notes & Biography</h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        <textarea
                            {...register('bio')}
                            rows={4}
                            placeholder="A brief history, interesting life stories, or specific contexts about this relative..."
                            className="px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:border-white/30 focus:bg-white/[0.05] outline-none transition-all resize-none placeholder:text-white/20 text-white font-medium"
                        />
                    </div>
                </section>

                <div className="pt-8 border-t border-white/5 flex justify-end sticky bottom-0 bg-transparent mt-2">
                    <button
                        disabled={isSubmitting}
                        onClick={handleSubmit(onSubmit)}
                        className="px-8 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors shadow-xl active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto"
                    >
                        {isSubmitting ? (
                            <><Loader2 size={18} className="animate-spin" /> Saving Data...</>
                        ) : (
                            <><Save size={18} /> Finalize Node Entry</>
                        )}
                    </button>
                </div>
            </form>

        </div>
    )
}
