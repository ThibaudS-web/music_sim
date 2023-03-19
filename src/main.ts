import Genres from "./enums/Genres"
import FetchingMusic from "./services/FetchingMusic"

const audioplayer = document.querySelector("audio")
const img = document.querySelector("img")

const fetchTracks = new FetchingMusic()

fetchTracks.getTracksByGenre(Genres.electronic).then((tracks) => {
	console.log(tracks)
})

const disk = document.querySelector(".disk") as HTMLDivElement
const hiddenPlayer = document.querySelector(".hidden-player") as HTMLDivElement

hiddenPlayer.addEventListener("click", () => {
	disk.style.right = "calc(100% - 100px)"
	hiddenPlayer.style.right = "80%"
	setTimeout(() => {
		disk.classList.add("disk-animation-rotation")
	}, 2000)
})


