import { FileSystem } from './fs.js';

function elem(tag, text) {
	const result = document.createElement(tag);
	if (text) {
		result.innerText = text;
	}
	return result;
}

function div(...children) {
	const result = elem('div');
	children.forEach(c => result.appendChild(c));
	return result;	
}

function div100(...children) {
	const result = div(...children);
	result.style.height = "100%";
	return result;
}

function button(text, click) {
	const result = elem('button', text);
	result.onclick = click;
	return result;	
}

function input(value) {
	const result = elem('input');
	result.value = value;
	return result;	
}

class EditFileElement extends HTMLElement {

	constructor() {
		super();

		const fs = new FileSystem();
		const editor = elem('edit-string');
		const filename = input('client/index.html');

		const buttonLoad = button('Load', () => {
			fs.load(filename.value, 
				s => {
					editor.value = s;
				},
				f => {},
			);
		});

		const buttonSave = button('Save', () => {
			fs.save(filename.value, editor.value, 
				s => {
				},
				f => {},
			);
		});

		this.appendChild(
			div100(
				buttonLoad, filename, buttonSave,
				editor,
			),
		);

		buttonLoad.click();
	}
}

customElements.define('edit-file', EditFileElement);
