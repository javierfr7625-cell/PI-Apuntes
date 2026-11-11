# Apuntes Proyecto Intermodular (Spring Boot + JPA)

Web estática de apuntes construida con **Astro**, **Tailwind CSS** y **TypeScript**, con modo oscuro, buscador instantáneo (`Ctrl+K`), resaltado de sintaxis con Shiki y botones para copiar código.

## Contenido
- **Simulacro de Examen (`/simulacro/taller-don-juan`):** Solución completa paso a paso de la API *Taller Don Juan* (`Taller` 1:N `Cliente` 1:1 `Coche`), 3 repositorios, `TallerService`, `TallerController` con control de `404`, payloads JSON para Postman y checklist de autoevaluación.
- **Super Cheatcode (`/cheatcode`):** Explorador interactivo de carpetas y archivos estilo IDE para `demo-spring`, `talleres-don-juan` y `piSpring` con explicación debajo de cada snippet.
- **Teoría (`/teoria` y `/teoria/diapos`):** Apuntes y descargas de los 7 temas en PDF y 6 presentaciones `.pptx`.
- **Ejercicios (`/ejercicios`):** Código real comentado de `demo-spring` y `piSpring`.
- **Transcripciones (`/transcripciones`):** Resúmenes de las sesiones S01–S08 y archivos `.srt`.

## Cómo ejecutar en local
```bash
npm install
npm run dev
```

Para generar la build estática:
```bash
npm run build
```
