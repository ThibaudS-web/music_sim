import Track from "../models/Track"

/**  @description Retrieving mocked data.*/
class FetchingMusic {
	baseURL = import.meta.env.DEV ? "http://localhost:3000/music_sim" : "https://thibauds-web.github.io/music_sim"

	async getTracksByGenre(genre: string): Promise<Track[]> {
		try {
			let data: Track[]
			const result = await fetch(`${this.baseURL}/${genre}.json`)
			data = await result.json()
			return data
		} catch {
			throw new Error("Problem occured! Invalid JSON")
		}
	}
}

export default FetchingMusic
