import { useStudioSettings } from '@/hooks/useStudioSettings'
import { Loader } from 'lucide-react'
import React from 'react'

type Props = {
    state: SourceDeviceStateProps
    user:
     |  ({
        subscription: {
            plan: 'PRO' | 'FREE'
        } | null
        studio: {
            id: string
            screen: string | null
            mic: string | null
            camera: string | null
            preset: 'HD' | 'SD'
            userId: string | null
        } | null
     } & {
        id: string
        email: string
        firstName: string | null
        lastName: string | null
        createdAt: Date
        clerkId: string
     })
    | null
}

const MediaConfiguration = ({ state, user }: Props) => {

    const activeScreen = state.displays?.find(
        (screen) => screen.id === user?.studio?.screen
    )

    const activeAudio = state.audioInputs?.find(
        (device) => device.deviceId === user?.studio?.mic
    )

    const { register, isPending, onPreset } = useStudioSettings(
        user!.id,
        user?.studio?.screen || state.displays?.[0]?.id,
        user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
        user?.studio?.preset,
        user?.subscription?.plan
    )

  return (
    <form className='flex h-full relative w-full flex-col gap-y-5'>
        {isPending && <div className='fixed z-50 w-full h-full top-0 left-0 bottom-0 rounded-2xl bg-black/80 flex justify-center items-center'>
            <Loader />
        </div>}
    </form>
  )
}

export default MediaConfiguration