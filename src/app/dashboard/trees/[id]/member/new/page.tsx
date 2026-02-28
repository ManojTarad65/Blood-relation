import MemberForm from '@/components/trees/MemberForm'

export default function NewMemberPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex bg-slate-950 font-outfit text-slate-50 min-h-screen pt-12">
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

            <MemberForm treeId={params.id} />
        </div>
    )
}
