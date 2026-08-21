package com.inventory.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final List<Purchase> purchases = new ArrayList<>();

    @GetMapping
    public List<Purchase> getPurchases() {
        return purchases;
    }

    @PostMapping
    public Purchase addPurchase(@RequestBody Purchase purchase) {
        purchase.setId(purchases.size() + 1);
        purchases.add(purchase);
        return purchase;
    }

    @PutMapping("/{id}")
    public Purchase updatePurchase(
            @PathVariable int id,
            @RequestBody Purchase updatedPurchase) {

        for (Purchase purchase : purchases) {
            if (purchase.getId() == id) {
                purchase.setProductId(updatedPurchase.getProductId());
                purchase.setSupplierId(updatedPurchase.getSupplierId());
                purchase.setQuantity(updatedPurchase.getQuantity());
                purchase.setPurchasePrice(updatedPurchase.getPurchasePrice());
                return purchase;
            }
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deletePurchase(@PathVariable int id) {

        purchases.removeIf(purchase -> purchase.getId() == id);

        return "Purchase deleted successfully";
    }

    public static class Purchase {

        private int id;
        private int productId;
        private int supplierId;
        private int quantity;
        private double purchasePrice;

        public Purchase() {
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public int getProductId() {
            return productId;
        }

        public void setProductId(int productId) {
            this.productId = productId;
        }

        public int getSupplierId() {
            return supplierId;
        }

        public void setSupplierId(int supplierId) {
            this.supplierId = supplierId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPurchasePrice() {
            return purchasePrice;
        }

        public void setPurchasePrice(double purchasePrice) {
            this.purchasePrice = purchasePrice;
        }
    }
}