function init() {
    
    fetch('http://localhost:8000/api/cars')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('carList');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, sellerID: ${data.sellerID}, Brand: ${el.brand}, Model: ${el.model}</li>, Year: ${el.year}, Price: ${el.price}</li></li>`;
            });
        });

    
        document.getElementById('createButton').addEventListener('click', e => {
            e.preventDefault();
                
            const data = {
                id: document.getElementById('id').value,
                sellerID: document.getElementById('sellerID').value,
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                year: document.getElementById('year').value,
                price: document.getElementById('price').value
            };
        
            document.getElementById('id').value = '';
            document.getElementById('sellerID').value = '';
            document.getElementById('brand').value = '';
            document.getElementById('model').value = '';
            document.getElementById('year').value = '';
            document.getElementById('price').value = '';
        
            fetch('http://localhost:8000/api/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( data => {
                    document.getElementById('carList').innerHTML += `<li>ID: ${data.id}, sellerID: ${data.sellerID}, Brand: ${data.brand}, Model: ${data.model}, Year: ${data.year}, Price: ${data.price}</li>`;
                });
        });

}