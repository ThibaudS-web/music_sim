import Track from "../../models/Track"
import { v4 as uuidv4 } from "uuid"
class AudioPlayer {
	private readonly track: Track
	public readonly id = uuidv4()
	private readonly parentNode: HTMLElement
	audioElement: HTMLAudioElement | null
	private pauseButton: HTMLElement | null
	private playButton: HTMLElement | null
	private disk: HTMLElement | null
	private hiddenPlayer: HTMLElement | null
	private containerProgress: HTMLElement | null
	progressBar: HTMLElement | null
	progressValue: number | null
	public wrapper: HTMLElement
	forwardBtn: HTMLElement | null
	backwardBtn: HTMLElement | null
	durationTimeSong: HTMLElement | null
	currentTimeSong: HTMLElement | null
	isPlaying: boolean
	private playTimeout: ReturnType<typeof setTimeout> | null
	private readonly baseUrlImage: string
	private readonly baseUrlSong: string
	secondsCount = 0
	minutesCount = 0
	intervalId: NodeJS.Timer | null
	title: null | string
	diskOpenAnimation = () => this.disk?.classList.add("disk-animation-rotation")
	diskCloseAnimation = () => this.disk?.classList.remove("disk-animation-rotation")

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
		this.forwardBtn = null
		this.backwardBtn = null
		this.title = null
		this.durationTimeSong = null
		this.currentTimeSong = null
		this.intervalId = null
		this.isPlaying = false
		this.wrapper = document.createElement("div")
		this.baseUrlImage = "/src/assets/images-genres"
		this.baseUrlSong = "/src/assets/musics"
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
						<h4>
							${title} - ${author}
						</h4>
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

		this.audioElement.src = `${this.baseUrlSong}/${path_url}`
		this.disk.style.backgroundImage = `url(${this.baseUrlImage}/${image}`
		this.title = title //need to be deleted after dev
		this.containerProgress.addEventListener("click", this.setProgressOnClick.bind(this))
		this.audioElement.addEventListener("timeupdate", this.UpdateProgressBar.bind(this))
		this.hiddenPlayer.addEventListener("click", this.openPlayer.bind(this))
		this.playButton.addEventListener("click", this.playSong.bind(this))
		this.pauseButton.addEventListener("click", this.pauseSong.bind(this))
	}

	deleteAllEventListeners() {
		this.containerProgress?.removeEventListener("click", (e) => this.setProgressOnClick(e))
	}

	UpdateProgressBar() {
		if (this.audioElement && this.progressBar) {
			this.progressValue = Math.floor(
				(this.audioElement.currentTime / this.audioElement.duration) * 100
			)

			this.progressBar.style.width = `${this.progressValue}%`
			console.log(this.progressValue)
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
		}, 1200)
	}

	closePlayer() {
		this.deleteAllEventListeners() // TODO: remove listeners when players closed
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
		this.playButton?.classList.add("d-none")
		this.playButton?.classList.remove("d-block")
		this.pauseButton?.classList.remove("d-none")
		this.pauseButton?.classList.add("d-block")
	}

	pauseSong() {
		this.isPlaying = false
		console.log("pauseSong: ", this.audioElement?.currentTime)
		this.audioElement?.pause()

		if (this.intervalId) clearInterval(this.intervalId) //TODO: bug on pause need to be fixed
		this.diskCloseAnimation()
		this.playButton?.classList.add("d-block")
		this.playButton?.classList.remove("d-none")
		this.pauseButton?.classList.remove("d-block")
		this.pauseButton?.classList.add("d-none")
	}

	resetTrack() {
		this.isPlaying = false

		if (this.intervalId) clearInterval(this.intervalId)
		this.pauseSong()
		if (this.durationTimeSong) this.durationTimeSong.innerHTML = ""
		if (this.currentTimeSong) this.currentTimeSong.innerHTML = ""
		if (this.audioElement) this.audioElement.currentTime = 0
	}
}

export default AudioPlayer
