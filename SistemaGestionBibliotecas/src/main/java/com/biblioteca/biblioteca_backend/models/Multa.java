package com.biblioteca.biblioteca_backend.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Multa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User usuario;

    @ManyToOne
    private Arriendo arriendo;

    private double monto;

    private LocalDate fecha;

    private boolean pagada = false;

    public Long getId() { return id; }
    public User getUsuario() { return usuario; }
    public void setUsuario(User usuario) { this.usuario = usuario; }
    public Arriendo getArriendo() { return arriendo; }
    public void setArriendo(Arriendo arriendo) { this.arriendo = arriendo; }
    public double getMonto() { return monto; }
    public void setMonto(double monto) { this.monto = monto; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public boolean isPagada() { return pagada; }
    public void setPagada(boolean pagada) { this.pagada = pagada; }
}