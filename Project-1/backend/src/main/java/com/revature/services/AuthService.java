package com.revature.services;

import com.revature.controllers.AuthController;
import com.revature.daos.AuthDAO;
import com.revature.models.User;
import com.revature.models.dtos.LoginDTO;
import com.revature.models.dtos.OutgoingUserDTO;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private AuthDAO aDAO;

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    public AuthService(AuthDAO aDAO) {
        this.aDAO = aDAO;
    }

    public OutgoingUserDTO getCurrentUser() {
        if (AuthController.session == null) {
            throw new IllegalArgumentException("You must be logged in to do this!");
        }

        return new OutgoingUserDTO(Integer.parseInt(
                AuthController.session.getAttribute("userId").toString()),
                AuthController.session.getAttribute("username").toString(),
                AuthController.session.getAttribute("firstName").toString(),
                AuthController.session.getAttribute("lastName").toString(),
                AuthController.session.getAttribute("role").toString()
        );
    }

    public OutgoingUserDTO login(LoginDTO loginDTO, HttpSession session) {

        User u = aDAO.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());

        if (u == null) {
            throw new IllegalArgumentException("No user found with those credentials!");
        }

        AuthController.session = session;
        AuthController.session.setAttribute("userId", u.getUserId());
        AuthController.session.setAttribute("username", u.getUsername());
        AuthController.session.setAttribute("firstName", u.getFirstName());
        AuthController.session.setAttribute("lastName", u.getLastName());
        AuthController.session.setAttribute("role", u.getRole());

        log.info("User {} has logged in.", u.getUsername());

        return new OutgoingUserDTO(u.getUserId(), u.getUsername(), u.getFirstName(), u.getLastName(), u.getRole());

    }

}
