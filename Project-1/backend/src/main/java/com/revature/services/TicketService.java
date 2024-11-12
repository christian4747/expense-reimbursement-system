package com.revature.services;

import com.revature.daos.TicketDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Ticket;
import com.revature.models.User;
import com.revature.models.dtos.IncomingTicketDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private TicketDAO tDAO;
    private UserDAO uDAO;

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    @Autowired
    public TicketService(TicketDAO tDAO, UserDAO uDAO) {
        this.tDAO = tDAO;
        this.uDAO = uDAO;
    }

    public Ticket createTicket(IncomingTicketDTO inTicket, int userId) {

        Ticket newTicket =
                new Ticket(0, inTicket.getDescription(), inTicket.getAmount(), "pending", null);

        Optional<User> u = uDAO.findById(userId);

        if (u.isEmpty()) {
            throw new IllegalArgumentException("No user found with id: " + userId);
        } else {
            newTicket.setUser(u.get());

            Ticket savedTicket = tDAO.save(newTicket);
            log.info("User {} has created new Ticket with ID {}.", userId, savedTicket.getTicketId());

            return savedTicket;
        }
    }

    public List<Ticket> getAllTickets() {
        return tDAO.findAll();
    }

    public List<Ticket> getUserTickets(int userId) {
        return tDAO.findByUserUserId(userId);
    }

    public List<Ticket> getAllPendingTickets() {

        List<Ticket> allTickets = tDAO.findAll();
        List<Ticket> pendingTickets = new ArrayList<>();

        for (Ticket t : allTickets) {
            if (t.getStatus().equals("pending")) {
                pendingTickets.add(t);
            }
        }

        return pendingTickets;
    }

    public List<Ticket> getUserPendingTickets(int userId) {

        List<Ticket> allTickets = tDAO.findByUserUserId(userId);
        List<Ticket> pendingTickets = new ArrayList<>();

        for (Ticket t : allTickets) {
            if (t.getStatus().equals("pending")) {
                pendingTickets.add(t);
            }
        }

        return pendingTickets;
    }

    public Ticket updateTicketDescription(int ticketId, String newDescription) {

        Optional<Ticket> potentialTicket = tDAO.findById(ticketId);

        if (potentialTicket.isPresent() && !(newDescription == null || newDescription.isBlank())) {
            Ticket ticket = potentialTicket.get();
            ticket.setDescription(newDescription);

            Ticket savedTicket = tDAO.save(ticket);
            log.info("Ticket with ID {} updated its description successfully.", savedTicket.getTicketId());

            return savedTicket;
        } else {
            throw new IllegalArgumentException("Ticket with id: " + ticketId + " does not exist!");
        }

    }

    public Ticket updateTicketStatus(int ticketId, String newStatus) {

        Optional<Ticket> potentialTicket = tDAO.findById(ticketId);

        if (potentialTicket.isPresent() && !(newStatus == null || newStatus.isBlank())) {
            Ticket ticket = potentialTicket.get();
            ticket.setStatus(newStatus);

            Ticket savedTicket = tDAO.save(ticket);
            log.info("Ticket with ID {} updated its status successfully.", savedTicket.getTicketId());
            return savedTicket;
        } else {
            throw new IllegalArgumentException("Ticket with id: " + ticketId + " does not exist!");
        }

    }

    public Ticket deleteTicket(int ticketId) {
        Optional<Ticket> potentialTicket = tDAO.findById(ticketId);

        if (potentialTicket.isPresent()) {
            Ticket ticket = potentialTicket.get();
            tDAO.delete(ticket);
            log.info("Ticket with ID {} deleted successfully.", ticket.getTicketId());
            return ticket;
        } else {
            throw new IllegalArgumentException("Ticket with id: " + ticketId + " does not exist!");
        }

    }

}
