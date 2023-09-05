// dark and light mode switch
export function modeSwitch() {
	let mode = document.querySelector('.mode-switch');

	mode.addEventListener('click', () => {
		let textElement = mode.querySelector('p');
		let icon = mode.querySelector('ion-icon');
		const root = document.documentElement;

		if (textElement.innerText === 'Dark Mode') {
			textElement.innerText = 'Light Mode';
			icon.name = 'moon';
			icon.style.color = '#FFF';

			root.style.setProperty('--element', 'hsl(209, 23%, 22%)');
			root.style.setProperty('--background', 'hsl(207, 26%, 17%)');
			root.style.setProperty('--text', 'hsl(0, 0%, 100%)');
			root.style.setProperty('--input', 'hsl(209, 23%, 22%)');
		} else {
			textElement.innerText = 'Dark Mode';
			icon.name = 'moon-outline';
			icon.style.color = '#000';

			root.style.setProperty('--element', 'hsl(0, 0%, 100%)');
			root.style.setProperty('--background', 'hsl(0, 0%, 98%)');
			root.style.setProperty('--text', 'hsl(200, 15%, 8%)');
			root.style.setProperty('--input', 'hsl(0, 0%, 52%)');
		}
	});
}