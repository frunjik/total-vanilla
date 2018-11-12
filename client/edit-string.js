
class EditStringElement extends HTMLElement {
	constructor() {
		super();
		const editor = document.createElement('div');
		editor.style.width = "100%";
		editor.style.height = "100%";
		this.editor = ace.edit(editor);
		this.appendChild(editor);
	}

	set value(value) {
		this.editor.setValue(value, 1);
	}

	get value() {
		return this.editor.getValue();
	}
}

customElements.define('edit-string', EditStringElement);
