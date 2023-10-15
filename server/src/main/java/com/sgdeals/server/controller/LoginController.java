package com.sgdeals.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgdeals.server.Utils;


@RestController
@RequestMapping(path="api/v1")
public class LoginController {    

    @GetMapping(path="/login")
    public ResponseEntity<String> login(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String response = "";
        if (auth.isAuthenticated()){
            String email = auth.getPrincipal().toString();
            response = Utils.createResponse("email", email);
            return ResponseEntity.ok(response);
        }
        else{
            response = Utils.createResponse("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }
    }
}
