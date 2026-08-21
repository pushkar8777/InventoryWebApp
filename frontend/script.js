const API = "https://pushkar-webapp-backend.onrender.com/api";

/* =========================================================
   LOAD DASHBOARD DATA
========================================================= */

async function loadDashboard() {
    try {
        const productsResponse = await fetch(`${API}/products`);
        if (!productsResponse.ok) {
            throw new Error("Products API error");
        }
        const products = await productsResponse.json();

        const suppliersResponse = await fetch(`${API}/suppliers`);
        if (!suppliersResponse.ok) {
            throw new Error("Suppliers API error");
        }
        const suppliers = await suppliersResponse.json();

        const purchasesResponse = await fetch(`${API}/purchases`);
        if (!purchasesResponse.ok) {
            throw new Error("Purchases API error");
        }
        const purchases = await purchasesResponse.json();

        const salesResponse = await fetch(`${API}/sales`);
        if (!salesResponse.ok) {
            throw new Error("Sales API error");
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

        updateDashboardCounts(
            products,
            suppliers,
            purchases,
            sales
        );

    } catch (error) {
        console.error("Backend error:", error);
    }
}


/* =========================================================
   PRODUCTS
========================================================= */

async function addProduct() {

    const productName =
        document.getElementById("productName").value.trim();

    const productCategory =
        document.getElementById("productCategory").value.trim();

    const productPrice =
        document.getElementById("productPrice").value;

    const productStock =
        document.getElementById("productStock").value;

    if (!productName || !productCategory || !productPrice || !productStock) {
        alert("Please fill all product fields.");
        return;
    }

    /*
     * IMPORTANT:
     * These names MUST match ProductController.java
     */
    const product = {
        product_name: productName,
        category: productCategory,
        quantity: Number(productStock),
        price: Number(productPrice)
    };

    console.log("Sending product:", product);

    try {

        const response = await fetch(
            `${API}/products`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(product)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Add product error:", errorText);
            throw new Error("Failed to add product");
        }

        const savedProduct = await response.json();

        console.log("Saved product:", savedProduct);

        alert("Product added successfully!");

        document.getElementById("productName").value = "";
        document.getElementById("productCategory").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productStock").value = "";

        await loadDashboard();

    } catch (error) {

        console.error("Error adding product:", error);

        alert("Failed to add product.");
    }
}


/* =========================================================
   DISPLAY PRODUCTS
========================================================= */

function displayProducts(products) {

    const table = document.getElementById("productTable");

    if (!table) {
        console.warn("productTable not found");
        return;
    }

    table.innerHTML = "";

    if (products.length === 0) {

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
                <td>${product.id}</td>
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

    const table = document.getElementById("supplierTable");

    if (!table) {
        console.warn("supplierTable not found");
        return;
    }

    table.innerHTML = "";

    if (suppliers.length === 0) {

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

    const table = document.getElementById("purchaseTable");

    if (!table) {
        console.warn("purchaseTable not found");
        return;
    }

    table.innerHTML = "";

    if (purchases.length === 0) {

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

    const table = document.getElementById("salesTable");

    if (!table) {
        console.warn("salesTable not found");
        return;
    }

    table.innerHTML = "";

    if (sales.length === 0) {

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
   DASHBOARD COUNTS
========================================================= */

function updateDashboardCounts(
    products,
    suppliers,
    purchases,
    sales
) {

    const productCount =
        document.getElementById("productCount");

    const supplierCount =
        document.getElementById("supplierCount");

    const purchaseCount =
        document.getElementById("purchaseCount");

    const salesCount =
        document.getElementById("salesCount");


    if (productCount) {
        productCount.textContent = products.length;
    }

    if (supplierCount) {
        supplierCount.textContent = suppliers.length;
    }

    if (purchaseCount) {
        purchaseCount.textContent = purchases.length;
    }

    if (salesCount) {
        salesCount.textContent = sales.length;
    }
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
            throw new Error("Failed to delete product");
        }

        alert("Product deleted successfully!");

        await loadDashboard();

    } catch (error) {

        console.error("Delete error:", error);

        alert("Failed to delete product.");
    }
}


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Inventory Web App started");

    loadDashboard();

});