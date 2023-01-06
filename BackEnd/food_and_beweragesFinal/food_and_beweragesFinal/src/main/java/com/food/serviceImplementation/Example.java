package com.food.serviceImplementation;

import java.util.List;

import com.food.dto.FoodItemDto;
import com.food.entities.FoodItems;
import com.food.entities.ItemType;
import com.food.service.IFoodService;

public class Example implements IFoodService {

	@Override
	public String addAnItem(FoodItems fooditem) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FoodItemDto> allFoodItems() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteFoodItem(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String updateExistingItem(FoodItems foodItem) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FoodItems> getFoodItemByCategory(ItemType catageory) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String updateQuantityOfAnItem(int id, int quantity) {
		// TODO Auto-generated method stub
		return null;
	}

}
