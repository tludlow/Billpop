import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

//HOC wrapping authenticated routes/pages so that only logged in users can have access
//IMPORTANT - wrapping in a HOC causes next.js fast refresh to cause a page refresh and loses state (not a big deal)
export default function AuthenticatedRoute(Component) {
    return () => {
        const user = useSelector((state) => state.user)
        const Router = useRouter()

        useEffect(() => {
            if (!user.loggedIn) Router.push('/accounts/login')
        }, [user.loggedIn])

        return <Component {...arguments} />
    }
}
