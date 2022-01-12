function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/api/cars', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('carList');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, sellerID: ${el.sellerID}, Brand: ${el.brand}, Model: ${el.model}, Year: ${el.year}, Price: ${el.price}</li>`;
            });
        });
}