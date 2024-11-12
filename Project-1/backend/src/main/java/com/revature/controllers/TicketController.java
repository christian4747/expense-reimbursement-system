package com.revature.controllers;

import com.revature.aspects.ManagerOnly;
import com.revature.models.Ticket;
import com.revature.models.dtos.IncomingTicketDTO;
import com.revature.services.AuthService;
import com.revature.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin
public class TicketController {

    private TicketService tService;
    private AuthService aService;

    @Autowired
    public TicketController(TicketService tService, AuthService aService) {
        this.tService = tService;
        this.aService = aService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody IncomingTicketDTO inTicket) {
        return ResponseEntity.ok(tService.createTicket(inTicket, aService.getCurrentUser().getUserId()));
    }

    @ManagerOnly
    @GetMapping
    @RequestMapping("/all")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(tService.getAllTickets());
    }

    @GetMapping
    @RequestMapping
    public ResponseEntity<List<Ticket>> getAllUserTickets() {
        return ResponseEntity.ok(tService.getUserTickets(aService.getCurrentUser().getUserId()));
    }

    @ManagerOnly
    @GetMapping
    @RequestMapping("/pending/all")
    public ResponseEntity<List<Ticket>> getAllPendingTickets() {
        return ResponseEntity.ok(tService.getAllPendingTickets());
    }

    @GetMapping
    @RequestMapping("/pending")
    public ResponseEntity<List<Ticket>> getAllUserPendingTickets() {
        return ResponseEntity.ok(tService.getUserPendingTickets(aService.getCurrentUser().getUserId()));
    }

    @PostMapping
    @RequestMapping("/description/{ticketId}")
    public ResponseEntity<Ticket> changeTicketDescription(@PathVariable int ticketId, @RequestBody String newDescription) {
        return ResponseEntity.ok(tService.updateTicketDescription(ticketId, newDescription));
    }

    @ManagerOnly
    @PostMapping
    @RequestMapping("/status/{ticketId}")
    public ResponseEntity<Ticket> changeTicketStatus(@PathVariable int ticketId, @RequestBody String newStatus) {
        return ResponseEntity.ok(tService.updateTicketStatus(ticketId, newStatus));
    }

    @ManagerOnly
    @DeleteMapping
    @RequestMapping("/{ticketId}")
    public ResponseEntity<Ticket> deleteTicket(@PathVariable int ticketId) {
        return ResponseEntity.ok(tService.deleteTicket(ticketId));
    }

}
