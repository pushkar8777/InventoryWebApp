package com.inventory.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/sales")
public class SaleController {

    private final List<Sale> sales = new ArrayList<>();

    @GetMapping
    public List<Sale> getSales() {
        return sales;
    }

    @PostMapping
    public Sale addSale(@RequestBody Sale sale) {
        sale.setId(sales.size() + 1);
        sales.add(sale);
        return sale;
    }

    @PutMapping("/{id}")
    public Sale updateSale(
            @PathVariable int id,
            @RequestBody Sale updatedSale) {

        for (Sale sale : sales) {
            if (sale.getId() == id) {
                sale.setProductId(updatedSale.getProductId());
                sale.setQuantity(updatedSale.getQuantity());
                sale.setSalePrice(updatedSale.getSalePrice());
                return sale;
            }
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteSale(@PathVariable int id) {

        sales.removeIf(sale -> sale.getId() == id);

        return "Sale deleted successfully";
    }

    public static class Sale {

        private int id;
        private int productId;
        private int quantity;
        private double salePrice;

        public Sale() {
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

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getSalePrice() {
            return salePrice;
        }

        public void setSalePrice(double salePrice) {
            this.salePrice = salePrice;
        }
    }
}