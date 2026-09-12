import { describe, it, expect } from "vitest";
import fs from "fs";

describe("Validación de Textos y Requisitos de Negocio", () => {
  it("Sobre Nosotros no debe contener jerga artificial de IA", async () => {
    const file = fs.readFileSync("src/routes/sobre-nosotros.tsx", "utf-8");
    expect(file).not.toContain("Un remanente");
    expect(file).not.toContain("dispuesto al servicio");
    expect(file).not.toContain("consolidando su institucionalidad");
    expect(file).toContain("Estudiantes de fe");
    expect(file).toContain("Bases de nuestra");
    expect(file).toContain("fe");
  });

  it("Vida Universitaria debe tener 'Tres áreas de servicio' en lugar de frentes de acción", async () => {
    const file = fs.readFileSync("src/routes/vida-universitaria.tsx", "utf-8");
    expect(file).not.toContain("Tres frentes de");
    expect(file).toContain("Tres áreas de");
    expect(file).not.toContain("comunión integral");
    expect(file).not.toContain("Reglamento Interno (Art. 51)");
  });

  it("Home contiene la 4ta tarjeta con 'Servicio & Comunidad' y sin emojis", async () => {
    const file = fs.readFileSync("src/routes/index.tsx", "utf-8");
    expect(file).toContain('eyebrow: "Servicio & Comunidad"');
    expect(file).toContain("HeartHandshake");
    expect(file).not.toContain("🤝");
    expect(file).toContain("Suma experiencia pedagógica real en aula con impacto social.");
    expect(file).toContain("Ver convocatoria");
    expect(file).toContain("/oportunidades");
  });

  it("Navbar contiene la pestaña Oportunidades y el logo institucional", async () => {
    const file = fs.readFileSync("src/components/site-nav.tsx", "utf-8");
    expect(file).toContain('{ to: "/oportunidades", label: "Oportunidades" }');
    expect(file).toContain("logo-cbu.svg");
  });

  it("Oportunidades contiene todos los bloques requeridos y usa iconos sin emojis", async () => {
    const file = fs.readFileSync("src/routes/oportunidades.tsx", "utf-8");
    // No emojis
    expect(file).not.toContain("🤝");
    expect(file).not.toContain("🟢");

    // Banner institucional
    expect(file).toContain("banner-voluntariado.webp");
    expect(file).toContain("banner-voluntariado-mobile.webp");
    expect(file).toContain("PROGRAMAS DE VOLUNTARIADO");
    expect(file).toContain("#convocatorias-activas");

    // Identidad
    expect(file).toContain("Comunidad Bíblica Universitaria (CBU UNSCH)");
    expect(file).toContain("Filial oficial de AGEUP Perú");

    // Sección 01: Convocatorias de Voluntariado Activas
    expect(file).toContain("Programa de Acompañamiento Pedagógico");
    expect(file).toContain("I.E. «Nuestra Señora de Lourdes»");
    expect(file).toContain("Convocatoria Abierta • 4 Vacantes");
    expect(file).toContain("Estudiantes desde Serie 200 (Educación Primaria y áreas afines)");
    expect(file).toContain("Quincenal (2 sábados al mes de 09:00 a 11:00 AM)");
    expect(file).toContain("/oportunidades/voluntariado-lourdes");

    // Tarjeta 2: Próximo lanzamiento
    expect(file).toContain("Acción Comunitaria y Seguridad Alimentaria");
    expect(file).toContain("Abierto a todas las escuelas profesionales de la UNSCH");

    // Sección 02: Oportunidades Laborales y Desarrollo Profesional
    expect(file).toContain("Bolsa de Prácticas Preprofesionales");
    expect(file).toContain("Red de Mentoría Profesional");
    expect(file).toContain("Proyectos de Investigación Aplicada (I+D)");
  });

  it("Página dedicada /oportunidades/voluntariado-lourdes contiene todos los bloques requeridos y cero emojis", async () => {
    const file = fs.readFileSync("src/routes/oportunidades_.voluntariado-lourdes.tsx", "utf-8");
    // No emojis
    expect(file).not.toContain("🟢");
    expect(file).not.toContain("🟡");
    expect(file).not.toContain("🔴");
    expect(file).not.toContain("🤝");

    // Ficha y Hero
    expect(file).toContain("CONVENIO DE COOPERACIÓN 2026 • CBU UNSCH");
    expect(file).toContain("Programa de Acompañamiento Pedagógico y Nivelación Escolar");
    expect(file).toContain("I.E. «Nuestra Señora de Lourdes» (Distrito Andrés Avelino Cáceres Dorregaray)");
    expect(file).toContain("7 a más escolares de 2.° grado de primaria focalizados con diagnóstico psicopedagógico");
    expect(file).toContain("4 plazas exclusivas para Docentes de Nivelación y Acompañamiento");

    // Requisitos y Series UNSCH
    expect(file).toContain("Serie 200");
    expect(file).toContain("Serie 300");
    expect(file).toContain("Serie 400");
    expect(file).toContain("Serie 500");
    expect(file).toContain("Egresado / Bachiller");

    // Marco Legal y Salvaguarda
    expect(file).toContain("Ley N.° 28238");
    expect(file).toContain("Ley N.° 27337");
    expect(file).toContain("Ley N.° 29733");

    // Formulario y Consulta
    expect(file).toContain("DECLARACIÓN JURADA DE SALVAGUARDA (OBLIGATORIO)");
    expect(file).toContain("TÉRMINOS LEGALES Y PROTECCIÓN DE DATOS (OBLIGATORIO)");
    expect(file).toContain("EN REVISIÓN POR EL COMITÉ TÉCNICO");
    expect(file).toContain("POSTULANTE SELECCIONADO / ADMITIDO");
    expect(file).toContain("DNI NO ENCONTRADO");
  });
});
