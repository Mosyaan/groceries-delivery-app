let products = JSON.parse(localStorage.getItem('cart'));

if (products.length > 0) {
    document.querySelector('button.checkout').disabled = false;
}

function serializeWeight(grams) {
    return Math.round(grams / 10) / 100 + 'kg';
}

function getData(api, func) {
    fetch(api).then((response) => {
        response.json().then(func);
    });
}

getData('api/groceries.json', (data) => {
    products.forEach(({id, amount}) => {
        let item = data.items.find((elem) => elem.id === id);
        let div = document.createElement('div');
        div.className = "card";
        div.innerHTML = `
                  <img src="${item.image}" alt="" width="48">
                  <div class="info">
                     <p>${item.name}</p>
                     <p>${serializeWeight(item.weight)}, ${item.price}$</p>
                  </div>
                  <div class="amount">
                     <button class="minus"></button>
                     <p>${amount}</p>
                     <button class="plus"></button>
                  </div>
                  <button class="remove"></button>
        `;
        document.querySelector('div.cards').append(div);
    });
});
