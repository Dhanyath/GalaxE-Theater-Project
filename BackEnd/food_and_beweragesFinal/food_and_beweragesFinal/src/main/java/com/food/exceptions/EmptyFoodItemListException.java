package com.food.exceptions;


public class EmptyFoodItemListException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EmptyFoodItemListException() {
		// TODO Auto-generated constructor stub
	}

	public EmptyFoodItemListException(String message) {
		super(message);
		System.out.println(message);

		// TODO Auto-generated constructor stub
	}

	public EmptyFoodItemListException(Throwable cause) {
		super(cause);

		// TODO Auto-generated constructor stub
	}

	public EmptyFoodItemListException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public EmptyFoodItemListException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

}
