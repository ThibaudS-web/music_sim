import Track from "../../models/Track"
import { v4 as uuidv4 } from "uuid"

/** @description The AudioPlayer class seems to provide a comprehensive implementation for playing audio files on a webpage. It includes a variety of UI elements such as play/pause buttons, progress bars, and song information. The constructor initializes all necessary properties and the getHTML() method generates the necessary HTML and attaches it to the DOM. The class also includes a number of private methods for managing UI updates and animations, as well as event handlers for user interaction with the player. Overall, this seems like a well-designed and functional class for playing audio on a webpage. */
class AudioPlayer {
	private readonly track: Track
	public readonly id = uuidv4()
	private readonly parentNode: HTMLElement
	public audioElement: HTMLAudioElement | null
	private pauseButton: HTMLElement | null
	private playButton: HTMLElement | null
	private disk: HTMLElement | null
	private hiddenPlayer: HTMLElement | null
	private containerProgress: HTMLElement | null
	private progressBar: HTMLElement | null
	public progressValue: number | null
	public wrapper: HTMLElement
	private titleSong: HTMLElement | null
	private containerSong: HTMLElement | null
	public forwardBtn: HTMLElement | null
	public backwardBtn: HTMLElement | null
	private durationTimeSong: HTMLElement | null
	private currentTimeSong: HTMLElement | null
	private isPlaying: boolean
	private playTimeout: ReturnType<typeof setTimeout> | null
	private readonly baseUrlImage: string
	private readonly baseUrlSong: string
	private intervalId: NodeJS.Timer | null
	private readonly diskOpenAnimation = () => this.disk?.classList.add("disk-animation-rotation")
	private readonly diskCloseAnimation = () =>
		this.disk?.classList.remove("disk-animation-rotation")
	private readonly displayPlayButton = () => {
		this.playButton?.classList.add("d-block")
		this.playButton?.classList.remove("d-none")
		this.pauseButton?.classList.remove("d-block")
		this.pauseButton?.classList.add("d-none")
	}
	private readonly displayPauseButton = () => {
		this.playButton?.classList.add("d-none")
		this.playButton?.classList.remove("d-block")
		this.pauseButton?.classList.remove("d-none")
		this.pauseButton?.classList.add("d-block")
	}
	private readonly scrollTitle = () => {
		if (this.titleSong!.offsetWidth > this.containerSong!.offsetWidth && this.isPlaying) {
			this.titleSong?.classList.add("scroll-animation")
		} else {
			this.titleSong?.classList.remove("scroll-animation")
		}
	}

	constructor(parentNode: HTMLElement, track: Track) {
		this.parentNode = parentNode
		this.track = track
		this.audioElement = null
		this.pauseButton = null
		this.playButton = null
		this.disk = null
		this.playTimeout = null
		this.hiddenPlayer = null
		this.containerProgress = null
		this.progressBar = null
		this.progressValue = null
		this.titleSong = null
		this.containerSong = null
		this.forwardBtn = null
		this.backwardBtn = null
		this.durationTimeSong = null
		this.currentTimeSong = null
		this.intervalId = null
		this.isPlaying = false
		this.wrapper = document.createElement("div")
		this.baseUrlImage = "/music_sim/assets/images-genres"
		this.baseUrlSong = "/music_sim/assets/musics"
	}

	getHTML() {
		const { title, author, path_url, image } = this.track

		const templatePlayerAudio = `
            <div class="container-player">
                <div class="hidden-player">
                    <p>
                        ${title} - ${author}
                    </p>
                    <p>
                        Click for play
                    </p>
                </div>
                <div class="disk">                  
                    <div class="disk-center">
                    </div>
                </div>
                <div class="player">
					<div class="player-header">
						<div class="title-container">
							<p class="title-song">
								${title} - ${author}
							</p>
						</div>
						<div class='timer-container'>
							<p class="timer-current-song"></p>
							<p class="timer-duration-song"></p>
						</div>
					</div>
                    <div class="container-progress">
						<div class="progress-bar"></div>
					</div>
                    <audio src=${path_url}></audio>
                    <div class="controls">
                        <i class="backward fa-solid fa-backward">
                        </i>
                        <i class="pause fa-solid d-none fa-pause">
                        </i>
                        <i class="play fa-solid fa-play">
                        </i>
                        <i class="forward fa-solid fa-forward">
                        </i>
                    </div>
                </div>
            </div>
        `

		this.wrapper.innerHTML = templatePlayerAudio

		this.parentNode.append(this.wrapper)

		this.audioElement = this.wrapper.querySelector("audio")!
		this.playButton = this.wrapper.querySelector(".play")!
		this.pauseButton = this.wrapper.querySelector(".pause")!
		this.hiddenPlayer = this.wrapper.querySelector(".hidden-player")!
		this.disk = this.wrapper.querySelector(".disk")!
		this.progressBar = this.wrapper.querySelector(".progress-bar")!
		this.containerProgress = this.wrapper.querySelector(".container-progress")!
		this.forwardBtn = this.wrapper.querySelector(".forward")
		this.backwardBtn = this.wrapper.querySelector(".backward")
		this.durationTimeSong = this.wrapper.querySelector(".timer-duration-song")!
		this.currentTimeSong = this.wrapper.querySelector(".timer-current-song")
		this.titleSong = this.wrapper.querySelector(".title-song")!
		this.containerSong = this.wrapper.querySelector(".title-container")!

		this.audioElement.src = `${this.baseUrlSong}/${path_url}`
		this.disk.style.backgroundImage = `url(${this.baseUrlImage}/${image}`

		this.containerProgress.addEventListener("click", this.setProgressOnClick.bind(this))
		this.audioElement.addEventListener("timeupdate", this.UpdateProgressBar.bind(this))
		this.hiddenPlayer.addEventListener("click", this.openPlayer.bind(this))
		this.playButton.addEventListener("click", this.playSong.bind(this))
		this.pauseButton.addEventListener("click", this.pauseSong.bind(this))
	}

	UpdateProgressBar() {
		if (this.audioElement && this.progressBar) {
			this.progressValue = Math.floor(
				(this.audioElement.currentTime / this.audioElement.duration) * 100
			)

			this.progressBar.style.width = `${this.progressValue}%`
			if (this.progressValue === 100) this.closePlayer()
		}
	}

	setProgressOnClick(e: MouseEvent) {
		if (this.audioElement) {
			let { duration } = this.audioElement
			const width = this.containerProgress?.clientWidth!
			const clickX = e.offsetX
			this.audioElement.currentTime = Math.ceil((clickX / width) * duration)

			if (this.intervalId) clearInterval(this.intervalId)
			this.incrementDurationCount(this.audioElement.currentTime)
		}
	}

	openPlayer() {
		this.disk?.classList.add("disk-left-moving")
		this.hiddenPlayer?.classList.add("hidden-left-moving")

		this.playTimeout = setTimeout(() => {
			this.isPlaying = true

			this.playSong()

			if (this.durationTimeSong && this.currentTimeSong) {
				this.durationTimeSong.innerHTML = ` / ${this.formatDuration()}`
				this.currentTimeSong.innerHTML = "00:00&nbsp;"
			}
			this.scrollTitle()
		}, 1200)
	}

	closePlayer() {
		this.disk?.classList.remove("disk-left-moving")
		this.hiddenPlayer?.classList.remove("hidden-left-moving")
		if (this.playTimeout !== null) clearTimeout(this.playTimeout)
		this.resetTrack()
	}

	formatDuration() {
		if (this.audioElement?.duration) {
			let second: number | string = Math.floor(this.audioElement?.duration % 60)
			let minute: number | string = Math.floor(this.audioElement?.duration / 60)

			second = second.toString().padStart(2, "0")
			minute = minute.toString().padStart(2, "0")

			return `${minute}:${second}`
		}

		return "undefined"
	}

	incrementDurationCount(currentDurationInSecond?: number) {
		let songTime = this.formatDuration()
		let [minutesSong, secondsSong] = songTime.split(":").map((x) => parseInt(x))
		let minutes = currentDurationInSecond ? Math.floor(currentDurationInSecond / 60) : 0
		let secondes = currentDurationInSecond ? Math.floor(currentDurationInSecond % 60) : 0

		const setFormattedTime = () => {
			if (this.currentTimeSong) {
				this.currentTimeSong.innerHTML = `${minutes.toString().padStart(2, "0")}:${secondes
					.toString()
					.padStart(2, "0")}&nbsp;`
			}
		}

		setFormattedTime()

		const incrementTime = () => {
			if (this.isPlaying) secondes++

			if (secondes > 59) {
				secondes = 0
				minutes++
			}

			if (minutes === minutesSong && secondes === secondsSong && this.intervalId) {
				clearInterval(this.intervalId)
			}

			setFormattedTime()
		}

		this.isPlaying ? (this.intervalId = setInterval(incrementTime, 1000)) : incrementTime()
	}

	playSong() {
		this.isPlaying = true

		//If the music is ready to be played
		if (this.audioElement?.readyState === 4) {
			this.audioElement?.play()
			this.incrementDurationCount(this.audioElement.currentTime)
		}

		this.diskOpenAnimation()
		this.displayPauseButton()
	}

	pauseSong() {
		this.isPlaying = false
		this.audioElement?.pause()
		if (this.intervalId) clearInterval(this.intervalId)
		this.diskCloseAnimation()
		this.displayPlayButton()
	}

	resetTrack() {
		this.isPlaying = false
		this.scrollTitle()
		if (this.intervalId) clearInterval(this.intervalId)
		this.pauseSong()
		if (this.durationTimeSong) this.durationTimeSong.innerHTML = ""
		if (this.currentTimeSong) this.currentTimeSong.innerHTML = ""
		if (this.audioElement) this.audioElement.currentTime = 0
	}
}

export default AudioPlayer
