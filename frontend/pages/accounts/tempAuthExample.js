import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { googleAuth } from 'actions/userActions'

export default function ProfilePage() {
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        if (router.query.code === undefined) {
            return
        }
        dispatch(googleAuth(router.query.code))
    }, [dispatch, router])

    return <Layout title={`test - Billpop`}>Test</Layout>
}
