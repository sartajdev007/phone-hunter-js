const loadPhones = async (searchValue, dataLimit) => {
    url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phones');
    phoneContainer.innerHTML = '';
    // to show limited search result and show all btn
    const showAll = document.getElementById('load-more');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // display no phones
    const noPhone = document.getElementById('not-found');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display phones
    for (let phone of phones) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                <button onclick="loadDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">Go somewhere</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(div);
    }
    // loader visibility
    toggleLoader(false);
}

// common function for search
const processSearch = (dataLimit) => {
    toggleLoader(true)
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadPhones(searchValue, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
})

document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key);
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

// toggle loader
const toggleLoader = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}

const loadDetails = id => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

const displayDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsLabel');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Already Released'}</p>
    <h5>Main Features:</h5>
    <p>Display Size: ${phone.mainFeatures.displaySize}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    `
}


// loadPhones();