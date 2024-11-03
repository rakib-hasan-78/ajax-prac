
function xmlGet(url , cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.response);
                cb(null , response)
            } else {
                cb(xhr.status);
            }
        }
    }
    xhr.send();
}

xmlGet('./custom.json', (error , resp)=>{
    if (error) {
        console.log(error)
    } else {
        resp.map(value=>console.log(value.contact_info.x));
    }
});


