import { FileSystem } from './fs.js';
import { elem, div, input, button } from './html.js';

function div100(...children) {
	const result = div(...children);
	result.style.height = "100%";
	return result;
}

function row(flex, ...children) {
	const result = div(...children);
	result.style.display = "flex";
	flex.split('').forEach((f, i) => {
		children[i].style.flex = 0 + f;
	});
	return result;
}

class EditFileElement extends HTMLElement {

	constructor() {
		super();

		this.fs = new FileSystem();
		this.editor = elem('edit-string');
		this.filename = input('client/index.html');

		this.appendChild(
			div100(
				row('191', 
				button('Load', () => this.load()), 
				this.filename, 
				button('Save', () => this.save()),
				),
				this.editor,
			)
		);

		this.load();
	}

	load() {
		this.fs.load(this.filename.value, 
			s => { this.editor.value = s; },
			f => {},
		);
	}

	save() {
		this.fs.save(this.filename.value, this.editor.value, 
			s => {},
			f => {},
		);
	}
}

customElements.define('edit-file', EditFileElement);
