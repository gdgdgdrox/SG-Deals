package com.sgdeals.server.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sgdeals.server.repository.SqlQueries;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SqlRowSet result = jdbcTemplate.queryForRowSet(SqlQueries.GET_USER_BY_EMAIL,username);
        if (result.next()){
            return new User(
                result.getString("email"),
                result.getString("password"),
                Collections.emptyList()
                );
        }
        else{
            throw new UsernameNotFoundException("unable to find user with email %s".formatted(username));
        }

    }


}
