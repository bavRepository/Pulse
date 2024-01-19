function carousel(animationDelay, sliderDelay) {
	const slider = document.querySelector('.slider'),
		slideCounterCurrent = document.querySelector('.slider__current'),
		sliderCarousel = document.querySelector('.slider__carousel'),
		slideCounterTotal = document.querySelector('.slider__total'),
		arrowLeft = document.querySelector('.slider__arrow-left'),
		arrowRight = document.querySelector('.slider__arrow-right'),
		slides = document.querySelectorAll('.slider__slide'),
		sliderScreen = document.querySelector('.slider__screen'),
		dots = []

	let sliderWidth,
		slideIndex = 0,
		sliderEngine,
		startDrag,
		changeDragCoord,
		totalAmountDragPixel,
		isLoopStopped = false

	function renderStartElements() {
		const dotsHtml = document.createElement('up')
		dotsHtml.classList.add('slider__dots')
		slider.append(dotsHtml)
		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement('li')
			dot.classList.add('slider__dot')
			dot.setAttribute('data-slide-index', i)
			dotsHtml.append(dot)
			dots.push(dot)
			if (i === 0) {
				dot.classList.add('slider__dot_active')
			}
			dot.addEventListener('click', e => dotSlideSwitcher(e, i))
		}
		initCurrentSlideIndex(slideIndex)
		initTotalSlidesCount()
	}

	function resizeInit() {
		sliderWidth = deleteNonDigits(window.getComputedStyle(slider).width)
		sliderCarousel.style.width = sliderWidth * slides.length + 'px'
		slides.forEach(item => {
			item.style.width = sliderWidth + 'px'
		})
		translateCarousel(slideIndex * sliderWidth)
	}

	function stopSliderEngine() {
		isLoopStopped = true
		clearInterval(sliderEngine)
	}

	function shiftingSlideIndex(sign = '+') {
		stopSliderEngine()
		if (sign === '-') {
			slideIndex--
			if (slideIndex < 0) {
				slideIndex = slides.length - 1
			}
		} else if (sign === '+') {
			slideIndex++
			if (slideIndex >= slides.length) {
				slideIndex = 0
			}
		} else {
			throw new Error('You have used wrong math sign ' + sign + "\nEither '-' or '+' could be")
		}
	}

	function restartEngine(delay) {
		isLoopStopped = false
		loopingOnSliderEngine(delay)
	}
	function slideLeft() {
		arrowLeft.addEventListener('click', e => {
			e.stopPropagation()
			swipeRight()
		})
	}

	function slideRight() {
		arrowRight.addEventListener('click', e => {
			e.stopPropagation()
			swipeLeft()
		})
	}

	function loopingOnSliderEngine(delay = 4500) {
		sliderEngine = setInterval(() => {
			if (!isLoopStopped) {
				slideIndex++
				if (slideIndex >= slides.length) {
					slideIndex = 0
				}
				dotStyleCleaner(slideIndex)
				initCurrentSlideIndex(slideIndex)
				translateCarousel(slideIndex * sliderWidth)
			}
		}, delay)
	}

	function swipeLeft() {
		getPausedOffAfterArrowsAndDotsClick()
		shiftingSlideIndex()
		dotStyleCleaner(slideIndex)
		initCurrentSlideIndex(slideIndex)
		translateCarousel(slideIndex * sliderWidth)
		restartEngine(animationDelay + sliderDelay)
	}
	function swipeRight() {
		getPausedOffAfterArrowsAndDotsClick()
		shiftingSlideIndex('-')
		dotStyleCleaner(slideIndex)
		initCurrentSlideIndex(slideIndex)
		translateCarousel(slideIndex * sliderWidth)
		restartEngine(animationDelay + sliderDelay)
	}

	function getSliderPausedAfterSlideClick() {
		slides.forEach(item => {
			item.addEventListener('click', () => {
				slider.classList.toggle('addBorder')
				isLoopStopped = !isLoopStopped
				if (!isLoopStopped) {
					restartEngine(animationDelay + sliderDelay)
				} else {
					clearInterval(sliderEngine)
				}
			})
		})
	}

	// PC
	sliderScreen.addEventListener('dragstart', e => {
		startDrag = e.clientX
	})
	sliderScreen.addEventListener('dragover', e => {
		e.preventDefault()
		let touch = e.clientX
		dragOverSlider(touch)
		changeDragCoord = startDrag - touch
		totalAmountDragPixel = startDrag + touch
	})
	sliderScreen.addEventListener('dragend', e => getSwiped(e))
	function getSwiped(e) {
		if (totalAmountDragPixel > 10) {
			if (changeDragCoord > 0) {
				swipeLeft()
			} else {
				swipeRight()
			}
		}
		totalAmountDragPixel = 0
	}

	//	Mobile, Tablet
	sliderScreen.addEventListener('touchstart', e => {
		startDrag = e.touches[0].clientX
	})

	sliderScreen.addEventListener('touchmove', e => {
		e.preventDefault()

		let touch = e.touches[0]
		dragOverSlider(touch)
		totalAmountDragPixel = startDrag + touch.clientX
		changeDragCoord = startDrag - touch.clientX
	})

	sliderScreen.addEventListener('touchend', e => getSwiped(e))

	function getPausedOffAfterArrowsAndDotsClick() {
		if (isLoopStopped) {
			isLoopStopped = !isLoopStopped
			slider.classList.toggle('addBorder')
			restartEngine()
		}
	}

	function initCurrentSlideIndex(count) {
		count++
		if (count < 10) {
			slideCounterCurrent.textContent = `0${count}`
		} else {
			slideCounterCurrent.textContent = count
		}
	}

	function initTotalSlidesCount() {
		if (slides.length < 10) {
			slideCounterTotal.textContent = `0${slides.length}`
		} else {
			slideCounterTotal.textContent = slides.length
		}
	}

	function translateCarousel(shiftValue) {
		sliderCarousel.style.transform = `translateX(-${shiftValue}px)`
	}

	function dotSlideSwitcher(e, index) {
		getPausedOffAfterArrowsAndDotsClick()
		stopSliderEngine()
		dotStyleCleaner(index)
		slideIndex = Number(e.target.getAttribute('data-slide-index'))
		translateCarousel(slideIndex * sliderWidth)
		initCurrentSlideIndex(slideIndex)
		restartEngine(animationDelay + sliderDelay)
	}

	function dotStyleCleaner(count) {
		dots.forEach(item => {
			item.classList.remove('slider__dot_active')
		})
		dots[count].classList.add('slider__dot_active')
	}

	function deleteNonDigits(str) {
		return Number(str.replace(/\D/gi, ''))
	}

	function dragOverSlider(touchPos) {
		if (startDrag < touchPos.clientX) {
			translateCarousel(slideIndex * sliderWidth - touchPos.clientX)
		} else {
			translateCarousel(slideIndex * sliderWidth + touchPos.clientX)
		}
	}

	renderStartElements()
	resizeInit()
	slideLeft()
	slideRight()
	loopingOnSliderEngine(sliderDelay)
	getSliderPausedAfterSlideClick()
	window.addEventListener('resize', resizeInit)
}

export default carousel
