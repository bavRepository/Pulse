import '../index.html'
import '../styles/scss/style.scss'

import advantages from './modules/advantages'
import carousel from './modules/carousel'
import catalog from './modules/catalog'

//settings
const sliderAnimationDelay = 300
const sliderDelay = 4500

window.addEventListener('DOMContentLoaded', function () {
	advantages()
	// consultation()
	carousel(sliderAnimationDelay, sliderDelay)
	catalog()
})
