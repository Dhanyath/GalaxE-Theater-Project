package com.food.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.food.entities.FoodItems;
import com.food.entities.ItemType;
@Repository
public interface FoodListRepository extends JpaRepository<FoodItems,Integer> {
	public List<FoodItems> findByCategory(ItemType catageory);

}
