package com.sgdeals.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgdeals.server.Utils;
import com.sgdeals.server.service.UserService;

import jakarta.json.JsonObject;

@RestController
@RequestMapping(path="api/v1")
public class RegistrationController {

    @Autowired
    private UserService userService;
    
    @PostMapping(path="/register")
    public ResponseEntity<String> registerNewUser(@RequestBody String payload){
        JsonObject userDetails = Utils.payloadToJson(payload);
        String email = userDetails.getString("email");
        String response = "";
        if (userService.userExists(email)){
            response = Utils.createResponse("message", "Email already exists.");
            return ResponseEntity.status(409).body(response);
        }
        int added = userService.registerNewUser(userDetails);
        if (added == 1){
            response = Utils.createResponse("email", email);
            return ResponseEntity.status(201).body(response);
        }
        else {
            response = Utils.createResponse("message", "Unknown error. Please try again later.");
            return ResponseEntity.status(500).body(response);
        }
    }
}
