package com.food.dto;

import com.food.entities.ItemType;

public class FoodItemDto {
	private int id;
	private String name;
	private String code;
	private String description;
	private ItemType category;
	private double actualPrice;
	private double offerPrice;
	private int quantityAvailable;
	private String itemImageUrl;
	
	public FoodItemDto() {
		super();
	
	}
	
	public FoodItemDto(int id, String name, String code, String description, String itemImageUrl, ItemType category,
			int quantityAvailable, double actualPrice, double offerPrice) {
		super();
		this.id = id;
		this.name = name;
		this.code = code;
		this.description = description;
		this.itemImageUrl = itemImageUrl;
		this.category = category;
		this.quantityAvailable = quantityAvailable;
		this.actualPrice = actualPrice;
		this.offerPrice = offerPrice;
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
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getItemImageUrl() {
		return itemImageUrl;
	}
	public void setItemImageUrl(String itemImageUrl) {
		this.itemImageUrl = itemImageUrl;
	}
	public ItemType getCategory() {
		return category;
	}
	public void setCategory(ItemType category) {
		this.category = category;
	}
	public int getQuantityAvailable() {
		return quantityAvailable;
	}
	public void setQuantityAvailable(int quantityAvailable) {
		this.quantityAvailable = quantityAvailable;
	}
	public double getActualPrice() {
		return actualPrice;
	}
	public void setActualPrice(double actualPrice) {
		this.actualPrice = actualPrice;
	}
	public double getOfferPrice() {
		return offerPrice;
	}
	public void setOfferPrice(double offerPrice) {
		this.offerPrice = offerPrice;
	}	
}
