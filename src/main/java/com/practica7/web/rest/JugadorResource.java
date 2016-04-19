package com.practica7.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.practica7.domain.Jugador;
import com.practica7.repository.JugadorRepository;
import com.practica7.web.rest.util.HeaderUtil;
import com.practica7.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Jugador.
 */
@RestController
@RequestMapping("/api")
public class JugadorResource {

    private final Logger log = LoggerFactory.getLogger(JugadorResource.class);

    @Inject
    private JugadorRepository jugadorRepository;

    /**
     * POST  /jugadors : Create a new jugador.
     *
     * @param jugador the jugador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jugador, or with status 400 (Bad Request) if the jugador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/jugadors",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Jugador> createJugador(@RequestBody Jugador jugador) throws URISyntaxException {
        log.debug("REST request to save Jugador : {}", jugador);
        if (jugador.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("jugador", "idexists", "A new jugador cannot already have an ID")).body(null);
        }
        Jugador result = jugadorRepository.save(jugador);
        return ResponseEntity.created(new URI("/api/jugadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("jugador", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jugadors : Updates an existing jugador.
     *
     * @param jugador the jugador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jugador,
     * or with status 400 (Bad Request) if the jugador is not valid,
     * or with status 500 (Internal Server Error) if the jugador couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/jugadors",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Jugador> updateJugador(@RequestBody Jugador jugador) throws URISyntaxException {
        log.debug("REST request to update Jugador : {}", jugador);
        if (jugador.getId() == null) {
            return createJugador(jugador);
        }
        Jugador result = jugadorRepository.save(jugador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("jugador", jugador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jugadors : get all the jugadors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of jugadors in body
     */
    @RequestMapping(value = "/jugadors",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Jugador> getAllJugadors() {
        log.debug("REST request to get all Jugadors");
        List<Jugador> jugadors = jugadorRepository.findAll();
        return jugadors;
    }

    /**
     * GET  /jugadors/:id : get the "id" jugador.
     *
     * @param id the id of the jugador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jugador, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/jugadors/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Jugador> getJugador(@PathVariable Long id) {
        log.debug("REST request to get Jugador : {}", id);
        Jugador jugador = jugadorRepository.findOne(id);
        return Optional.ofNullable(jugador)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /jugadors/:id : delete the "id" jugador.
     *
     * @param id the id of the jugador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/jugadors/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteJugador(@PathVariable Long id) {
        log.debug("REST request to delete Jugador : {}", id);
        jugadorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("jugador", id.toString())).build();
    }

    /*
        GET by numero asistencias
     */
    @RequestMapping ( value = "/topPlayers/{asistencias}" ,
        method = RequestMethod. GET ,
        produces = MediaType. APPLICATION_JSON_VALUE )
    @Timed
    public ResponseEntity<List<Jugador>> topPlayers ( @PathVariable Integer asistencias, Pageable pageable)
        throws URISyntaxException {
        Page<Jugador> page = jugadorRepository.topPlayers(asistencias,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders (page, "/jugadors/topPlayers" );
        return new ResponseEntity<>(page.getContent() , headers , HttpStatus.OK );
    }
}
