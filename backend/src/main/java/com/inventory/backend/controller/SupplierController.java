package com.inventory.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final List<Supplier> suppliers = new ArrayList<>();

    @GetMapping
    public List<Supplier> getSuppliers() {
        return suppliers;
    }

    @PostMapping
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        supplier.setId(suppliers.size() + 1);
        suppliers.add(supplier);
        return supplier;
    }

    @PutMapping("/{id}")
    public Supplier updateSupplier(
            @PathVariable int id,
            @RequestBody Supplier updatedSupplier) {

        for (Supplier supplier : suppliers) {
            if (supplier.getId() == id) {
                supplier.setName(updatedSupplier.getName());
                supplier.setPhone(updatedSupplier.getPhone());
                supplier.setEmail(updatedSupplier.getEmail());
                return supplier;
            }
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteSupplier(@PathVariable int id) {

        suppliers.removeIf(supplier -> supplier.getId() == id);

        return "Supplier deleted successfully";
    }

    public static class Supplier {

        private int id;
        private String name;
        private String phone;
        private String email;

        public Supplier() {
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}