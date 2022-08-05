let product = JSON.parse(localStorage.getItem('product'));

function serializeWeight(grams) {
    return Math.round(grams / 10) / 100 + 'kg';
}

function createCard() {
    let {image, name, weight, price, description} = product;
    document.querySelector('div.img img').src = image;
    document.querySelector('p.prod_name').innerHTML = name;
    document.querySelector('p.weight').innerHTML = serializeWeight(weight) + ", " + price + "$";
    document.querySelector('p.info').innerHTML = description;
}

createCard();

let counter = 1;

document.querySelectorAll('div.counter button').forEach((elem) => {
    let minus = elem.classList.contains("minus")
    elem.addEventListener('click', () => {
        if (minus) {
            document.querySelector('p.amount').innerHTML = (--counter).toString();
        } else {
            document.querySelector('p.amount').innerHTML = (++counter).toString();
        }
    })
})

document.querySelector('button.add_to_cart').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
        id: product.id,
        amount: counter,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    location.assign('index.html')
});
