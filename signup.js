function getData(api, func) {
    fetch(api).then((response) => {
        response.json().then(func)
    })
}

document.forms.user.addEventListener('submit', (event) => {
    const {email, password} = document.forms.user.elements;
    getData('api/users.json', (data) => {
        let signedIn = false
        data.items.forEach((elem) => {
            if (email.value === elem.email && password.value === elem.password) {
                localStorage.setItem('user', elem.id)
                window.location.assign('index.html')
                signedIn = true;
            }
        })
        if (!signedIn) {
            alert("Wrong email or password! Try again.")
            email.value = '';
            password.value = '';
        }
    })
    event.preventDefault()
    return false
})
