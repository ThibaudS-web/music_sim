/** @description This class represents an individual element in a Slider. Each SliderElement instance has a genre property, a base_URL property for the image source, an active property to indicate if it's the current active element, a wrapperElement property for the HTML element, an image property for the image element, and two methods for setting callbacks when clicked. The getHTML method creates and returns the HTML structure of the element with the genre name and image. The sizeChange method is called to update the class of the wrapperElement when the element is set to active or not. */

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
                    src="${this.base_URL}/${this.genre}.webp"
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
