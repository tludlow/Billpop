import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { googleAuth } from 'actions/userActions'
import { func } from 'prop-types'

export default function TempAuthExample(props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { externalProviderAuthAction } = props
    useEffect(() => {
        if (router.query.code === undefined) {
            return
        }
        console.log(router.query.code, externalProviderAuthAction)
        const executeAsync = async () => {
            const res = await dispatch(externalProviderAuthAction(router.query.code))
            res.payload.registered === true ? router.push('/') : router.push('/accounts/signup')
        }
        executeAsync()
    }, [dispatch, router])

    return <Layout title={`test - Billpop`}>Test</Layout>
}

TempAuthExample.propTypes = {
    externalProviderAuthAction: func,
}
