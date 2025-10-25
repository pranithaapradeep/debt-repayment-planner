package com.examly.springapp.service;

import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RepaymentService {
    
    @Autowired
    private LoanRepository loanRepository;
    
    public Loan saveLoan(Loan loan) {
        return loanRepository.save(loan);
    }
    
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }
    
    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }
    
    public List<Loan> calculateRepaymentPlan(String method) {
        List<Loan> loans = loanRepository.findAll();
        
        if ("snowball".equalsIgnoreCase(method)) {
            return loans.stream()
                    .sorted(Comparator.comparingDouble(Loan::getPrincipal))
                    .collect(Collectors.toList());
        } else if ("avalanche".equalsIgnoreCase(method)) {
            return loans.stream()
                    .sorted(Comparator.comparingDouble(Loan::getInterestRate).reversed())
                    .collect(Collectors.toList());
        }
        
        return loans;
    }
}