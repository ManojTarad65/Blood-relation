import MemberForm from '@/components/trees/MemberForm'

export default function NewMemberPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen pb-12 p-6 md:p-8 relative">
            <MemberForm treeId={params.id} />
        </div>
    )
}
