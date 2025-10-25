package com.examly.springapp.controller;

import com.examly.springapp.model.Loan;
import com.examly.springapp.service.RepaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "*")
public class LoanController {
    
    @Autowired
    private RepaymentService repaymentService;
    
    @PostMapping
    public ResponseEntity<Loan> addLoan(@RequestBody Loan loan) {
        Loan savedLoan = repaymentService.saveLoan(loan);
        return ResponseEntity.ok(savedLoan);
    }
    
    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = repaymentService.getAllLoans();
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/repayment")
    public ResponseEntity<List<Loan>> getRepaymentPlan(@RequestParam String method) {
        List<Loan> repaymentPlan = repaymentService.calculateRepaymentPlan(method);
        return ResponseEntity.ok(repaymentPlan);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        repaymentService.deleteLoan(id);
        return ResponseEntity.ok().build();
    }
}