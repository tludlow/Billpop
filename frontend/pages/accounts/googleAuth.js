import { googleAuth } from 'actions/userActions'
import TempAuthExample from './tempAuthExample'

export default function GoogleAuth() {
    return <TempAuthExample externalProviderAuthAction={googleAuth} />
}
