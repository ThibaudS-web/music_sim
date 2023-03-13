import { PlayList, RootObject } from "../models/Tracks"
import { API_KEY } from "./apiKey"

class FetchingMusic {
	private options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": `${API_KEY}`,
			"X-RapidAPI-Host": "shazam.p.rapidapi.com"
		}
	}

	public async searchPlaylist() {
		let data: RootObject
		const result = await fetch(
			"https://shazam.p.rapidapi.com/search?term=metallica&locale=en-US&limit=5",
			this.options
		)

		data = await result.json()

		return data
	}
}

export default FetchingMusic
