package com.sgdeals.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sgdeals.server.model.Deal;
import com.sgdeals.server.service.DealFinderService;

@RestController
@RequestMapping(path="api/v1")
public class DealController {
    
    @Autowired
    private DealFinderService dealFinder;

    @GetMapping(path="/deals/{category}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Deal>> getDealsByCategory(@PathVariable String category){
        List<Deal> deals = dealFinder.getDealsByCategory(category);
        return ResponseEntity.ok(deals);
    }

    @GetMapping(path="/deals", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Deal>> getDealsByKeyword(@RequestParam String keyword){
        List<Deal> deals = dealFinder.getDealsByKeyword(keyword);
        return ResponseEntity.ok(deals);
    }

}
