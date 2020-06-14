import { facebookAuth } from 'actions/userActions'
import TempAuthExample from './tempAuthExample'

export default function FacebookAuth() {
    return <TempAuthExample externalProviderAuthAction={facebookAuth} />
}
