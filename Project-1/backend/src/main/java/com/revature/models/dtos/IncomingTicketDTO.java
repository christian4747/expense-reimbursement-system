package com.revature.models.dtos;

public class IncomingTicketDTO {

    private String description;
    private double amount;

    public IncomingTicketDTO() {
    }

    public IncomingTicketDTO(String description, double amount) {
        this.description = description;
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "IncomingTicketDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                '}';
    }
}
