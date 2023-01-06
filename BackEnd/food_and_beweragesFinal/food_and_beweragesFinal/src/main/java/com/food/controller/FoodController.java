package com.food.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.food.dto.FoodItemDto;
import com.food.entities.FoodItems;
import com.food.entities.ItemType;
import com.food.exceptions.EmptyFoodItemListException;
import com.food.exceptions.ItemNotFoundException;
import com.food.exceptions.NegativePriceException;
import com.food.exceptions.OfferPriceException;
import com.food.exceptions.QuantityNegativeException;
import com.food.service.IFoodService;


@RestController
@CrossOrigin(origins = "*")
public class FoodController {
	@Autowired
	IFoodService foodService;
	
	
	 
	Logger log=LogManager.getLogger(FoodController.class);
	
	/*Adding a new item into menu list*/
	
	@PostMapping//http://localhost:2122
	public ResponseEntity<String> addAfnItemToList(@RequestBody FoodItems fooditem) {
		try {
		return new ResponseEntity<>(foodService.addAnItem(fooditem),HttpStatus.OK);
		}
		catch(NegativePriceException e) {
			log.error(e.getMessage());
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
		}
		catch(OfferPriceException e) {
			log.error(e.getMessage());
		
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
		}
		catch(QuantityNegativeException e) {
			log.error(e.getMessage());
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_ACCEPTABLE);
		}
	}
	/*Getting all food item list */
	@GetMapping("/all") //http://localhost:2122/all
	public ResponseEntity<List<FoodItemDto>> getAllFoodItems() throws EmptyFoodItemListException{
		return new ResponseEntity<List<FoodItemDto>>(foodService.allFoodItems(),HttpStatus.OK);
	}
	
	/*Getting food item list by catageory*/
	@GetMapping("/all/{catageory}")//http://localhost:2122/all/{catageory}
	public ResponseEntity<List<FoodItems>> getAllFoodItemsByCatageory(@PathVariable("catageory") ItemType cat) throws EmptyFoodItemListException{
		return new ResponseEntity<List<FoodItems>>(foodService.getFoodItemByCategory(cat),HttpStatus.OK);
	
	}
	/*Deleting an item by id*/
	@DeleteMapping("/delete/{id}")//http://localhost:2122/delete/{id}
	public ResponseEntity<String> delete(@PathVariable("id") int id)throws ItemNotFoundException {
	
			return new ResponseEntity<String>(foodService.deleteFoodItem(id),HttpStatus.OK);
	}
		
	/*Updating an existing item*/
	@PutMapping("/update/item")//http://localhost:2122/update/item
	public ResponseEntity<String> updateItem(@RequestBody FoodItems foodItem) {
		try {
		return new ResponseEntity<String>(foodService.updateExistingItem(foodItem),HttpStatus.OK);
		}
		catch(ItemNotFoundException e) {
			log.error(e.getMessage());
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/update/quantityavailable/{id}/{quantity}")
	public ResponseEntity<String> updateQuantityOfanItem(@PathVariable("id") int id,@PathVariable("quantity") int quantity){
		try {
			return new ResponseEntity<String>(foodService.updateQuantityOfAnItem(id, quantity),HttpStatus.OK);
		}
		catch(ItemNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
		catch(QuantityNegativeException e	) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}


}
