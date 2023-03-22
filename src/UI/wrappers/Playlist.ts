import Genres from "../../enums/Genres"
import AudioPlayer from "./AudioPlayer"

class Playlist {
	genre: Genres
	audioPlayers: AudioPlayer[]
	constructor(audioPlayers: AudioPlayer[], genre: Genres) {
		this.audioPlayers = audioPlayers
		this.genre = genre
	}
}

export default Playlist
