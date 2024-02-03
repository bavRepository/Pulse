import '../index.html'
import '../styles/scss/style.scss'

import header from './modules/header'
import promo from './modules/promo'
import advantages from './modules/advantages'
import carousel from './modules/carousel'
import catalog from './modules/catalog'
import feedback from './modules/feedback'
import modal from './modules/modal'

//settings
const sliderAnimationDelay = 300
const sliderDelay = 4500

window.addEventListener('DOMContentLoaded', function () {
	header()
	promo()
	advantages()
	carousel(sliderAnimationDelay, sliderDelay)
	catalog()
	feedback()
	modal()
})
