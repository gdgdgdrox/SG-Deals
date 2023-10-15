package com.sgdeals.server.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.cors.CorsConfiguration;


@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("https://sg-deal-finder-gdgdgdrox.vercel.app/"));
            configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE"));
            configuration.setAllowedHeaders(Arrays.asList("*"));
            return configuration;
        }
        ));

        http.csrf(csrf -> csrf.disable());
        http.authorizeHttpRequests(request -> {
            request.requestMatchers(
                "/api/v1/deals", 
                "/api/v1/deals/{category}", 
                "/api/v1/register", 
                "/api/v1/login"
                )
                .permitAll()
            .requestMatchers("/api/v1/user/get-deal", "/api/v1/user/save-deal", "/api/v1/user/delete-deal/{dealID}")
                .authenticated();

        });
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }


}
