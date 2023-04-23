package com.alten.altenShop.controllers;

import com.alten.altenShop.services.ProductDTO;
import com.alten.altenShop.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping()
    public List<ProductDTO> getProducts() {
        return productService.findAllProduct();
    }

    @PostMapping()
    public ProductDTO addProduct(@RequestBody ProductDTO productDto) {
        return productService.createProduct(productDto);
    }

    @GetMapping("/{id}")
    public ProductDTO findProductById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PatchMapping("/{id}")
    public ProductDTO updateProduct(@RequestBody ProductDTO product, @PathVariable Long id) {
        return productService.updateProduct(product, id);
    }

    @DeleteMapping()
    public void deleteProducts(@RequestBody Set<Long> productsIds) {
        productService.deleteProducts(productsIds);
    }
}
