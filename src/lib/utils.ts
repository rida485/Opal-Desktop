import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const httpsClient = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
})

export const onCloseApp = () => window.ipcRenderer.send('closeApp')

export const fetchUserProfile = async (clerkId: string) => {
  const response = await httpsClient.get(`/auth/${clerkId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const getMediaSources = async () => {
    const displays = await window.ipcRenderer.invoke('getSources');
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = enumerateDevices.filter(
      (device) => device.kind === 'audioinput'
    );

    console.error('Erreur lors de la récupération des sources média:',);
    return { displays, audio: audioInputs };
}

export const updateStudioSettings = async (
  id: string,
  screen: string,
  audio: string,
  preset: 'HD' | 'SD'
) => {
  const response = await httpsClient.put(`/studio/${id}`, {
    screen,
    audio,
    preset,
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  )
  return response.data
}
