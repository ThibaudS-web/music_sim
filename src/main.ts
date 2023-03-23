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
			//Display the audio players and push it in array for manage them
			tracks.map((track) => {
				const player = new AudioPlayer(playlistContainer, track)
				player.getHTML()
				audioPlayers.push(player)
			})
		})
		.then(() => {
			closeOtherAudioPlayers(audioPlayers)
			goToNextSong(audioPlayers)
		})
		.catch((err) => console.error(err))
}

//Close All players when one is active
function closeOtherAudioPlayers(songs: AudioPlayer[]) {
	songs.forEach((song) => {
		song.wrapper.addEventListener("click", () => {
			songs
				.filter((s) => s !== song)
				.forEach((s) => {
					s.closePlayer()
				})
		})

		song.forwardBtn?.addEventListener("click", (event) => {
			event.stopPropagation()
			goToNextSong(songs, true)
		})

		song.backwardBtn?.addEventListener("click", (event) => {
			event.stopPropagation()
			goToPreviousSong(songs)
		})
	})
}

function goToNextSong(songs: AudioPlayer[], triggeredByClick?: boolean) {
	const getNextIndex = (currentIndex: number) => (currentIndex + 1) % songs.length
	if (triggeredByClick) {
		const currentIndex = songs.findIndex((song) => song.isPlaying)
		songs[currentIndex].closePlayer()
		songs[getNextIndex(currentIndex)].openPlayer()
	} else {
		songs.forEach((song) => {
			song.audioElement?.addEventListener("timeupdate", () => {
				if (song.progressValue === 100) {
					const currentIndex = songs.findIndex((song) => song.progressValue === 100)
					songs[getNextIndex(currentIndex)].openPlayer()
				}
			})
		})
	}
}

function goToPreviousSong(songs: AudioPlayer[]) {
	const getPreviousIndex = (currentIndex: number) => {
		if (currentIndex === 0) {
			return songs.length - 1
		} else {
			return currentIndex - 1
		}
	}
	const currentIndex = songs.findIndex((song) => song.isPlaying)
	songs[currentIndex].closePlayer()
	songs[getPreviousIndex(currentIndex)].openPlayer()
}

// function removePlaylist() {
// 	playlistContainer.innerHTML = ""
// }

function switchPlayList(genre: Genres) {
	// removePlaylist()
	displayPlaylist(genre)
}

switchPlayList(Genres.rock)

