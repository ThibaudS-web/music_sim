import Genres from "./enums/Genres"
import FetchingMusic from "./services/FetchingMusic"
import AudioPlayer from "./UI/wrappers/AudioPlayer"
import Slider from "./UI/wrappers/Slider"
import SliderElement from "./UI/wrappers/SliderElement"
import { switchMusicByGenre } from "./utils"

const searchInput = document.querySelector("#search") as HTMLInputElement
const fetchTracks = new FetchingMusic()
const playlistContainer = document.querySelector("#container-playlist") as HTMLElement
const genreContainer = document.querySelector("#container-genre") as HTMLElement
const genres: NodeListOf<HTMLElement> = document.querySelectorAll(".image-genre")

searchInput?.addEventListener("focus", () => {
	searchInput.value =
		"The search bar is currently unavailable, no API is available for this demo."
})

searchInput?.addEventListener("blur", () => {
	searchInput.value = ""
})

genres.forEach((genre) => {
	console.log(genre)
	genre.addEventListener("click", () => switchPlayList(switchMusicByGenre(genre)))
})



let audioPlayers: AudioPlayer[] = []
let sliderElements: SliderElement[] = []

function displayGenrelist() {
	for (let genre in Genres) {
		sliderElements.push(new SliderElement(genre))
	}
	const slider = new Slider(sliderElements, genreContainer)

	slider.getHTML()

	slider.elements.forEach(sliderElement => sliderElement.setClickOnSliderElementForGeneratePlayList(() => sliderElement.wrapperElement.addEventListener('click', () => {
		switchPlayList(sliderElement.genre)
	})))

	const genreHTMLElement = slider.wrapper.querySelector('.active-genre > img') as HTMLImageElement
	const genreSelected = genreHTMLElement.dataset.genre as string

	switchPlayList(genreSelected)
}

displayGenrelist()

function displayPlaylist(genre: string) {

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
			goToNextSong(songs, song.id)
		})

		song.backwardBtn?.addEventListener("click", (event) => {
			event.stopPropagation()
			goToPreviousSong(songs, song.id)
		})
	})
}

function goToNextSong(songs: AudioPlayer[], currentSongId?: string) {
	const getNextIndex = (currentIndex: number) => (currentIndex + 1) % songs.length
	if (currentSongId) {
		const currentIndex = songs.findIndex((song) => song.id === currentSongId)
		console.log("currentIndex", currentIndex)
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

function goToPreviousSong(songs: AudioPlayer[], currentSongId: string) {
	const getPreviousIndex = (currentIndex: number) => {
		if (currentIndex === 0) {
			return songs.length - 1
		} else {
			return currentIndex - 1
		}
	}
	const currentIndex = songs.findIndex((song) => song.id === currentSongId)
	songs[currentIndex].closePlayer()
	songs[getPreviousIndex(currentIndex)].openPlayer()
}

function removePlaylist() {
	playlistContainer.innerHTML = ""
}

function switchPlayList(genre: Genres | null | string) {
	if (genre === null) return
	removePlaylist()
	displayPlaylist(genre)
}


