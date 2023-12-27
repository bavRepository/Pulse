import '../index.html'
import '../styles/scss/style.scss'

import header from './modules/header'
import styleChanger from './services/styleChanger'

window.addEventListener('DOMContentLoaded', function () {
	header()
	styleChanger()
})
