let products = [];
let uniqueCategories = new Set();
let sortField = null;
let sortAsc = true;

function productRender(productsToDisplay) {
    $("tbody").empty();
    for (let product of productsToDisplay) {
        const tbody = $("tbody");

        tbody.append(`<tr>
                <td><a href="${product.images[0]}">View Image</a></td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.category.name}</td>
                <td>${product.description}</td>
                <td>${product.creationAt}</td>
                <td>${product.updatedAt}</td></tr>`)
    }
}

function populateCategories(allProducts) {
    const select = $("#category-select");
    select.empty();
    select.append('<option value="">All Categories</option>');

    // collect categories from products
    allProducts.forEach(product => {
        if (product.category.name) {
            uniqueCategories.add(product.category.name);
        }
    });

    // add categories
    uniqueCategories.forEach(category => {
        select.append(`<option value="${category}">${category}</option>`);
    });
}

function applyFilters() {
    const searchTerm = $("#search-input").val().toLowerCase();
    const selectedCategory = $("#category-select").val();
    const minPrice = parseFloat($("#min-price").val());

    // max value 
    const maxPriceInput = $("#max-price").val();
    const maxPrice = maxPriceInput ? parseFloat(maxPriceInput) : Infinity;

    // apply filters
    const filteredProducts = products.filter(product => {
        let matchesSearch = true;
        let matchesCategory = true;
        let matchesPrice = true;

        // search filter
        if (searchTerm) {
            const title = product.title ? product.title.toLowerCase() : '';
            const description = product.description ? product.description.toLowerCase() : '';
            matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        }

        // category filter
        if (selectedCategory) {
            matchesCategory = product.category && product.category.name === selectedCategory;
        }

        // price filter
        const price = parseFloat(product.price);
        matchesPrice = (price >= minPrice) && (price <= maxPrice);


        return matchesSearch && matchesCategory && matchesPrice;
    });

    // sort logic
    if (sortField) {
        filteredProducts.sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
            return 0;
        });
    }
    productRender(filteredProducts);
}

// sort logic
$("th[data-sort]").on("click", function () {
    sortField = $(this).data("sort");
    sortAsc = !sortAsc;
    applyFilters();
});

$(window).ready(() => {

    const Url = 'https://api.escuelajs.co/api/v1/products';
    const request = new XMLHttpRequest();

    request.onload = () => {

        if (request.status == 200) {
            products = JSON.parse(request.responseText);
            // function for render products
            productRender(products);
            // function for populate category selector
            populateCategories(products);

        } else {
            $("#error-msg").empty();
            $("#error-msg").append("Error fetching data"); // show error message without using alert()
        }
        console.log(products[1])
    }

    request.open('GET', Url, true);
    request.send();

    $(".apply-filters-btn").on("click", applyFilters);
    $("#category-select").on("change", applyFilters);

    $(".clear-filters-btn").on("click", () => {
        // reset inputs to clear
        $("#search-input").val("");
        $("#category-select").val("");
        $("#min-price").val("0");
        $("#max-price").val("");

        // render the original products
        productRender(products);
    });
})
