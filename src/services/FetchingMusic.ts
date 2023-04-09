import Track from "../models/Track"

/**  @description Retrieving mocked data.*/
class FetchingMusic {
	async getTracksByGenre(genre: string): Promise<Track[]> {
		try {
			let data: Track[]
			const result = await fetch(`/music_sim/${genre}.json`)
			data = await result.json()
			return data
		} catch {
			throw new Error("Problem occured! Invalid JSON")
		}
	}
}

export default FetchingMusic
