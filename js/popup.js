let longUrlTxt = document.querySelector("#longUrl");
let createBtn = document.querySelector("#create");
let shortUrlTxt = document.querySelector("#shortUrl");
let longUrlErrorDiv = document.querySelector("#longUrldiv");
let longUrlErrorlbl = document.querySelector("#longUrlError");
let successMsgToast = document.querySelector("#successMsg");
let errorMsgToast = document.querySelector(".toast-error");
let loader = document.querySelector('.loading');

createBtn.addEventListener('click', () => {
    if(longUrlTxt.value){
        longUrlErrorDiv.classList.remove('has-error');
        longUrlErrorlbl.classList.remove("d-visible");
        longUrlErrorlbl.classList.add("d-hide");
        errorMsgToast.classList.add("d-hide");
        successMsgToast.classList.add("d-hide");
        loader.classList.remove('d-hide');

        chrome.storage.local.get(['ApiToken'], function (result) {
        fetch(new URL("https://t.ly/api/v1/link/shorten"), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ 
                "long_url": longUrlTxt.value,
                "domain": "https://t.ly/",
                "api_token": result.ApiToken
            })
        }).then(response => response.json()).then(json => {
            shortUrlTxt.classList.remove('d-hide');
            loader.classList.add('d-hide');                
            successMsgToast.classList.remove("d-hide");
            shortUrlTxt.value=json.short_url;
            longUrlTxt.value="";
        }).catch(error => {
            loader.classList.add('d-hide');
            errorMsgToast.classList.remove("d-hide");
            errorMsgToast.textContent = error;
            })
        })
    }
    else{
        longUrlErrorDiv.classList.add('has-error');
        longUrlErrorlbl.classList.remove("d-hide");
        longUrlErrorlbl.classList.add("d-visible");        
    }
});

shortUrlTxt.addEventListener('click', () => {
    shortUrlTxt.select();    
    document.execCommand("copy");
});