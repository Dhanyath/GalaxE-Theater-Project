package com.food.exceptions;

public class ErrorMessage {
	
	private int errorCode;
	private String message;
	public ErrorMessage(int errorCode, String message) {
		super();
		this.errorCode = errorCode;
		this.message = message;
	}
	public ErrorMessage() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
