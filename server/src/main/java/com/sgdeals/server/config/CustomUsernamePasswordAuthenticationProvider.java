package com.sgdeals.server.config;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sgdeals.server.model.User;
import com.sgdeals.server.repository.UserRepository;


@Component
public class CustomUsernamePasswordAuthenticationProvider implements AuthenticationProvider{
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String pwd = authentication.getCredentials().toString();
        Optional<User> optUser = userRepo.findUserByEmail(email);
        if (optUser.isPresent()){
            User unverifiedUser = optUser.get();
            if (passwordEncoder.matches(pwd, unverifiedUser.getPassword())){
                return new UsernamePasswordAuthenticationToken(email, pwd, Collections.emptyList());
            }
            else{
                throw new BadCredentialsException("Invalid password");
            }
        }
        else{
            throw new BadCredentialsException("User does not exist");
        }
        
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
    
}
