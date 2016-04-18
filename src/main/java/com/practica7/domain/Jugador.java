package com.practica7.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Jugador.
 */
@Entity
@Table(name = "jugador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Jugador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "posicion_campo")
    private String posicionCampo;

    @Column(name = "canastas_totales")
    private Integer canastasTotales;

    @Column(name = "rebotes_totales")
    private Integer rebotesTotales;

    @Column(name = "asistencias_totales")
    private Integer asistenciasTotales;

    @Column(name = "faltas_totales")
    private Integer faltasTotales;

    @ManyToOne
    private Equipo equipo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getPosicionCampo() {
        return posicionCampo;
    }

    public void setPosicionCampo(String posicionCampo) {
        this.posicionCampo = posicionCampo;
    }

    public Integer getCanastasTotales() {
        return canastasTotales;
    }

    public void setCanastasTotales(Integer canastasTotales) {
        this.canastasTotales = canastasTotales;
    }

    public Integer getRebotesTotales() {
        return rebotesTotales;
    }

    public void setRebotesTotales(Integer rebotesTotales) {
        this.rebotesTotales = rebotesTotales;
    }

    public Integer getAsistenciasTotales() {
        return asistenciasTotales;
    }

    public void setAsistenciasTotales(Integer asistenciasTotales) {
        this.asistenciasTotales = asistenciasTotales;
    }

    public Integer getFaltasTotales() {
        return faltasTotales;
    }

    public void setFaltasTotales(Integer faltasTotales) {
        this.faltasTotales = faltasTotales;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Jugador jugador = (Jugador) o;
        if(jugador.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, jugador.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Jugador{" +
            "id=" + id +
            ", nombre='" + nombre + "'" +
            ", fechaNacimiento='" + fechaNacimiento + "'" +
            ", posicionCampo='" + posicionCampo + "'" +
            ", canastasTotales='" + canastasTotales + "'" +
            ", rebotesTotales='" + rebotesTotales + "'" +
            ", asistenciasTotales='" + asistenciasTotales + "'" +
            ", faltasTotales='" + faltasTotales + "'" +
            '}';
    }
}
