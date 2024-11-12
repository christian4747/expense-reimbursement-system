package com.revature.controllers;

import com.revature.models.User;
import com.revature.models.dtos.LoginDTO;
import com.revature.models.dtos.OutgoingUserDTO;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public static HttpSession session;

    @GetMapping
    @RequestMapping("/users/current")
    public ResponseEntity<OutgoingUserDTO> getCurrentUser() {
        OutgoingUserDTO uDTO = authService.getCurrentUser();

        return ResponseEntity.ok(uDTO);
    }

    @PostMapping
    public ResponseEntity<OutgoingUserDTO> login(@RequestBody LoginDTO loginDTO, HttpSession session) {

        OutgoingUserDTO uDTO = authService.login(loginDTO, session);

        return ResponseEntity.ok(uDTO);
    }

    @PostMapping
    @RequestMapping("/logout")
    public ResponseEntity<String> logout() {
        session = null;
        return ResponseEntity.ok("Successfully logged out of the application.");
    }

}
