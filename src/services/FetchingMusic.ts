import Track from "../models/Track"

/**  @description Retrieving mocked data.*/
class FetchingMusic {
	port = import.meta.env.DEV ? "3000" : "4173"

	async getTracksByGenre(genre: string): Promise<Track[]> {
		try {
			let data: Track[]
			const result = await fetch(`http://localhost:${this.port}/${genre}.json`)
			data = await result.json()
			return data
		} catch {
			throw new Error("Problem occured! Invalid JSON")
		}
	}
}

export default FetchingMusic
