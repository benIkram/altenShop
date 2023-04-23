package com.alten.altenShop.services;

import com.alten.altenShop.exceptions.ProductNotFoundException;
import com.alten.altenShop.repository.ProductRepository;
import com.alten.altenShop.repository.entity.Product;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor

public class ProductServiceImp implements ProductService {

    public final ProductRepository productRepository;

    private final ModelMapper modelMapper;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = mapProductDTO(productDTO);

        Product savedProduct = productRepository.save(product);

        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public List<ProductDTO> findAllProduct() {
        return productRepository.findAll()
                .stream().map(this::mapProductEntity)
                .toList();
    }

    @Override
    public ProductDTO findById(Long id) {
        Product product = productRepository
                .findById(id).orElseThrow(() -> new ProductNotFoundException(id));

        return mapProductEntity(product);
    }

    @Override
    public ProductDTO updateProduct(ProductDTO productDTO, Long id) {
        Product foundProduct = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
        foundProduct.setCode(productDTO.getCode());
        foundProduct.setName(productDTO.getName());
        foundProduct.setDescription(productDTO.getDescription());
        foundProduct.setPrice(productDTO.getPrice());
        foundProduct.setCategory(productDTO.getCategory());
        foundProduct.setQuantity(productDTO.getQuantity());
        foundProduct.setInventoryStatus(productDTO.getInventoryStatus());

        productRepository.save(foundProduct);

        return modelMapper.map(foundProduct, ProductDTO.class);
    }

    @Override
    public void deleteProducts(Set<Long> productsIds) {
        productRepository.deleteAllById(productsIds);
    }

    private ProductDTO mapProductEntity(Product product) {
        return modelMapper.map(product, ProductDTO.class);
    }

    private Product mapProductDTO(ProductDTO productDTO) {
        return modelMapper.map(productDTO, Product.class);
    }

}
