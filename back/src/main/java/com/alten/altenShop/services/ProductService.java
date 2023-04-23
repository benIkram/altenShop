package com.alten.altenShop.services;

import java.util.List;
import java.util.Set;

public interface ProductService {
    ProductDTO createProduct(ProductDTO product);

    List<ProductDTO> findAllProduct();

    ProductDTO findById(Long id);

    ProductDTO updateProduct(ProductDTO product, Long id);

    void deleteProducts(Set<Long> productsIds);
}
