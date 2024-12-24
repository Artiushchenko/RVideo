import { axiosClassic, instance } from '@/api/axios'

import type { IChannel } from '@/types/channel.types'

class ChannelService {
	private _CHANNELS = '/channels'

	getAll() {
		return axiosClassic.get<IChannel[]>(this._CHANNELS)
	}

	bySlug(slug?: string | null) {
		return axiosClassic.get<IChannel>(`${this._CHANNELS}/by-slug/${slug}`)
	}

	toggleSubscribe(channelSlug: string) {
		return instance.patch(`${this._CHANNELS}/toggle-subscribe/${channelSlug}`)
	}
}

export const channelService = new ChannelService()
