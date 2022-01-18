function init(){

    fetch('http://127.0.0.1:8000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('carList');

            data.forEach( el => {
                lst.innerHTML += `<li class="id${data.id}">ID: ${el.id}, name: ${data.name}, Email: ${el.email}</li>`;
            });
        });

}