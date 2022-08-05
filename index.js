let groceries = [];

function serializeWeight(grams) {
    return Math.round(grams / 10) / 100 + 'kg';
}

function getData(api, func) {
    fetch(api).then((response) => {
        response.json().then(func);
    });
}

function addCategories() {
    getData('api/categories.json', (data) => {
        data.items.forEach((elem) => {
            const {name, image} = elem;
            let div = document.createElement('div');
            div.className = 'category';
            div.innerHTML = `<img alt="category" src="${image}">
<span>${name}</span>`;
            document.querySelector('div.categories').append(div);
        });
    });
}

function addItems() {
   getData('api/groceries.json', (data) => {
       groceries = data.items;
       data.items.forEach((elem) => {
           const {image, name, weight, price, id} = elem;
           let div = document.createElement('div');
           div.className = 'item';
           div.innerHTML = `
               <div class="item__preview">
                   <img src="${image}" alt="item">
               </div>
               <h4>${name}</h4>
               <h3 class="item__info">${serializeWeight(weight)}, ${price}$</h3>
               <button class="item__buy" data-id="${id}"></button>
           `;
           document.querySelector('div.catalog').append(div);
       });
       listenBuy();
   });
}

function user() {
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
    });
}

function listenBuy() {
    document.querySelectorAll('button.item__buy').forEach((elem) => {
        elem.addEventListener('click', () => {
            let id = Number(elem.dataset.id);
            let object = groceries.find((prod) => prod.id === id);
            localStorage.setItem('product', JSON.stringify(object));
            location.assign('product.html')
        });
    });
}

user();
addCategories();
addItems();
