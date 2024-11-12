package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserDAO uDAO;

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserDAO uDAO) {
        this.uDAO = uDAO;
    }

    public User register(User newUser) {

        Optional<User> existingUser = uDAO.findByUsername(newUser.getUsername());

        if (existingUser.isPresent()) { // Duplicate username
            throw new IllegalArgumentException("Username is already taken!");
        } else if (newUser.getUsername() == null || newUser.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username cannot be empty!");
        } else if (newUser.getPassword() == null || newUser.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password cannot be empty!");
        } else if (newUser.getFirstName() == null || newUser.getFirstName().isBlank()) {
            throw new IllegalArgumentException("First name cannot be empty!");
        } else if (newUser.getLastName() == null || newUser.getLastName().isBlank()) {
            throw new IllegalArgumentException("Last name cannot be empty!");
        }

        log.info("User with username {} registered successfully.", newUser.getUsername());

        return uDAO.save(newUser);
    }

    public List<User> getUsers() {
        return uDAO.findAll();
    }

    public User deleteUser(int userId) {

        Optional<User> potentialUser = uDAO.findById(userId);

        if (potentialUser.isPresent()) {
            uDAO.deleteById(userId);

            log.info("User with ID {} deleted successfully.", potentialUser.get().getUserId());

            return potentialUser.get();
        } else {
            throw new IllegalArgumentException("User with id: " + userId + " does not exist!");
        }

    }

    public User updateUserRole(int userId, String newRole) {

        Optional<User> potentialUser = uDAO.findById(userId);

        if (potentialUser.isPresent() && !(newRole == null || newRole.isBlank())) {
            User u = potentialUser.get();
            u.setRole(newRole);

            log.info("User with ID {} updated with Role {} successfully.", potentialUser.get().getUserId(), u.getRole());

            return uDAO.save(u);
        } else {
            throw new IllegalArgumentException("User with id: " + userId + " does not exist!");
        }
    }

}
