import Layout from '@/components/layout'

import { useRouter } from 'next/router'

export default function ProfilePage() {
    const router = useRouter()
    const { name } = router.query

    return (
        <Layout title={`${name} - Billpop`}>
            <h3 className="mt-8 font-bold text-3xl tracking-wide">{name}</h3>
        </Layout>
    )
}
