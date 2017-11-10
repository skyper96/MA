package com.example.filip.clops;

/**
 * Created by Filip on 11/9/2017.
 */

public class Shop {
    private String name;
    private String address;
    private String email;
    private String netIncome;

    public String getName() {return this.name; }
    public String getAddress() {return this.address; }
    public String getEmail() {return this.email; }
    public String getNetIncome() {return this.netIncome; }
    public void setName(String name) { this.name = name; }
    public void setAddress(String address) { this.address = address; }
    public void setEmail(String email) { this.email = email; }
    public void setNetIncome(String netIncome) { this.netIncome = netIncome; }

    @Override
    public String toString() {
        return this.name + "\n" + this.address + "\n" + this.email + "\n" + this.netIncome;
    }
}
