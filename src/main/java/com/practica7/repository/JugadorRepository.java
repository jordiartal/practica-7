package com.practica7.repository;

import com.practica7.domain.Jugador;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Jugador entity.
 */
public interface JugadorRepository extends JpaRepository<Jugador,Long> {
    @Query("select jugador from Jugador jugador where jugador.asistenciasTotales>=:asistencias")
    Page<Jugador> topPlayers (@Param("asistencias") Integer asistencias, Pageable pageable);
}
