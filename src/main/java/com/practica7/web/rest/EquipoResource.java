package com.practica7.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.practica7.domain.Equipo;
import com.practica7.repository.EquipoRepository;
import com.practica7.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing Equipo.
 */
@RestController
@RequestMapping("/api")
public class EquipoResource {

    private final Logger log = LoggerFactory.getLogger(EquipoResource.class);
        
    @Inject
    private EquipoRepository equipoRepository;
    
    /**
     * POST  /equipos : Create a new equipo.
     *
     * @param equipo the equipo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new equipo, or with status 400 (Bad Request) if the equipo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/equipos",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Equipo> createEquipo(@RequestBody Equipo equipo) throws URISyntaxException {
        log.debug("REST request to save Equipo : {}", equipo);
        if (equipo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("equipo", "idexists", "A new equipo cannot already have an ID")).body(null);
        }
        Equipo result = equipoRepository.save(equipo);
        return ResponseEntity.created(new URI("/api/equipos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("equipo", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /equipos : Updates an existing equipo.
     *
     * @param equipo the equipo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated equipo,
     * or with status 400 (Bad Request) if the equipo is not valid,
     * or with status 500 (Internal Server Error) if the equipo couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/equipos",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Equipo> updateEquipo(@RequestBody Equipo equipo) throws URISyntaxException {
        log.debug("REST request to update Equipo : {}", equipo);
        if (equipo.getId() == null) {
            return createEquipo(equipo);
        }
        Equipo result = equipoRepository.save(equipo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("equipo", equipo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /equipos : get all the equipos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of equipos in body
     */
    @RequestMapping(value = "/equipos",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Equipo> getAllEquipos() {
        log.debug("REST request to get all Equipos");
        List<Equipo> equipos = equipoRepository.findAll();
        return equipos;
    }

    /**
     * GET  /equipos/:id : get the "id" equipo.
     *
     * @param id the id of the equipo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the equipo, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/equipos/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Equipo> getEquipo(@PathVariable Long id) {
        log.debug("REST request to get Equipo : {}", id);
        Equipo equipo = equipoRepository.findOne(id);
        return Optional.ofNullable(equipo)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /equipos/:id : delete the "id" equipo.
     *
     * @param id the id of the equipo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/equipos/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteEquipo(@PathVariable Long id) {
        log.debug("REST request to delete Equipo : {}", id);
        equipoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("equipo", id.toString())).build();
    }

}
