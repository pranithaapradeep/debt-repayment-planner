package com.examly.springapp.model;

import javax.persistence.*;

@Entity
@Table(name = "loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String loanName;
    private double principal;
    private double interestRate;
    private int termMonths;
    
    public Loan() {}
    
    public Loan(String loanName, double principal, double interestRate, int termMonths) {
        this.loanName = loanName;
        this.principal = principal;
        this.interestRate = interestRate;
        this.termMonths = termMonths;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getLoanName() { return loanName; }
    public void setLoanName(String loanName) { this.loanName = loanName; }
    
    public double getPrincipal() { return principal; }
    public void setPrincipal(double principal) { this.principal = principal; }
    
    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double interestRate) { this.interestRate = interestRate; }
    
    public int getTermMonths() { return termMonths; }
    public void setTermMonths(int termMonths) { this.termMonths = termMonths; }
}