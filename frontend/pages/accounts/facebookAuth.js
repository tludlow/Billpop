import { facebookAuth } from 'actions/userActions'
import TempAuthExample from '@/components/tempAuthExample'


export default function FacebookAuth() {
    return <TempAuthExample externalProviderAuthAction={facebookAuth} />
}
