import Genres from "./enums/Genres"
import FetchingMusic from "./services/FetchingMusic"

const audioplayer = document.querySelector("audio")
const img = document.querySelector("img")

const fetchTracks = new FetchingMusic()

fetchTracks.getTracksByGenre(Genres.electronic).then((tracks) => {
	console.log(tracks)
})

