package com.food;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.food.dtomapperservice.*;
//import com.food.dto.FoodItemDtoMapperServiceImpl;


@SpringBootApplication
public class FoodAndBevaragesApplication {
	
	static Logger log=LogManager.getLogger(FoodAndBevaragesApplication.class);
	/*Main method*/
	public static void main(String[] args) {
		SpringApplication.run(FoodAndBevaragesApplication.class, args);
		log.info("Started Successfully");
		System.out.println("App Starting Successfully");
	}
	@Bean 
	public FoodItemDtoMapperService getFoodItemDtoMapperService() {
		return new FoodItemDtoMapperServiceImpl();
	}
}
