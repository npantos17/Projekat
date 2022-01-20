function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    
    
    fetch('http://127.0.0.1:8000/api/cars', {
         headers: {
             'Authorization': `Bearer ${token}`
         }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('carList');

            data.forEach( el => {
                lst.innerHTML += `<li class="id${data.id}">ID: ${el.id}, sellerID: ${data.sellerID}, Brand: ${el.brand}, Model: ${el.model}, Year: ${el.year}, Price: ${el.price}</li>`;
            });
        });

    
        document.getElementById('createButton').addEventListener('click', e => {
            e.preventDefault();
            
            const data = {
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                year: document.getElementById('year').value,
                price: document.getElementById('price').value
            };
        
            document.getElementById('brand').value = '';
            document.getElementById('model').value = '';
            document.getElementById('year').value = '';
            document.getElementById('price').value = '';
        
            fetch('http://127.0.0.1:8000/api/cars', {
                method: 'POST',
                headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                //.then(res => alert(res.msg))
                .then( res => res.json() )
                .then( data => {
                    if(data.msg){
                        alert(data.msg)
                    }else{
                    document.getElementById('carList').innerHTML += `<li class="id${data.id}">ID: ${data.id}, sellerID: ${data.sellerID}, Brand: ${data.brand}, Model: ${data.model}, Year: ${data.year}, Price: ${data.price}</li>`;
                    }
                });
        });
        document.getElementById('deleteButton').addEventListener('click', e=>{
            e.preventDefault
            var id = document.getElementById('idToDelete').value
            document.getElementById('idToDelete').value = '';
            fetch('http://127.0.0.1:8000/api/cars/' + id, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
        });
         document.getElementById('putButton').addEventListener('click', e=>{
             e.preventDefault
             var id = document.getElementById('id').value
             const data = {
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                year: document.getElementById('year').value,
                price: document.getElementById('price').value
            };
            var a = document.getElementsByClassName("id"+id)
            document.getElementById('brand').value = '';
            document.getElementById('model').value = '';
            document.getElementById('year').value = '';
            document.getElementById('price').value = '';
            //console.log(a[0].innerHTML)
             fetch('http://127.0.0.1:8000/api/cars/' + id, {
                 method: 'PUT',
                 headers: { 
                     'Content-Type': 'application/json' ,
                     'Authorization': `Bearer ${token}`
                },
                 body: JSON.stringify(data)
             })
             .then(res => res.json())
             //.then(document.getElementsByClassName("id"+id)[0].innerHTML = `ID: ${data.id}, sellerID: ${data.sellerID}, Brand: ${data.brand}, Model: ${data.model}</li>, Year: ${data.year}, Price: ${data.price})`)
         });

}