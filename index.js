/* asyncronous with callback */
function xmlGet(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.response);
                cb(null, response);
            } else {
                cb(xhr.status);
            }
        }
    };
    xhr.send();
}

xmlGet('./custom.json', (error, resp)=>{
    if (error) {
        console.log(`Error : ${error}`)
    } else {
        let output = '';
        resp.forEach(data=>{
            const {facebook , instagram,  x ,  mobile_no} = data.contact_info;
            output+=`
                <ol>
                <li>ID: ${data.id}</li>
                <li>Name: ${data.person}</li>
                <li>Age: ${data.age}</li>
                <li>Gender: ${data.sex}</li>
                <li>Height: ${data.height}</li>
                <li>Address: ${data.address}</li>
                <li>Nationality: ${data.nationality}</li>
                <li>Profession: ${data.profession}</li>
                <li>Country: ${data.country}</li>
                <li>Name: Facebook : ${facebook}, Instagram: ${instagram}, X: ${x}, Mobile No: ${mobile_no}</li>
                </ol>
            `
        });

        document.getElementById('data-info').innerHTML=output;
    }
})

/* asyn with promise   */

function getRequestWithPromise(url) {

    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                try {
                    let data = JSON.parse(xhr.response);
                    resolve(data)
                } catch (error) {
                    reject(`Parsing error: ${error.message}`)
                }
              } else {
                reject(`Error: ${xhr.status} - ${xhr.statusText}`)
              }  
            } 
        }
        xhr.send();
    })
}

getRequestWithPromise('https://fakestoreapi.com/products')
    .then((reponse) => {
        let output = '';
        reponse.forEach(data=>{
            const {rate = 'N/A', count = 'N/A'} = data.reponse || {};
            output+=`
                <div class="col col-xl-4 col-md-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${data.image}" class="card-img-top" alt="${data.title}">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.description}</p>
                            <div class="d-flex align-items-center justify-content-between">
                                <span>Price: $${data.price}</span>
                                <span>Category: ${data.category}</span>
                            </div>
                            <div class="d-flex align-items-center justify-content-between">
                                <span>Product ID: ${data.id}</span>
                                <span>Rating: ${rate}, Sold: ${count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
        document.querySelector('.row').innerHTML = output;
    })
    .catch(error => console.error("Promise rejection error:", error));

/* 

  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },

    <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
 */

