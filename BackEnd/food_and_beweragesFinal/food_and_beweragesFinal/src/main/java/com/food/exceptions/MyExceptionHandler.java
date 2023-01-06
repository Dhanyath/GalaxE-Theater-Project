package com.food.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MyExceptionHandler {
	
	@ExceptionHandler(ItemNotFoundException.class)
	public ResponseEntity<ErrorMessage> getExceptionData(ItemNotFoundException exception){
		ErrorMessage errormessage=new ErrorMessage(404,exception.getMessage());
		return new ResponseEntity<>(errormessage,HttpStatus.NOT_FOUND);
	}
	@ExceptionHandler(EmptyFoodItemListException.class)
	public ResponseEntity<ErrorMessage> getExceptionData(EmptyFoodItemListException exception){
		ErrorMessage errormessage=new ErrorMessage(404,exception.getMessage());
		return new ResponseEntity<>(errormessage,HttpStatus.NOT_FOUND);
	}
}
