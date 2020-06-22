import { googleAuth } from 'actions/userActions'
import EternalAuthRedirect from '@/components/external-auth-redirect'

export default function GoogleAuth() {
    return <EternalAuthRedirect externalProviderAuthAction={googleAuth} />
}
