import Genres from "../enums/Genres"
import Track from "../models/Track"

class FetchingMusic {
	async getTracksByGenre(genre: string): Promise<Track[]> {
		try {
			let data: Track[]
			const result = await fetch(`http://localhost:5173/${genre}.json`)
            data = await result.json()
			return data
		} catch {
			throw new Error("Problem occured! Invalid JSON")
		}
	}  
}

export default FetchingMusic
