package com.revature.controllers;

import com.revature.aspects.ManagerOnly;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private UserService uService;

    @Autowired
    public UserController(UserService uService) {
        this.uService = uService;
    }

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User newUser) {

        User u = uService.register(newUser);

        return ResponseEntity.ok(u);
    }

    @ManagerOnly
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(uService.getUsers());
    }

    @ManagerOnly
    @DeleteMapping
    @RequestMapping("/{userId}")
    public ResponseEntity<User> deleteUser(@PathVariable int userId) {
        return ResponseEntity.ok(uService.deleteUser(userId));
    }

    @ManagerOnly
    @PatchMapping
    @RequestMapping("/role/{userId}")
    public ResponseEntity<User> updateUserRole(@PathVariable int userId, @RequestBody String newRole) {
        return ResponseEntity.ok(uService.updateUserRole(userId, newRole));
    }

}
