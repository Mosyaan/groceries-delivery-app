// Utils
function serializeWeight(grams) {
	return `${Math.round(grams / 10) / 100}kg`;
}

// Selectors
const domList = document.querySelector('div.list');

// Actions
function addItem({ id, image, name, weight, price }) {
	const div = document.createElement('div');
	div.className = 'item';
	div.dataset.id = id;
	div.innerHTML = `
		<div class="item__preview">
            <img src="${image}" alt="${name}">
        </div>
        <div class="item__info">
            <h4>${name}</h4>
            <h3>
            	${serializeWeight(weight)},
            	${price}$
			</h3>
        </div>
        <button class="item__buy"></button>
	`;

	domList.append(div);
}
function addCategory({ id, image, name }) {
	const div = document.createElement('div');
	div.className = 'item';
	div.dataset.id = id;
	div.innerHTML = `
		<div class="item__preview">
            <img src="${image}" alt="${name}">
        </div>
        <div class="item__info">
            <h4>${name}</h4>
        </div>
        <button class="item__buy"></button>
	`;

	domList.append(div);
}

function openItem(id) {

}

function openCategory(id) {}

function loadList({ type, list }) {
	switch (type) {
		case 'items':
			list.forEach(addItem);
			break;
		case 'categories':
			list.forEach(addCategory);
			break;
	}
}

const data = JSON.parse(localStorage.getItem('list') || '[]');
loadList(data);
