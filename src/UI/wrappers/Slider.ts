import SliderElement from "./SliderElement"

class Slider {
	elements: SliderElement[]
	elementsDisplayed: SliderElement[]
	nodeParent: HTMLElement
	wrapper: HTMLElement

	constructor(elements: SliderElement[], nodeParent: HTMLElement) {
		this.elements = elements
		this.nodeParent = nodeParent
		this.wrapper = document.createElement("div")
		this.elementsDisplayed = this.elements.slice(0, 3)
	}

	getHTML() {
		const templateSlider = `
            <div id="slider-wrapper"></div> 
        `

		// this.wrapper.innerHTML = templateSlider
		this.nodeParent.innerHTML = templateSlider

		const sliderWrapper = this.nodeParent.querySelector("#slider-wrapper")!
		console.log(this.elements.slice(0, 3))

		const middleIndex = Math.floor(this.elementsDisplayed.length / 2)

		console.log(this.elementsDisplayed[middleIndex])
		this.elementsDisplayed.forEach((element, index) => {
			if (index === middleIndex) {
				element.active = true
			}
			sliderWrapper.appendChild(element.getHTML())
		})

		console.log(this.elementsDisplayed.filter((el) => el.active))
	}
}

export default Slider
