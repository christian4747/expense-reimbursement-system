package com.revature.aspects;

import com.revature.controllers.AuthController;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class AuthAspect {

    @Before("execution(* com.revature.controllers.UserController.*(..)) " +
            "&& !execution(* com.revature.controllers.UserController.registerUser(..)) " +
            "&& !execution(* com.revature.controllers.AuthController.getCurrentUser(..)) " +
            "|| execution(* com.revature.controllers.TicketController.*(..)) ")
    public void checkLogin() {

        if (AuthController.session == null) {
            throw new IllegalArgumentException("You must be logged in to do this!!!");
        }

    }

    @Before("@annotation(com.revature.aspects.ManagerOnly)")
    public void checkManager() {
        if (AuthController.session == null) {
            throw new IllegalArgumentException("You must be logged in to do this!");
        } else if (!AuthController.session.getAttribute("role").equals("manager")) {
            throw new IllegalArgumentException("You must be a manager to do this!");
        }
    }

}
