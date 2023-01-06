package com.food.dtomapperservice;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.food.dto.FoodItemDto;
import com.food.entities.FoodItems;



@Mapper
public interface FoodItemDtoMapperService {
	@Mapping(target = "id",source = "foodItem.id")
	@Mapping(target = "name",source = "foodItem.name")
	@Mapping(target = "code",source = "foodItem.code")
	@Mapping(target = "description",source = "foodItem.description")
	@Mapping(target = "category",source = "foodItem.category")
	@Mapping(target="actualPrice",source="foodItem.actualPrice")
	@Mapping(target="offerPrice",source="foodItem.offerPrice")
	@Mapping(target="quantityAvailable",source="foodItem.quantityAvailable")
	@Mapping(target = "itemImageUrl",source = "foodItem.itemImageUrl")
	public FoodItemDto convertFoodListToDto(FoodItems foodItem);
	
	
	@Mapping(target = "id",source = "foodItemdto.id")
	@Mapping(target = "name",source = "foodItemdto.name")
	@Mapping(target = "code",source = "foodItemdto.code")
	@Mapping(target = "description",source = "foodItemdto.description")
	@Mapping(target = "category",source = "foodItemdto.category")
	@Mapping(target="actualPrice",source="foodItemdto.actualPrice")
	@Mapping(target="offerPrice",source="foodItemdto.offerPrice")
	@Mapping(target="quantityAvailable",source="foodItemdto.quantityAvailable")
	@Mapping(target = "itemImageUrl",source = "foodItemdto.itemImageUrl")
	public FoodItems convertFoodListToDtoEntity(FoodItemDto foodItemdto);

}
