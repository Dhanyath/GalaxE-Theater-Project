package com.food.exceptions;

@SuppressWarnings("serial")
public class QuantityNegativeException extends RuntimeException {

	public QuantityNegativeException() {
		// TODO Auto-generated constructor stub
	}

	public QuantityNegativeException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public QuantityNegativeException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public QuantityNegativeException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public QuantityNegativeException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

}
