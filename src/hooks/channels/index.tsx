'use client'
import { getChannels } from '@/services/channel/channel'
import { ChannelInterface } from '@/utils/interfaces/channels'
import { useState, useEffect } from 'react'

const useChannels = () => {
  const [channels, setChannels] = useState<ChannelInterface[]>([])

  const getLocalChannels = async () => {
    try {
      const response = await getChannels()

      if (response.channels.length > 0) {
        setChannels(response.channels)
      }
    } catch (err) {}
  }

  useEffect(() => {
    getLocalChannels()
  }, [])

  return channels
}

export default useChannels
