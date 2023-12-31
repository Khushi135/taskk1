document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

function displayData(products) {
    // Sort products based on descending popularity
    const sortedProducts = products.sort((a, b) => b.Popularity - a.Popularity);

    // Create HTML for the product table
    const productListTable = document.getElementById('productList');
    sortedProducts.forEach(product => {
        const row = productListTable.insertRow();
        row.insertCell(0).innerText = product.Title;
        row.insertCell(1).innerText = `$${product.Price.toFixed(2)}`;
        row.insertCell(2).innerText = product.Popularity;
    });
}
