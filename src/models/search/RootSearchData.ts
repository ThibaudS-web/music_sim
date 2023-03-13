import Artists from "./Artists"
import Tracks from "./Tracks"

class RootSearchData {
	tracks: Tracks
	artists: Artists
	constructor(tracks: Tracks, artists: Artists) {
		this.tracks = tracks
		this.artists = artists
	}
}

export default RootSearchData