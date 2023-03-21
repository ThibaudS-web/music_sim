import Track from "../../models/Track"

class AudioPlayer {
	track: Track
	parentNode: HTMLElement
	audioElement: HTMLAudioElement | null
	pauseButton: HTMLElement | null
	playButton: HTMLElement | null
	disk: HTMLElement | null
	hiddenPlayer: HTMLElement | null
	isOpen: boolean
	diskOpenAnimation = () => this.disk?.classList.add("disk-animation-rotation")
	diskCloseAnimation = () => this.disk?.classList.remove("disk-animation-rotation")
	wrapper: HTMLDivElement
	baseUrl: string

	constructor(parentNode: HTMLElement, track: Track) {
		this.parentNode = parentNode
		this.track = track
		this.audioElement = null
		this.pauseButton = null
		this.playButton = null
		this.disk = null
		this.hiddenPlayer = null
		this.isOpen = false
		this.wrapper = document.createElement("div")
		this.baseUrl = "/src/assets/"
	}

	getHTML() {
		const { title, author, path_url, image } = this.track

		const templatePlayAudio = `
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
                    <div class="container-progress"></div>
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
		this.wrapper.innerHTML = templatePlayAudio

		this.parentNode.append(this.wrapper)

		this.audioElement = this.wrapper.querySelector("audio")!
		this.audioElement.src = `${this.baseUrl}/musics/${path_url}`

		this.playButton = this.wrapper.querySelector(".play")!
		this.pauseButton = this.wrapper.querySelector(".pause")!
		this.hiddenPlayer = this.wrapper.querySelector(".hidden-player")!
		this.disk = this.wrapper.querySelector(".disk")!
		this.disk.style.backgroundImage = `url(src/assets/${image}`

		console.log(this.hiddenPlayer)
		this.hiddenPlayer.addEventListener("click", () => {
			this.openPlayer()
		})

		this.playButton.addEventListener("click", () => this.play())
		this.pauseButton.addEventListener("click", () => this.pause())
	}

	openPlayer() {
		console.log("hello")
		this.isOpen = true
		this.disk?.classList.add("disk-left-moving")
		this.hiddenPlayer?.classList.add("hidden-left-moving")

		setTimeout(() => {
			this.play()
			this.diskOpenAnimation()
		}, 1200)
	}

	closePlayer() {
		this.isOpen = false
		this.disk?.classList.remove("disk-left-moving")
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
		this.audioElement?.pause()
		this.diskCloseAnimation()
		this.playButton?.classList.add("d-block")
		this.playButton?.classList.remove("d-none")
		this.pauseButton?.classList.remove("d-block")
		this.pauseButton?.classList.add("d-none")
	}

	reset() {
		//todo
	}
}

export default AudioPlayer
