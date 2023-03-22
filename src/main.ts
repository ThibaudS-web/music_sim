import Genres from "./enums/Genres"
import FetchingMusic from "./services/FetchingMusic"
import AudioPlayer from "./UI/wrappers/AudioPlayer"

const fetchTracks = new FetchingMusic()
const playlistContainer = document.querySelector("#container-playlist") as HTMLElement


let audioPlayers: AudioPlayer[] = []

function displayPlaylist(genre: Genres) {
	fetchTracks
		.getTracksByGenre(genre)
		.then((tracks) => {
			tracks.map((track) => {
				const player = new AudioPlayer(playlistContainer, track)
				player.getHTML()
				audioPlayers.push(player)
			})
		})
		.then(() => {
			audioPlayers.forEach((player) => {
				player.wrapper.addEventListener("click", () => {
					audioPlayers
						.filter((p) => p !== player)
						.forEach((p) => {
							p.closePlayer()
						})
				})
			})
		})
		.catch((err) => console.error(err))
}

// function removePlaylist() {
// 	playlistContainer.innerHTML = ""
// }

function switchPlayList(genre: Genres) {
	// removePlaylist()
	displayPlaylist(genre)
}

switchPlayList(Genres.country)

