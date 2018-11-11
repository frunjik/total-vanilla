
class AppComponent extends HTMLElement {
	constructor() {
		super();
		const w = document.createElement('div');
		w.innerText = 'app-component works!';
		this.appendChild(w);
	}
}

customElements.define('app-component', AppComponent);