import { facebookAuth } from 'actions/userActions'
import EternalAuthRedirect from '@/components/external-auth-redirect'

export default function FacebookAuth() {
    return <EternalAuthRedirect externalProviderAuthAction={facebookAuth} />
}
