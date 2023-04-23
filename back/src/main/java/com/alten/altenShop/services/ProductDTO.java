package com.alten.altenShop.services;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@NoArgsConstructor

public class ProductDTO {

    private Long id;

    private String code;

    private String name;

    private String description;

    private int price;

    private String category;

    private int quantity;

    private String inventoryStatus;

    private int rating;

}