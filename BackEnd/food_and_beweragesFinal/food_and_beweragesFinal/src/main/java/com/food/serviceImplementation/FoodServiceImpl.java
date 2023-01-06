package com.food.serviceImplementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.dto.FoodItemDto;
import com.food.dtomapperservice.*;
import com.food.entities.FoodItems;
import com.food.entities.ItemType;
import com.food.exceptions.EmptyFoodItemListException;
import com.food.exceptions.ItemNotFoundException;
import com.food.exceptions.NegativePriceException;
import com.food.exceptions.OfferPriceException;
import com.food.exceptions.QuantityNegativeException;
import com.food.repository.FoodListRepository;
import com.food.service.IFoodService;

@Service
public class FoodServiceImpl implements IFoodService {

	@Autowired
	FoodListRepository fooditemrepository;
	@Autowired(required = false)
	FoodItemDtoMapperService foodItemDtoMapperService;
	
	/*Adding a new item into menu list*/
	@Override
	public String addAnItem(FoodItems fooditem) {	
		if (fooditem.getActualPrice() <0 || fooditem.getOfferPrice() < 0) {
			throw new NegativePriceException("Price Can't be negative");
		} 
		else if(fooditem.getActualPrice()<fooditem.getOfferPrice()) {
			throw new OfferPriceException("Office price should be less than Actual price");
		}
		else if (fooditem.getQuantityAvailable() < 0) {
			throw new QuantityNegativeException("Quantity can't be negative or zero");
		}
		fooditemrepository.save(fooditem);
		return "Item Added Successfully";
	}
	
	/*Getting all food item list */
	@Override
	public List<FoodItemDto> allFoodItems() {
		
		List<FoodItems> foodItemList=fooditemrepository.findAll();
		if(foodItemList.isEmpty()) {
			throw new EmptyFoodItemListException("No food Items Found");
		}
		List<FoodItemDto> foodItemDtoList=new ArrayList<FoodItemDto>();
		for(FoodItems item:foodItemList) {
			foodItemDtoList.add(foodItemDtoMapperService.convertFoodListToDto(item));
		}
		return foodItemDtoList;
	}
	
	/*Getting food item list by catageory*/
	@Override
	public List<FoodItems> getFoodItemByCategory(ItemType catageory) {
		if(fooditemrepository.findByCategory(catageory).isEmpty()) {
		
			throw new EmptyFoodItemListException("No Item found with Selected Catageory");	
		}
		return (fooditemrepository.findByCategory(catageory));
	}
	/*Deleting an item by id*/
	@Override
	public String deleteFoodItem(int id) {
		if (!fooditemrepository.existsById(id)) {
			throw new ItemNotFoundException("Item Not Found to delete");
		}
		fooditemrepository.deleteById(id);
		return "Deleted Successfully";
	}
	/*Updating an existing item*/
	@Override
	public String updateExistingItem(FoodItems foodItem) {		
		if (!fooditemrepository.existsById(foodItem.getId())) {
			throw new ItemNotFoundException("Item Not Found to Update");
		}
		fooditemrepository.save(foodItem);
		return "Updated Successfully";
	}
	/*Update Quantity Available of an item*/

	@Override
	public String updateQuantityOfAnItem(int id, int quantity) {
		Optional<FoodItems> foodItem=fooditemrepository.findById(id);
		if(!fooditemrepository.existsById(id)) {
			throw new ItemNotFoundException("Item not found");
		}
		else if((foodItem.get().getQuantityAvailable()-quantity)<0) {
			throw new QuantityNegativeException("Selected quantity is more than Available quantity");
		}
		else if(((foodItem.get().getQuantityAvailable())-quantity)==0) {
			fooditemrepository.deleteById(id);
		}
		else {
		foodItem.get().setQuantityAvailable(foodItem.get().getQuantityAvailable()-quantity);
		fooditemrepository.save(foodItem.get());
		}
		return "Quantity Updated Successfully";
	}
	


}
