package com.sgdeals.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgdeals.server.Utils;
import com.sgdeals.server.model.Deal;
import com.sgdeals.server.service.UserService;

import jakarta.json.JsonObject;

@RestController
@RequestMapping(path="api/v1/user")
public class UserDealController {

    @Autowired
    private UserService userService;
    
    @GetMapping(path="/get-deal")
    public ResponseEntity<List<Deal>> getUserDeals(Authentication authentication){
        if (authentication!=null){
            String email = authentication.getName();
            List<Deal> userDeals = userService.getUserDeal(email);
            return ResponseEntity.ok(userDeals);
        }
        return ResponseEntity.status(401).body(null);
    }
    
    @PostMapping(path="/save-deal")
    public ResponseEntity<String> saveUserDeal(@RequestBody String payload){
        JsonObject emailAndDealIDs = Utils.payloadToJson(payload);
        boolean saveSuccess = userService.saveUserDeal(emailAndDealIDs);
        String response = "";
        if (saveSuccess){
            response = Utils.createResponse("message", "deals were successfully saved");
            return ResponseEntity.ok().body(response);
        }
        else{
            response = Utils.createResponse("message", "error saving deals");
            return ResponseEntity.status(500).body(response);
        }
    }
    
    @DeleteMapping(path="/delete-deal/{dealID}")
    public ResponseEntity<String> deleteUserDeal(@PathVariable String dealID, Authentication authentication){
        int deleteCount = userService.deleteUserDeal(authentication.getName(), dealID);
        String response = "";
        if (deleteCount == 1){
            response = Utils.createResponse("message", "successfully deleted");
            return ResponseEntity.ok(response);
        }
        else{
            response = Utils.createResponse("message", "Unknown error. Please try again later.");
            return ResponseEntity.status(500).body(response);
        }
    }


}
