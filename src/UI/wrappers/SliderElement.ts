class SliderElement {
	genre: string
	base_URL = "src/assets/images-genres"
	active: boolean
	wrapperElement: HTMLElement
	image: HTMLImageElement | null
	callbackOnMoving: (() => void) | null = null;

	setClickOnSlideElementForMovingOnSlider(cb: () => void) {
		if (this.callbackOnMoving !== null) {
			this.wrapperElement.removeEventListener("click", this.callbackOnMoving);
		}
		this.callbackOnMoving = cb;
		this.wrapperElement.addEventListener("click", cb);
	}

	setClickOnSliderElementForGeneratePlayList(callback: () => void) {
		callback()
	}

	constructor(genre: string) {
		this.genre = genre
		this.active = false
		this.wrapperElement = document.createElement("div")
		this.image = null
	}

	getHTML() {
		const element = `
                <img
                    data-genre="${this.genre}"
                    class="image-genre"
                    src="${this.base_URL}/${this.genre}.png"
                    alt="${this.genre} image"
                />
                <p>${this.genre}</p>
           
        `
		this.wrapperElement.classList.add("image-genre-container")
		this.wrapperElement.innerHTML = element
		this.sizeChange()
		return this.wrapperElement
	}

	sizeChange() {
		if (this.active) {
			this.wrapperElement.classList.add("active-genre")
		} else {
			this.wrapperElement.classList.remove("active-genre")
		}
	}
}

export default SliderElement
