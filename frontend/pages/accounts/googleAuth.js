import { googleAuth } from 'actions/userActions'
import TempAuthExample from '@/components/tempAuthExample'

export default function GoogleAuth() {
    return <TempAuthExample externalProviderAuthAction={googleAuth} />
}
