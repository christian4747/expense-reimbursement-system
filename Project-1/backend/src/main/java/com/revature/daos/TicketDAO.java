package com.revature.daos;

import com.revature.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketDAO extends JpaRepository<Ticket, Integer> {

    List<Ticket> findByUserUserId(int userId);

}
