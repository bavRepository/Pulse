function styleChanger() {
	let btnValue
	const buttons = document.querySelectorAll('.btn'),
		daytime = document.querySelector('.daytime'),
		reasons = document.querySelector('.reasons'),
		mobile = document.querySelector('.mobile'),
		requirements = document.querySelector('.requirements'),
		footer = document.querySelector('.footer')

	daytime.addEventListener('click', e => {
		const target = e.currentTarget
		e.preventDefault
		buttons.forEach(item => {
			item.classList.toggle('btn_night')
		})

		target.classList.toggle('btn_night')

		target.classList.contains('btn_night') ? (btnValue = 'DAY') : (btnValue = 'NIGHT')
		target.textContent = btnValue
		toggleTheme([reasons, mobile, requirements, footer])
	})
	function toggleTheme(elems) {
		elems.forEach(item => {
			item.classList.toggle('reasons_night')
		})
	}
}
export default styleChanger
