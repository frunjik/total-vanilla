export function elem(tag, text) {
	const result = document.createElement(tag);
	if (text) {
		result.innerText = text;
	}
	return result;
}

export function div(...children) {
	const result = elem('div');
	children.forEach(c => result.appendChild(c));
	return result;	
}

export function button(text, click) {
	const result = elem('button', text);
	result.onclick = click;
	return result;	
}

export function input(value) {
	const result = elem('input');
	result.value = value;
	return result;	
}
