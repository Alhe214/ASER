/* ==========================================================================
   EVENTO ESPECIAL — edita aquí para poner, cambiar o quitar el contador del inicio
   ==========================================================================
   Para QUITARLO:  activo: false
   Para PONERLO:   activo: true  y cambia fecha, título y descripción.

   La fecha va así: "AAAA-MM-DDTHH:MM:00-06:00"  (-06:00 = hora de Guatemala, formato 24 h)
   Ejemplo sábado 14 de noviembre 2026 a las 6:00 PM  →  "2026-11-14T18:00:00-06:00"
   ========================================================================== */
window.TRIBU_EVENTO = {
  activo: true,
  etiqueta: "Culto especial",
  titulo: "Culto especial",
  descripcion: "Este sábado nos reunimos en un culto especial. Invita a tus amigos y no te lo pierdas.",
  fecha: "2026-11-14T18:00:00-06:00",
  duracionMin: 120,
  lugar: "Iglesia Puerta del Cielo El Milagro",
  ocultarDespuesHoras: 3   // el banner se quita solo X horas después de que empieza
};
