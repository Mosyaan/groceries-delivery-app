// Utils
function getData(api, func) {
    fetch(api).then((response) => {
        response.json().then(func);
    });
}
function serializeWeight(grams) {
    return `${Math.round(grams / 10) / 100}kg`;
}

// Selectors
const domLocation = document.querySelector('label.location>select');
const domCategories = document.querySelector('div.categories');
const domCatalog = document.querySelector('div.catalog');
const domCartAmount = document.querySelector('span.cart_amount');

// Actions
function addLocation({ id, name }) {
    const option = document.createElement('option');
    option.value = id;
    option.text = name;

    domLocation.append(option);
}
function addCategory({ id, image, name }) {
    const div = document.createElement('div');
    div.dataset.id = id;
    div.className = 'category';
    div.innerHTML = `
        <img alt="category" src="${image}">
        <span>${name}</span>
    `;

    domCategories.append(div);
}
function addItem({ id, image, name, weight, price }) {
    const div = document.createElement('div');
    div.dataset.id = id;
    div.className = 'item';
    div.innerHTML = `
        <div class="item__preview">
            <img alt="${name}" src="${image}">
        </div>
        <h4>${name}</h4>
        <h3 class="item__info">
            ${serializeWeight(weight)},
            ${price}$
        </h3>
        <button class="item__buy"></button>
    `;

    domCatalog.append(div);
}

let groceries = [];

// Load content
function loadLocations(locations) {
    locations.forEach(addLocation);
}
function loadCategories() {
    getData('api/categories.json', (data) => {
        data.items.slice(0, 3).forEach(addCategory);
    });
}
function loadItems() {
   getData('api/groceries.json', (data) => {
       groceries = data.items;
       data.items.slice(0, 4).forEach(addItem);
       listenBuy();
   });
}

function listenBuy() {
    document.querySelectorAll('div.item').forEach((elem) => {
        elem.addEventListener('click', () => {
            let id = Number(elem.dataset.id);
            let object = groceries.find((prod) => prod.id === id);
            localStorage.setItem('product', JSON.stringify(object));
            location.assign('product.html')
        });
    });
}

function userData() {
    let welcome = ['good night', 'good morning', 'good afternoon', 'good evening', 'good evening'];
    let hours = (new Date()).getHours();
    if (localStorage.getItem('user') === null) {
        window.location.assign('signup.html')
        return;
    }
    let id = Number(localStorage.getItem('user'));
    getData('api/users.json', (data) => {
        let user = data.items.find((elem) => {
            return elem.id === id;
        });
        let div = document.querySelector('div.user');
        div.querySelector('img.user__avatar').src = user.avatar;
        div.querySelector('.user__name').innerHTML = user.first_name + ' ' + user.last_name;
        div.querySelector('.user__welcome').innerHTML = welcome[Math.round((hours + 1) / 6)];
        loadLocations(user.locations);
    });
}

function cartDisplay() {
    const data = JSON.parse(localStorage.getItem('cart') || '[]');
    if (data.length > 0) {
        domCartAmount.removeAttribute('disabled')
        domCartAmount.textContent = data.length.toString();
    }
}

userData();
cartDisplay();
loadCategories();
loadItems();
