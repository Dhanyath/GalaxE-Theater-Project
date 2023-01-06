package com.food.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="FoodItemsList")
public class FoodItems {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String code;
	private String name;
	private String description;
	@Enumerated(EnumType.STRING)
	private ItemType category;
	private double actualPrice;
	private double offerPrice;
	private int quantityAvailable;
	private String itemImageUrl;
	public FoodItems() {
		
	}
	public FoodItems(int id, String code, String name, String description,  ItemType category,
			double actualPrice, double offerPrice, int quantityAvailable, String itemImageUrl) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
		this.description = description;
		this.category = category;
		this.actualPrice = actualPrice;
		this.offerPrice = offerPrice;
		this.quantityAvailable = quantityAvailable;
		this.itemImageUrl = itemImageUrl;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ItemType getCategory() {
		return category;
	}
	public void setCategory(ItemType category) {
		this.category = category;
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
	public int getQuantityAvailable() {
		return quantityAvailable;
	}
	public void setQuantityAvailable(int quantityAvailable) {
		this.quantityAvailable = quantityAvailable;
	}
	public String getItemImageUrl() {
		return itemImageUrl;
	}



	public void setItemImageUrl(String itemImageUrl) {
		this.itemImageUrl = itemImageUrl;
	}



	@Override
	public String toString() {
		return "FoodItems [id=" + id + ", code=" + code + ", name=" + name + ", description=" + description
				+ ", category=" + category + ", actualPrice=" + actualPrice + ", offerPrice=" + offerPrice
				+ ", quantityAvailable=" + quantityAvailable + ", itemImageUrl=" + itemImageUrl + "]";
	}

	
	

}
