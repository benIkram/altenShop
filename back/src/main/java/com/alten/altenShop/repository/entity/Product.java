package com.alten.altenShop.repository.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Lob
    @Column(name = "image", columnDefinition="BLOB")
    private byte[] image;

    @Column(name = "price")
    private int price;
    @Column(name = "category")
    private String category;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "inventoryStatus")
    private String inventoryStatus;
    @Column(name = "rating")
    private int rating;


}