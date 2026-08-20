package com.inventory.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {
    private final List<Product> products = new ArrayList<>();

    // GET ALL PRODUCTS
    @GetMapping
    public List<Product> getProducts() {
        return products;
    }

    // ADD PRODUCT
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        product.setId(products.size() + 1);
        products.add(product);
        return product;
    }

    // UPDATE PRODUCT
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable int id,
            @RequestBody Product updatedProduct) {

        for (Product product : products) {
            if (product.getId() == id) {

                product.setProduct_name(updatedProduct.getProduct_name());
                product.setCategory(updatedProduct.getCategory());
                product.setQuantity(updatedProduct.getQuantity());
                product.setPrice(updatedProduct.getPrice());

                return product;
            }
        }

        return null;
    }

    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable int id) {

        products.removeIf(product -> product.getId() == id);

        return "Product deleted successfully";
    }

    // PRODUCT CLASS
    public static class Product {

        private int id;
        private String product_name;
        private String category;
        private int quantity;
        private double price;

        public Product() {
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getProduct_name() {
            return product_name;
        }

        public void setProduct_name(String product_name) {
            this.product_name = product_name;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}