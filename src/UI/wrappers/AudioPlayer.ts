import Track from "../../models/Track"

class AudioPlayer {
	private readonly track: Track
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
	isPlaying: boolean
	private playTimeout: ReturnType<typeof setTimeout> | null
	private readonly baseUrlImage: string
	private readonly baseUrlSong: string
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
                    <h3>
                        ${title} - ${author}
                    </h3>
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
					<!-- <p id="timer"></p> -->
                </div>
            </div>
        `

		this.wrapper.innerHTML = templatePlayerAudio

		this.parentNode.append(this.wrapper)

		this.audioElement = this.wrapper.querySelector("audio")!
		this.audioElement.src = `${this.baseUrlSong}/${path_url}`

		this.playButton = this.wrapper.querySelector(".play")!
		this.pauseButton = this.wrapper.querySelector(".pause")!
		this.hiddenPlayer = this.wrapper.querySelector(".hidden-player")!
		this.disk = this.wrapper.querySelector(".disk")!
		this.progressBar = this.wrapper.querySelector(".progress-bar")!
		this.containerProgress = this.wrapper.querySelector(".container-progress")!
		this.forwardBtn = this.wrapper.querySelector(".forward")
		this.backwardBtn = this.wrapper.querySelector(".backward")
		
		this.disk.style.backgroundImage = `url(${this.baseUrlImage}/${image}`

		this.containerProgress.addEventListener("click", this.setProgressOnClick.bind(this))
		this.audioElement.addEventListener("timeupdate", this.UpdateProgressBar.bind(this))
		this.hiddenPlayer.addEventListener("click", this.openPlayer.bind(this))
		this.playButton.addEventListener("click", this.play.bind(this))
		this.pauseButton.addEventListener("click", this.pause.bind(this))
	}

	UpdateProgressBar() {
		if (this.audioElement && this.progressBar) {
			this.progressValue = Math.ceil(
				(this.audioElement.currentTime / this.audioElement.duration) * 100
			)
			this.progressBar.style.width = `${this.progressValue}%`
			if (this.progressValue === 100) this.closePlayer()
		}
	}

	setProgressOnClick(e: MouseEvent) {
		if (this.audioElement) {
			const width = this.containerProgress?.clientWidth!
			const clickX = e.offsetX
			const duration = this.audioElement.duration
			this.audioElement.currentTime = (clickX / width) * duration
		}
	}

	openPlayer() {
		this.disk?.classList.add("disk-left-moving")
		this.hiddenPlayer?.classList.add("hidden-left-moving")
		this.isPlaying = true

		this.playTimeout = setTimeout(() => {
			this.play()
		}, 1200)
	}

	closePlayer() {
		this.disk?.classList.remove("disk-left-moving")
		this.hiddenPlayer?.classList.remove("hidden-left-moving")
		if (this.playTimeout !== null) {
			clearTimeout(this.playTimeout)
		}
		this.resetTrack()
	}

	play() {
		this.audioElement?.play()
		this.diskOpenAnimation()
		this.playButton?.classList.add("d-none")
		this.playButton?.classList.remove("d-block")
		this.pauseButton?.classList.remove("d-none")
		this.pauseButton?.classList.add("d-block")
	}

	pause() {
		this.isPlaying = false
		this.audioElement?.pause()
		this.diskCloseAnimation()
		this.playButton?.classList.add("d-block")
		this.playButton?.classList.remove("d-none")
		this.pauseButton?.classList.remove("d-block")
		this.pauseButton?.classList.add("d-none")
	}

	resetTrack() {
		this.pause()
		if (this.audioElement) {
			this.audioElement.currentTime = 0
		}
	}
}

export default AudioPlayer
