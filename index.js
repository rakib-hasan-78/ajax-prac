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
            const {rate , count} = data.rating;
            output+=`
                <div class="col">
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

    const delay = s=> new Promise(resol=> setTimeout(resol ,s*1000));
    delay(2)
        .then(()=>console.log('2 sec delay'))
    delay(3)
        .then(()=>console.log('3 sec delay'))
    delay(4)
        .then(()=>console.log('4 sec delay'))
    delay(5)
        .then(()=>console.log('5 sec delay'))

/* async task handle  using fetch API */
function getRequestWithFetch(url) {
    fetch(url)
    .then(response=>response.json())
    .then(response=>{
        let output =''
        response.map(data=>{
            output+= `

                <div class="col col-xl-4 my-2">
                    <div class="card w-100" style="width: 18rem;">
                        <img src="${data.avatar}" class="card-img-top" alt="${data.name}">
                        <div class="card-body">
                            <h5 class="card-title text-center">Name : ${data.name}</h5>
                            <p class="card-text text-center">Email: ${data.email}</p>
                            <div class="d-flex align-items-center justify-content-between">
                                <span>User ID: $${data.id}</span>
                                <span>User Role: ${data.role}</span>
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <span>Location: ${data.creationAt}</span>
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <span>User Password: ${data.password}</span>
                            </div>
                        </div>
                    </div>
                </div>

            `
        });
        document.getElementById('user-data').innerHTML = output;
    })
}

getRequestWithFetch('https://api.escuelajs.co/api/v1/users');