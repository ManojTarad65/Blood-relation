'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { TreePine, AlertCircle, Loader2 } from 'lucide-react';
import { AppContainer, PrimaryButton, SubtleButton } from '@/components/ui/LayoutBlocks';
import { Card } from '@/components/ui/Cards';

export default function NewTreePage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        const trimmedName = name.trim();
        if (!trimmedName) {
            setError('Tree name is required.');
            return;
        }

        setIsLoading(true);

        try {
            // Validate User
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                router.push('/login');
                return;
            }

            // Insert new Tree
            const { data: treeData, error: insertError } = await supabase
                .from('family_trees')
                .insert([{
                    name: trimmedName,
                    description: description.trim(),
                    owner_id: user.id
                }])
                .select()
                .single();

            if (insertError) {
                console.error("Tree Insert Error:", insertError);
                throw new Error(insertError.message || 'Failed to create the family tree.');
            }

            // Assign Admin Role in tree_roles
            if (treeData) {
                const { error: roleError } = await supabase
                    .from('tree_roles')
                    .insert([{
                        tree_id: treeData.id,
                        user_id: user.id,
                        role: 'admin'
                    }]);

                if (roleError) {
                    console.error("Role Insert Error:", roleError);
                    // Non-blocking error, but good to log.
                }

                // Success! Redirect to the newly created Tree.
                router.push(`/dashboard/trees/${treeData.id}`);
            }

        } catch (err: any) {
            console.error("Submission Error:", err);
            setError(err.message || 'An unexpected error occurred while creating your tree.');
            setIsLoading(false);
        }
    };

    return (
        <AppContainer className="min-h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-xl flex flex-col gap-8 p-8 md:p-10 border border-white/[0.08] bg-white/[0.02]">
                <div className="flex flex-col gap-2 items-center text-center">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 text-white/60 flex items-center justify-center mb-4 border border-white/10 shadow-sm">
                        <TreePine size={32} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Initialize New Tree</h1>
                    <p className="text-white/40 text-sm font-medium">Create a secure container to begin charting your generational lineage.</p>
                </div>

                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                        <AlertCircle size={18} className="shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/50 tracking-wide uppercase text-[10px] ml-1">Tree Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                            placeholder="e.g. The Verma Dynasty"
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all shadow-sm disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/50 tracking-wide uppercase text-[10px] ml-1">Description (Optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                            rows={3}
                            placeholder="A brief overview of this family lineage..."
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all shadow-sm disabled:opacity-50 resize-none"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <PrimaryButton
                            className="w-full py-3.5 text-base flex-1 justify-center"
                            disabled={isLoading}
                            onClick={handleSubmit} 
                        >
                            {isLoading ? (
                                <><Loader2 size={18} className="animate-spin" /> Creating Component...</>
                            ) : (
                                "Construct Tree"
                            )}
                        </PrimaryButton>
                        <SubtleButton
                            href="/dashboard/trees"
                            className="w-full sm:w-auto py-3.5 text-base justify-center"
                        >
                            Cancel
                        </SubtleButton>
                    </div>
                </form>
            </Card>
        </AppContainer>
    );
}
