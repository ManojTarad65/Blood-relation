'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTree(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const name = formData.get('name') as string
    const description = formData.get('description') as string

    const { data, error } = await supabase
        .from('family_trees')
        .insert([{
            name,
            description,
            owner_id: user.id
        }])
        .select()

    if (error) {
        console.error(error)
        redirect('/trees/new?error=Could not create tree')
    }

    // Assign the owner an 'admin' role in the tree_roles table for this tree
    if (data && data[0]) {
        await supabase.from('tree_roles').insert([{
            tree_id: data[0].id,
            user_id: user.id,
            role: 'admin'
        }]);
    }

    revalidatePath('/dashboard')
    redirect(`/trees/${data[0].id}`)
}
