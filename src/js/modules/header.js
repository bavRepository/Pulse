function header() {
	const hamburger = document.querySelector('.header .hamburger'),
		menu = document.querySelector('.header .menu'),
		menuItems = document.querySelectorAll('.menu .menu__item')

	/* 	Below are two events that are trigger after hamburger click
	1. Opening sidebar after click hamburger
	2. Changing geometric shape of hamburger to a cross */
	hamburger.addEventListener('click', e => {
		sidebarActive()
	})
	/* 	Set the event listener to menu items that will close sidebar and change hamburger shape after click on these elements  */
	menuItems.forEach(item => {
		item.addEventListener('click', e => {
			sidebarActive()
		})
	})

	function sidebarActive() {
		menu.classList.toggle('menu_active')
		hamburger.classList.toggle('hamburger_active')
	}
}

export default header
