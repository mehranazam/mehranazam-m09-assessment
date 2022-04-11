package learn.field_agent.controllers;


import learn.field_agent.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/security")
public class AuthController {

    AuthenticationManager authenticationManager;
    JwtConverter converter;
    UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtConverter converter, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Map<String, String> credentials){
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(
                        credentials.get("username"),
                        credentials.get("password")
                );
        try{
            Authentication authResult = authenticationManager.authenticate(token);
            if(authResult.isAuthenticated()){
                String jwt = converter.getTokenFromUser((User) authResult.getPrincipal());
                Map<String, String> tokenWrapper = new HashMap<>();
                tokenWrapper.put("jwt_token", jwt);
                return ResponseEntity.ok(tokenWrapper);
            }
        }catch(AuthenticationException ex){
            ex.printStackTrace(System.err);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
