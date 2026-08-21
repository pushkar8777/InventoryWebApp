const API = "https://pushkar-webapp-backend.onrender.com/api";

/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.style.display = "block";
    }
}


/* =========================================================
   LOAD ALL DATA
========================================================= */

async function loadData() {
    try {
        const productsResponse = await fetch(`${API}/products`);

        if (!productsResponse.ok) {
            throw new Error(`Products: ${productsResponse.status}`);
        }

        const products = await productsResponse.json();

        const suppliersResponse = await fetch(`${API}/suppliers`);

        if (!suppliersResponse.ok) {
            throw new Error(`Suppliers: ${suppliersResponse.status}`);
        }

        const suppliers = await suppliersResponse.json();

        const purchasesResponse = await fetch(`${API}/purchases`);

        if (!purchasesResponse.ok) {
            throw new Error(`Purchases: ${purchasesResponse.status}`);
        }

        const purchases = await purchasesResponse.json();

        const salesResponse = await fetch(`${API}/sales`);

        if (!salesResponse.ok) {
            throw new Error(`Sales: ${salesResponse.status}`);
        }

        const sales = await salesResponse.json();

        console.log("Products:", products);
        console.log("Suppliers:", suppliers);
        console.log("Purchases:", purchases);
        console.log("Sales:", sales);

        displayProducts(products);
        displaySuppliers(suppliers);
        displayPurchases(purchases);
        displaySales(sales);

    } catch (error) {
        console.error("Backend error:", error);
    }
}


/* =========================================================
   PRODUCT
========================================================= */

async function addProduct() {

    const nameElement = document.getElementById("productName");
    const categoryElement = document.getElementById("productCategory");
    const priceElement = document.getElementById("productPrice");
    const stockElement = document.getElementById("productStock");

    if (!nameElement || !categoryElement || !priceElement || !stockElement) {
        console.error("Product form elements not found.");
        return;
    }

    const productName = nameElement.value.trim();
    const category = categoryElement.value.trim();
    const price = Number(priceElement.value);
    const quantity = Number(stockElement.value);

    if (!productName || !category) {
        alert("Please enter product name and category.");
        return;
    }

    if (isNaN(price) || isNaN(quantity)) {
        alert("Please enter valid price and stock.");
        return;
    }

    /*
     * These names MUST match ProductController.java
     */
    const product = {
        product_name: productName,
        category: category,
        quantity: quantity,
        price: price
    };

    console.log("Sending:", product);

    try {

        const response = await fetch(`${API}/products`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(product)
        });

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "Add product failed:",
                response.status,
                errorText
            );

            throw new Error("Failed to add product");
        }

        const savedProduct = await response.json();

        console.log("Saved product:", savedProduct);

        alert("Product added successfully!");

        nameElement.value = "";
        categoryElement.value = "";
        priceElement.value = "";
        stockElement.value = "";

        await loadData();

    } catch (error) {

        console.error("Add product error:", error);

        alert("Failed to add product.");
    }
}


/* =========================================================
   DISPLAY PRODUCTS
========================================================= */

function displayProducts(products) {

    /*
     * Supports the table ID used by the existing project.
     */
    const table =
        document.getElementById("productTable") ||
        document.getElementById("productTableBody");

    if (!table) {
        console.warn("Product table not found.");
        return;
    }

    table.innerHTML = "";

    if (!products || products.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">No products available</td>
            </tr>
        `;

        return;
    }

    products.forEach(product => {

        table.innerHTML += `
            <tr>
                <td>${product.id ?? ""}</td>
                <td>${product.product_name ?? ""}</td>
                <td>${product.category ?? ""}</td>
                <td>${product.price ?? 0}</td>
                <td>${product.quantity ?? 0}</td>
            </tr>
        `;

    });
}


/* =========================================================
   SUPPLIERS
========================================================= */

function displaySuppliers(suppliers) {

    const table =
        document.getElementById("supplierTable") ||
        document.getElementById("supplierTableBody");

    if (!table) {
        console.warn("Supplier table not found.");
        return;
    }

    table.innerHTML = "";

    if (!suppliers || suppliers.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4">No suppliers available</td>
            </tr>
        `;

        return;
    }

    suppliers.forEach(supplier => {

        table.innerHTML += `
            <tr>
                <td>${supplier.id ?? ""}</td>
                <td>${supplier.name ?? ""}</td>
                <td>${supplier.phone ?? ""}</td>
                <td>${supplier.email ?? ""}</td>
            </tr>
        `;

    });
}


/* =========================================================
   PURCHASES
========================================================= */

function displayPurchases(purchases) {

    const table =
        document.getElementById("purchaseTable") ||
        document.getElementById("purchaseTableBody");

    if (!table) {
        console.warn("Purchase table not found.");
        return;
    }

    table.innerHTML = "";

    if (!purchases || purchases.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">No purchases available</td>
            </tr>
        `;

        return;
    }

    purchases.forEach(purchase => {

        table.innerHTML += `
            <tr>
                <td>${purchase.id ?? ""}</td>
                <td>${purchase.productId ?? ""}</td>
                <td>${purchase.supplierId ?? ""}</td>
                <td>${purchase.quantity ?? 0}</td>
                <td>${purchase.purchasePrice ?? 0}</td>
            </tr>
        `;

    });
}


/* =========================================================
   SALES
========================================================= */

function displaySales(sales) {

    const table =
        document.getElementById("salesTable") ||
        document.getElementById("salesTableBody");

    if (!table) {
        console.warn("Sales table not found.");
        return;
    }

    table.innerHTML = "";

    if (!sales || sales.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4">No sales available</td>
            </tr>
        `;

        return;
    }

    sales.forEach(sale => {

        table.innerHTML += `
            <tr>
                <td>${sale.id ?? ""}</td>
                <td>${sale.productId ?? ""}</td>
                <td>${sale.quantity ?? 0}</td>
                <td>${sale.salePrice ?? 0}</td>
            </tr>
        `;

    });
}


/* =========================================================
   DELETE PRODUCT
========================================================= */

async function deleteProduct(id) {

    try {

        const response = await fetch(
            `${API}/products/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        alert("Product deleted successfully!");

        await loadData();

    } catch (error) {

        console.error("Delete product error:", error);

        alert("Failed to delete product.");
    }
}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Inventory Web App loaded.");

    loadData();

});