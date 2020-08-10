import Layout from '@/components/layout'
import AuthenticatedRoute from '@/components/HOC/AuthenticatedRoute'

function EditProfile() {
    return (
        <Layout title="Edit Profile">
            <h2>Edit profile guy</h2>
        </Layout>
    )
}

export default AuthenticatedRoute(EditProfile)
