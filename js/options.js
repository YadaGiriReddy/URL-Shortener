let saveBtn = document.querySelector("#save");
let apiToken = document.querySelector("#apiToken")
let toastError = document.querySelector('.toast-error')
let toastSuccess = document.querySelector('.toast-success')

saveBtn.addEventListener('click', () => {
    if (apiToken.value) {
        toastError.classList.add('d-hide');
        toastSuccess.classList.remove('d-hide');
        chrome.storage.local.set({"ApiToken": apiToken.value }, function () {
            console.log('API Token value is saved successfully..');
        });
    } else {
        toastError.classList.remove('d-hide');
    }
})