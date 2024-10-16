
var xhttp = new XMLHttpRequest();
var data = [];
xhttp.open("GET", "https://fakestoreapi.com/products");
xhttp.send();
var e = '';

xhttp.onreadystatechange = () => {
    console.log(xhttp.readyState);
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        data = JSON.parse(xhttp.responseText);
        displayProducts(data);
    }
}

function displayProducts(products) {
    e = '';
    products.forEach((item) => {
        e += `
        <div class="card col-4 p-4" style="width: 18rem;">
            <div class="container me-3">
                <i class="fa-solid fa-heart" style="color: #c7c7c7;"></i>
            </div>
            <img src=${item.image} class="container mt-4" alt="..." height='150px' width='100px'>
            <div class="card-body text-center">
                <h5 class="card-title text-truncate" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</h5>
                <h6 class="card-text mb-4">${item.category}</h6>
                <p class="card-text text-truncate" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.description}</p>
                <a href="#" class="btn btn-success">$${item.price}</a>
                <a href="#" class="btn btn-light"><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${item.rating.rate}</a>
            </div>
        </div>
        `;
    });
    document.querySelector('#pro').innerHTML = e;
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.querySelector('#search-input').value.toLowerCase();
    const filteredProducts = data.filter(item => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
    displayProducts(filteredProducts);
});
