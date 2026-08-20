const API = "http://localhost:8080/api";


function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document
        .getElementById(sectionId)
        .classList.add("active");

    if (sectionId === "dashboard") {
        loadDashboard();
    }

    if (sectionId === "products") {
        loadProducts();
    }

    if (sectionId === "suppliers") {
        loadSuppliers();
    }

    if (sectionId === "purchases") {
        loadPurchases();
    }

    if (sectionId === "sales") {
        loadSales();
    }

    if (sectionId === "reports") {
        loadDashboard();
    }
}


/* =========================
   DASHBOARD
========================= */

async function loadDashboard() {

    try {

        const products =
            await fetch(`${API}/products`).then(r => r.json());

        const suppliers =
            await fetch(`${API}/suppliers`).then(r => r.json());

        const purchases =
            await fetch(`${API}/purchases`).then(r => r.json());

        const sales =
            await fetch(`${API}/sales`).then(r => r.json());


        document.getElementById("productCount")
            .innerText = products.length;

        document.getElementById("supplierCount")
            .innerText = suppliers.length;

        document.getElementById("purchaseCount")
            .innerText = purchases.length;

        document.getElementById("salesCount")
            .innerText = sales.length;


        document.getElementById("reportProducts")
            .innerText = products.length;

        document.getElementById("reportSuppliers")
            .innerText = suppliers.length;

        document.getElementById("reportPurchases")
            .innerText = purchases.length;

        document.getElementById("reportSales")
            .innerText = sales.length;

    } catch (error) {

        console.error(error);

        alert(
            "Backend is not connected. Make sure Spring Boot is running."
        );
    }
}


/* =========================
   PRODUCTS
========================= */

async function loadProducts() {

    try {

        const response =
            await fetch(`${API}/products`);

        const products =
            await response.json();

        const table =
            document.getElementById("productTable");

        table.innerHTML = "";

        products.forEach(product => {

            table.innerHTML += `
                <tr>
                    <td>${product.productId}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td>
                    <td>${product.stockQuantity}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }
}


async function addProduct() {

    const product = {

        name:
            document.getElementById("productName").value,

        category:
            document.getElementById("productCategory").value,

        price:
            Number(
                document.getElementById("productPrice").value
            ),

        stockQuantity:
            Number(
                document.getElementById("productStock").value
            )
    };


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
            throw new Error("Failed to add product");
        }


        alert("Product added successfully!");

        document.getElementById("productName").value = "";
        document.getElementById("productCategory").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productStock").value = "";

        loadProducts();
        loadDashboard();

    } catch (error) {

        console.error(error);

        alert("Unable to add product.");
    }
}


/* =========================
   SUPPLIERS
========================= */

async function loadSuppliers() {

    try {

        const response =
            await fetch(`${API}/suppliers`);

        const suppliers =
            await response.json();

        const table =
            document.getElementById("supplierTable");

        table.innerHTML = "";

        suppliers.forEach(supplier => {

            table.innerHTML += `
                <tr>
                    <td>${supplier.supplierId}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.phone}</td>
                    <td>${supplier.email}</td>
                    <td>${supplier.address}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }
}


async function addSupplier() {

    const supplier = {

        name:
            document.getElementById("supplierName").value,

        phone:
            document.getElementById("supplierPhone").value,

        email:
            document.getElementById("supplierEmail").value,

        address:
            document.getElementById("supplierAddress").value
    };


    try {

        const response = await fetch(
            `${API}/suppliers`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(supplier)
            }
        );


        if (!response.ok) {
            throw new Error("Failed");
        }


        alert("Supplier added successfully!");

        loadSuppliers();
        loadDashboard();

    } catch (error) {

        console.error(error);

        alert("Unable to add supplier.");
    }
}


/* =========================
   PURCHASES
========================= */

async function loadPurchases() {

    try {

        const response =
            await fetch(`${API}/purchases`);

        const purchases =
            await response.json();

        const table =
            document.getElementById("purchaseTable");

        table.innerHTML = "";

        purchases.forEach(purchase => {

            table.innerHTML += `
                <tr>
                    <td>${purchase.purchaseId}</td>
                    <td>${purchase.productId}</td>
                    <td>${purchase.supplierId}</td>
                    <td>${purchase.quantity}</td>
                    <td>${purchase.purchasePrice}</td>
                    <td>${purchase.purchaseDate || ""}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }
}


async function addPurchase() {

    const purchase = {

        productId:
            Number(
                document.getElementById("purchaseProduct").value
            ),

        supplierId:
            Number(
                document.getElementById("purchaseSupplier").value
            ),

        quantity:
            Number(
                document.getElementById("purchaseQuantity").value
            ),

        purchasePrice:
            Number(
                document.getElementById("purchasePrice").value
            )
    };


    try {

        const response = await fetch(
            `${API}/purchases`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(purchase)
            }
        );


        if (!response.ok) {
            throw new Error("Failed");
        }


        alert("Purchase added successfully!");

        loadPurchases();
        loadProducts();
        loadDashboard();

    } catch (error) {

        console.error(error);

        alert("Unable to add purchase.");
    }
}


/* =========================
   SALES
========================= */

async function loadSales() {

    try {

        const response =
            await fetch(`${API}/sales`);

        const sales =
            await response.json();

        const table =
            document.getElementById("saleTable");

        table.innerHTML = "";

        sales.forEach(sale => {

            table.innerHTML += `
                <tr>
                    <td>${sale.saleId}</td>
                    <td>${sale.productId}</td>
                    <td>${sale.quantity}</td>
                    <td>${sale.salePrice}</td>
                    <td>${sale.saleDate || ""}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }
}


async function addSale() {

    const sale = {

        productId:
            Number(
                document.getElementById("saleProduct").value
            ),

        quantity:
            Number(
                document.getElementById("saleQuantity").value
            ),

        salePrice:
            Number(
                document.getElementById("salePrice").value
            )
    };


    try {

        const response = await fetch(
            `${API}/sales`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(sale)
            }
        );


        if (!response.ok) {
            throw new Error("Failed");
        }


        alert("Sale added successfully!");

        loadSales();
        loadProducts();
        loadDashboard();

    } catch (error) {

        console.error(error);

        alert("Unable to add sale.");
    }
}


/* =========================
   START
========================= */

window.onload = function () {

    loadDashboard();

};