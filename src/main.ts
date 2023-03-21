import Genres from "./enums/Genres"
import FetchingMusic from "./services/FetchingMusic"
import AudioPlayer from "./UI/wrappers/AudioPlayer"

const fetchTracks = new FetchingMusic()
const playlistContainer = document.querySelector("#container-playlist") as HTMLElement

fetchTracks.getTracksByGenre(Genres.country).then((tracks) => {
	console.log(tracks)
	tracks.map((track) => new AudioPlayer(playlistContainer, track).getHTML())
})


