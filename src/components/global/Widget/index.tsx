import { useMediaSources } from "@/hooks/useMediaSources"
import { fetchUserProfile } from "@/lib/utils"
import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import MediaConfiguration from "../MediaConfiguration"

const Widget = () => {
    const [profile, setProfile] = useState<{
        status: number
        user:
         |  ({
            subscription: {
                plan: 'PRO' | 'FREE'
            } | null
            studio: {
                id: string
                screen: string | null
                mic: string | null
                preset: 'HD' | 'SD'
                camera: string | null
                userId: string | null
            } | null
         } & {
            id: string
            email: string
            firstName: string
            lastName: string
            createdAt: Date
            clerkId: string
         })
         | null
    } | null>(null)

    const { user } = useUser()
    const {state, fetchMediaResources} = useMediaSources()
    console.log(state)

    useEffect(() => {
        if (user && user.id) {
            fetchUserProfile(user.id).then((p) => setProfile(p))
        }
    }, [user])

  return (
    <div className="p-5">
        <SignedIn>
            {profile ? (
                <MediaConfiguration
                    state={state}
                    user={profile.user}
                />
            ) : (
                ''
            )}
        </SignedIn>
    </div>
  )
}

export default Widget