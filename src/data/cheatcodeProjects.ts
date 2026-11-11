import type { BundledLanguage } from 'shiki';

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  lang: BundledLanguage | 'text';
  badge?: string;
  code: string;
  explanationTitle: string;
  explanation: string[];
  examTip?: string;
}

export interface TreeFolder {
  type: 'folder';
  name: string;
  defaultOpen?: boolean;
  children: TreeNode[];
}

export interface TreeFileRef {
  type: 'file';
  fileId: string;
}

export type TreeNode = TreeFolder | TreeFileRef;

export interface CheatcodeProject {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  tree: TreeNode[];
  files: ProjectFile[];
}

export const cheatcodeProjects: CheatcodeProject[] = [
  {
    id: 'demo-spring',
    name: 'demo-spring',
    subtitle: 'Proyecto base de clase (Temas 1–4): Estudiante, Profesor, Administrador y H2',
    badge: 'Clase · CRUD Completo',
    tree: [
      {
        type: 'folder',
        name: 'src/main/java/com/digitechfp/demo_spring',
        defaultOpen: true,
        children: [
          {
            type: 'folder',
            name: 'config',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'ds-h2' },
              { type: 'file', fileId: 'ds-init' },
            ],
          },
          {
            type: 'folder',
            name: 'controlller',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'ds-est-ctrl' },
              { type: 'file', fileId: 'ds-prof-ctrl' },
              { type: 'file', fileId: 'ds-saludo-ctrl' },
            ],
          },
          {
            type: 'folder',
            name: 'entity',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'ds-est-ent' },
              { type: 'file', fileId: 'ds-prof-ent' },
              { type: 'file', fileId: 'ds-admin-ent' },
            ],
          },
          {
            type: 'folder',
            name: 'repository',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'ds-est-repo' },
              { type: 'file', fileId: 'ds-prof-repo' },
            ],
          },
          {
            type: 'folder',
            name: 'service',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'ds-est-srv' },
              { type: 'file', fileId: 'ds-prof-srv' },
            ],
          },
          { type: 'file', fileId: 'ds-app' },
        ],
      },
      {
        type: 'folder',
        name: 'src/main/resources',
        defaultOpen: true,
        children: [{ type: 'file', fileId: 'ds-props' }],
      },
      { type: 'file', fileId: 'ds-pom' },
    ],
    files: [
      {
        id: 'ds-app',
        name: 'DemoSpringApplication.java',
        path: 'src/main/java/com/digitechfp/demo_spring/DemoSpringApplication.java',
        lang: 'java',
        badge: 'Main',
        code: `package com.digitechfp.demo_spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoSpringApplication.class, args);
    }
}`,
        explanationTitle: 'Punto de entrada de la aplicación',
        explanation: [
          'La anotación @SpringBootApplication agrupa @Configuration, @EnableAutoConfiguration y @ComponentScan.',
          'Al estar en el paquete raíz com.digitechfp.demo_spring, Spring escanea automáticamente todos los subpaquetes (config, controlller, entity, repository, service).',
        ],
        examTip: 'Nunca crees carpetas fuera del paquete raíz de esta clase o Spring no detectará tus controladores ni servicios.',
      },
      {
        id: 'ds-h2',
        name: 'H2ConsoleConfig.java',
        path: 'src/main/java/com/digitechfp/demo_spring/config/H2ConsoleConfig.java',
        lang: 'java',
        badge: 'Config',
        code: `package com.digitechfp.demo_spring.config;

import org.h2.server.web.JakartaWebServlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class H2ConsoleConfig {
    @Bean
    public ServletRegistrationBean<JakartaWebServlet> h2servletRegistration() {
        ServletRegistrationBean<JakartaWebServlet> registration =
                new ServletRegistrationBean<>(new JakartaWebServlet());
        registration.addUrlMappings("/h2-console/*");
        return registration;
    }
}`,
        explanationTitle: 'Registro manual de la consola web H2',
        explanation: [
          'En proyectos con Spring Boot 4 / Jakarta EE se registra el servlet JakartaWebServlet mapeado a /h2-console/*.',
          'Permite entrar desde el navegador a http://localhost:8080/h2-console para inspeccionar tablas SQL y ejecutar SELECTs.',
        ],
      },
      {
        id: 'ds-init',
        name: 'InicializadorDatos.java',
        path: 'src/main/java/com/digitechfp/demo_spring/config/InicializadorDatos.java',
        lang: 'java',
        badge: 'Runner',
        code: `package com.digitechfp.demo_spring.config;

import com.digitechfp.demo_spring.entity.Estudiante;
import com.digitechfp.demo_spring.entity.Profesor;
import com.digitechfp.demo_spring.repository.EstudianteRepository;
import com.digitechfp.demo_spring.repository.ProfesorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Optional;

@Configuration
public class InicializadorDatos {
    @Bean
    CommandLineRunner initData(EstudianteRepository estudianteRepository, ProfesorRepository profesorRepository) {
        return args -> {
            Estudiante estudiante1 = new Estudiante("Ana García", "ana.garcia@digitechfp.com", 19);
            Estudiante estudiante2 = new Estudiante("Pedro Martínez", "Pedro.martinez@digitechfp.com", 18);

            estudianteRepository.save(estudiante1);
            estudianteRepository.save(estudiante2);

            Optional<Estudiante> e = estudianteRepository.findById(1L);
            e.ifPresent(estudiante ->
                    System.out.println("- ID:" + estudiante.getId() + " - " + estudiante.getNombre()));

            Estudiante estudianteEncontrado = estudianteRepository.findById(2L).orElseThrow();
            estudianteEncontrado.setNombre("David María Jardinero");
            estudianteEncontrado.setEdad(20);
            estudianteRepository.save(estudianteEncontrado);

            System.out.println("Total estudiantes: " + estudianteRepository.count());
            estudianteRepository.deleteById(2L);

            Profesor profesor1 = new Profesor("Albert Instantaneo", "Matematicas", 5);
            profesorRepository.save(profesor1);
        };
    }
}`,
        explanationTitle: 'Carga y prueba automática de datos al arrancar',
        explanation: [
          'CommandLineRunner ejecuta el bloque lambda justo después de que Spring Boot arranque por completo.',
          'Sirve para probar save(), findAll(), findById(), actualización mediante setters + save(), count() y deleteById() sin necesidad de Postman.',
        ],
      },
      {
        id: 'ds-est-ent',
        name: 'Estudiante.java',
        path: 'src/main/java/com/digitechfp/demo_spring/entity/Estudiante.java',
        lang: 'java',
        badge: 'Entity',
        code: `package com.digitechfp.demo_spring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estudiante")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    @Column(name = "correo", nullable = false, unique = true, length = 100)
    private String correo;

    @Column(name = "edad")
    private int edad;

    public Estudiante(String nombre, String correo, int edad) {
        this.nombre = nombre;
        this.correo = correo;
        this.edad = edad;
    }
}`,
        explanationTitle: 'Entidad JPA base con Lombok',
        explanation: [
          '@Entity y @Table(name = "estudiante") enlazan la clase con la tabla SQL.',
          '@Id + @GeneratedValue(strategy = GenerationType.IDENTITY) generan la clave primaria autoincremental.',
          'Lombok (@Data, @AllArgsConstructor, @NoArgsConstructor) genera getters, setters, toString y el constructor vacío obligatorio para Hibernate.',
        ],
      },
      {
        id: 'ds-prof-ent',
        name: 'Profesor.java',
        path: 'src/main/java/com/digitechfp/demo_spring/entity/Profesor.java',
        lang: 'java',
        badge: 'Entity',
        code: `package com.digitechfp.demo_spring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profesor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profesor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombreCompleto", nullable = false, length = 50)
    private String nombreCompleto;

    @Column(name = "especialidad", nullable = false, length = 100)
    private String especialidad;

    @Column(name = "experienciaAnios")
    private int experienciaAnios;

    public Profesor(String nombreCompleto, String especialidad, int experienciaAnios) {
        this.nombreCompleto = nombreCompleto;
        this.especialidad = especialidad;
        this.experienciaAnios = experienciaAnios;
    }
}`,
        explanationTitle: 'Entidad Profesor (ejercicio propuesto del Tema 2)',
        explanation: [
          'Sigue exactamente la misma plantilla que Estudiante: clave primaria Long autoincremental, restricciones @Column y constructor auxiliar sin ID.',
        ],
      },
      {
        id: 'ds-admin-ent',
        name: 'Administrador.java',
        path: 'src/main/java/com/digitechfp/demo_spring/entity/Administrador.java',
        lang: 'java',
        badge: 'Entity',
        code: `package com.digitechfp.demo_spring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "administrador")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombreCompleto", nullable = false, length = 50)
    private String nombreCompleto;

    @Column(name = "departamento", nullable = false, length = 100)
    private String departamento;

    @Column(name = "anioInicial", nullable = false)
    private int anioInicial;

    public Administrador(String nombreCompleto, String departamento, int anioInicial) {
        this.nombreCompleto = nombreCompleto;
        this.departamento = departamento;
        this.anioInicial = anioInicial;
    }
}`,
        explanationTitle: 'Entidad Administrador',
        explanation: [
          'Tercera entidad de práctica del proyecto con sus columnas obligatorias y constructor sin identificador.',
        ],
      },
      {
        id: 'ds-est-repo',
        name: 'EstudianteRepository.java',
        path: 'src/main/java/com/digitechfp/demo_spring/repository/EstudianteRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package com.digitechfp.demo_spring.repository;

import com.digitechfp.demo_spring.entity.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    boolean existsByCorreo(String correo);

    Estudiante findByCorreo(String correo);
}`,
        explanationTitle: 'Repositorio con Query Methods derivados',
        explanation: [
          'Al extender JpaRepository<Estudiante, Long> heredamos save, findById, findAll, deleteById y existsById.',
          'Declaramos existsByCorreo y findByCorreo para que Spring Data genere automáticamente el SQL WHERE correo = ?.',
        ],
      },
      {
        id: 'ds-prof-repo',
        name: 'ProfesorRepository.java',
        path: 'src/main/java/com/digitechfp/demo_spring/repository/ProfesorRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package com.digitechfp.demo_spring.repository;

import com.digitechfp.demo_spring.entity.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {
    boolean existsByNombreCompleto(String correo);

    Profesor findByNombreCompleto(String correo);
}`,
        explanationTitle: 'Repositorio de Profesor',
        explanation: [
          'Define métodos derivados sobre el atributo nombreCompleto de la entidad Profesor.',
        ],
      },
      {
        id: 'ds-est-srv',
        name: 'EstudianteService.java',
        path: 'src/main/java/com/digitechfp/demo_spring/service/EstudianteService.java',
        lang: 'java',
        badge: 'Service',
        code: `package com.digitechfp.demo_spring.service;

import com.digitechfp.demo_spring.entity.Estudiante;
import com.digitechfp.demo_spring.repository.EstudianteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;

    public EstudianteService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    public List<Estudiante> listarTodos(){
        return estudianteRepository.findAll();
    }

    public Optional<Estudiante> buscarPorId(Long id){
        return estudianteRepository.findById(id);
    }

    public Estudiante guardarEstudiante(Estudiante estudiante){
        return estudianteRepository.save(estudiante);
    }

    public void eliminarEstudiante(Long id){
        estudianteRepository.deleteById(id);
    }

    public boolean existsByCorreo(String correo){
        return estudianteRepository.existsByCorreo(correo);
    }

    public Estudiante buscarPorCorreo(String correo){
        return estudianteRepository.findByCorreo(correo);
    }
}`,
        explanationTitle: 'Capa de negocio para Estudiante',
        explanation: [
          'Inyecta EstudianteRepository mediante constructor (inyección recomendada en Spring).',
          'Expone las operaciones CRUD y las consultas personalizadas hacia el controlador.',
        ],
      },
      {
        id: 'ds-prof-srv',
        name: 'ProfesorService.java',
        path: 'src/main/java/com/digitechfp/demo_spring/service/ProfesorService.java',
        lang: 'java',
        badge: 'Service',
        code: `package com.digitechfp.demo_spring.service;

import com.digitechfp.demo_spring.entity.Profesor;
import com.digitechfp.demo_spring.repository.ProfesorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesorService {

    private final ProfesorRepository profesorRepository;

    public ProfesorService(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    public List<Profesor> listarTodos(){
        return profesorRepository.findAll();
    }

    public Optional<Profesor> buscarPorId(Long id){
        return profesorRepository.findById(id);
    }

    public Profesor guardarProfesor(Profesor profesor){
        return profesorRepository.save(profesor);
    }

    public void eliminarProfesor(Long id){
        profesorRepository.deleteById(id);
    }

    public boolean existsByNombreCompleto(String nombre){
        return profesorRepository.existsByNombreCompleto(nombre);
    }

    public Profesor buscarPorCorreo(String nombre){
        return profesorRepository.findByNombreCompleto(nombre);
    }
}`,
        explanationTitle: 'Capa de negocio para Profesor',
        explanation: [
          'Replica el patrón de servicio CRUD desacoplando ProfesorController de ProfesorRepository.',
        ],
      },
      {
        id: 'ds-est-ctrl',
        name: 'EstudianteController.java',
        path: 'src/main/java/com/digitechfp/demo_spring/controlller/EstudianteController.java',
        lang: 'java',
        badge: 'REST',
        code: `package com.digitechfp.demo_spring.controlller;

import com.digitechfp.demo_spring.entity.Estudiante;
import com.digitechfp.demo_spring.service.EstudianteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/estudiantes")
public class EstudianteController {
    private final EstudianteService estudianteService;

    public EstudianteController(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    public List<Estudiante> obtenerTodos(){
        return estudianteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        return estudianteService.buscarPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "el estudiante no existe")));
    }

    @PostMapping
    public ResponseEntity<?> crearEstudiante(@RequestBody Estudiante estudiante){
        if (estudianteService.existsByCorreo(estudiante.getCorreo())){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("mensaje", "el correo ya esta registrado por otro estudiante"));
        }
        Estudiante nuevoEstudiante = estudianteService.guardarEstudiante(estudiante);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEstudiante);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCompleto(
            @PathVariable Long id,
            @RequestBody Estudiante estudianteDatos){
        return estudianteService.buscarPorId(id)
                .<ResponseEntity<?>>map(estudianteExistente -> {
                    estudianteExistente.setNombre(estudianteDatos.getNombre());
                    estudianteExistente.setEdad(estudianteDatos.getEdad());
                    estudianteExistente.setCorreo(estudianteDatos.getCorreo());
                    return ResponseEntity.ok(estudianteService.guardarEstudiante(estudianteExistente));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "El estudiante no existe")));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> actualizarParcial(
            @PathVariable Long id,
            @RequestBody Map<String, Object> campos){
        return estudianteService.buscarPorId(id)
                .<ResponseEntity<?>>map(estudianteExistente -> {
                    campos.forEach((campo, valor) ->{
                        switch (campo){
                            case "nombre":
                                estudianteExistente.setNombre((String) valor);
                                break;
                            case "correo":
                                estudianteExistente.setCorreo((String) valor);
                                break;
                            case "edad":
                                estudianteExistente.setEdad(((Number) valor).intValue());
                                break;
                        }
                    });
                    return ResponseEntity.ok(estudianteService.guardarEstudiante(estudianteExistente));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "El estudiante no existe")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEstudiante(@PathVariable Long id) {
        if (estudianteService.buscarPorId(id).isPresent()) {
            estudianteService.eliminarEstudiante(id);
            return ResponseEntity.ok(Collections.singletonMap("mensaje", "Estudiante eliminado correctamente"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("mensaje", "El estudiante no existe"));
    }
}`,
        explanationTitle: 'Controlador REST completo (GET, POST, PUT, PATCH, DELETE)',
        explanation: [
          'Usa ResponseEntity<?> para devolver códigos HTTP exactos: 200 OK, 201 Created, 404 Not Found y 409 Conflict.',
          'PUT reemplaza todos los campos; PATCH recorre un Map<String, Object> y solo modifica los campos enviados en el JSON.',
        ],
        examTip: 'Fíjate en cómo se maneja el 404 con .<ResponseEntity<?>>map(...).orElseGet(...): es exactamente la estructura que pide el examen.',
      },
      {
        id: 'ds-prof-ctrl',
        name: 'ProfesorController.java',
        path: 'src/main/java/com/digitechfp/demo_spring/controlller/ProfesorController.java',
        lang: 'java',
        badge: 'REST',
        code: `package com.digitechfp.demo_spring.controlller;

import com.digitechfp.demo_spring.entity.Profesor;
import com.digitechfp.demo_spring.service.ProfesorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/profesors")
public class ProfesorController {
    private final ProfesorService profesorService;

    public ProfesorController(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @GetMapping
    public List<Profesor> obtenerTodos(){
        return profesorService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id){
        return profesorService.buscarPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "el profesor no existe")));
    }

    @PostMapping
    public ResponseEntity<?> crearProfesor(@RequestBody Profesor profesor){
        if (profesorService.existsByNombreCompleto(profesor.getNombreCompleto())){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("mensaje", "el profesor ya está registrado"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(profesorService.guardarProfesor(profesor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCompleto(@PathVariable Long id, @RequestBody Profesor profesorDatos){
        return profesorService.buscarPorId(id)
                .<ResponseEntity<?>>map(profesorExistente -> {
                    profesorExistente.setNombreCompleto(profesorDatos.getNombreCompleto());
                    profesorExistente.setExperienciaAnios(profesorDatos.getExperienciaAnios());
                    profesorExistente.setEspecialidad(profesorDatos.getEspecialidad());
                    return ResponseEntity.ok(profesorService.guardarProfesor(profesorExistente));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "El profesor no existe")));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> actualizarParcial(@PathVariable Long id, @RequestBody Map<String, Object> campos){
        return profesorService.buscarPorId(id)
                .<ResponseEntity<?>>map(profesorExistente -> {
                    campos.forEach((campo, valor) ->{
                        switch (campo){
                            case "nombre":
                                profesorExistente.setNombreCompleto((String) valor);
                                break;
                            case "especialidad":
                                profesorExistente.setEspecialidad((String) valor);
                                break;
                            case "experiencia":
                                profesorExistente.setExperienciaAnios(((Number) valor).intValue());
                                break;
                        }
                    });
                    return ResponseEntity.ok(profesorService.guardarProfesor(profesorExistente));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "El profesor no existe")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProfesor(@PathVariable Long id) {
        if (profesorService.buscarPorId(id).isPresent()) {
            profesorService.eliminarProfesor(id);
            return ResponseEntity.ok(Collections.singletonMap("mensaje", "Profesor eliminado correctamente"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("mensaje", "El profesor no existe"));
    }
}`,
        explanationTitle: 'Controlador REST de Profesores',
        explanation: [
          'Expone los endpoints CRUD bajo /api/v1/profesors validando existencia antes de crear (409) o modificar/borrar (404).',
        ],
      },
      {
        id: 'ds-saludo-ctrl',
        name: 'SaludoController.java',
        path: 'src/main/java/com/digitechfp/demo_spring/controlller/SaludoController.java',
        lang: 'java',
        badge: 'REST',
        code: `package com.digitechfp.demo_spring.controlller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaludoController {

    public record InfoDTO(String curso, String centro, String profesor) {}

    @GetMapping("/saludo")
    public String saludar(@RequestParam(value = "nombre", defaultValue = "Mundo") String nombre) {
        return "¡Hola, " + nombre + "! Bienvenido a la clase de spring Boot de DAM.";
    }

    @GetMapping("/info")
    public InfoDTO info(
            @RequestParam(value = "curso", defaultValue = "1º DAM") String curso,
            @RequestParam(value = "centro", defaultValue = "Digitech") String centro,
            @RequestParam(value = "profesor", defaultValue = "Francisco Belda") String profesor
    ) {
        return new InfoDTO(curso, centro, profesor);
    }

    @GetMapping("/suma")
    public int suma(
            @RequestParam(value = "a", defaultValue = "0") int a,
            @RequestParam(value = "b", defaultValue = "0") int b
    ) {
        return a + b;
    }
}`,
        explanationTitle: 'Controlador inicial del Tema 1 con @RequestParam y Java record',
        explanation: [
          'Demuestra cómo devolver un String (/saludo), un objeto DTO serializado automáticamente a JSON (/info) y un cálculo con parámetros numéricos (/suma?a=5&b=3).',
        ],
      },
      {
        id: 'ds-props',
        name: 'application.properties',
        path: 'src/main/resources/application.properties',
        lang: 'properties',
        badge: 'Config',
        code: `spring.application.name=demo-spring

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true`,
        explanationTitle: 'Configuración de base de datos H2 en memoria y Hibernate',
        explanation: [
          'ddl-auto=update crea/actualiza las tablas automáticamente al arrancar.',
          'show-sql=true muestra cada sentencia SQL (CREATE TABLE, INSERT, SELECT) en la consola de IntelliJ.',
        ],
      },
      {
        id: 'ds-pom',
        name: 'pom.xml',
        path: 'pom.xml',
        lang: 'xml',
        badge: 'Maven',
        code: `<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
</dependencies>`,
        explanationTitle: 'Dependencias Maven del proyecto',
        explanation: [
          'Incluye Web, Data JPA (Hibernate), H2 en memoria, Lombok para evitar getters/setters repetitivos y DevTools para recarga rápida.',
        ],
      },
    ],
  },
  {
    id: 'talleres-don-juan',
    name: 'talleres-don-juan',
    subtitle: 'Simulacro de Examen completo: Taller (1:N) → Cliente (1:1) → Coche',
    badge: 'Simulacro · Examen',
    tree: [
      {
        type: 'folder',
        name: 'src/main/java/com/digitechfp/talleres',
        defaultOpen: true,
        children: [
          {
            type: 'folder',
            name: 'controller',
            defaultOpen: true,
            children: [{ type: 'file', fileId: 'tdj-ctrl' }],
          },
          {
            type: 'folder',
            name: 'entity',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'tdj-taller' },
              { type: 'file', fileId: 'tdj-cliente' },
              { type: 'file', fileId: 'tdj-coche' },
            ],
          },
          {
            type: 'folder',
            name: 'repository',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'tdj-taller-repo' },
              { type: 'file', fileId: 'tdj-cliente-repo' },
              { type: 'file', fileId: 'tdj-coche-repo' },
            ],
          },
          {
            type: 'folder',
            name: 'service',
            defaultOpen: true,
            children: [{ type: 'file', fileId: 'tdj-srv' }],
          },
          { type: 'file', fileId: 'tdj-app' },
        ],
      },
      {
        type: 'folder',
        name: 'src/main/resources',
        defaultOpen: true,
        children: [{ type: 'file', fileId: 'tdj-props' }],
      },
      {
        type: 'folder',
        name: 'postman',
        defaultOpen: true,
        children: [{ type: 'file', fileId: 'tdj-json' }],
      },
    ],
    files: [
      {
        id: 'tdj-taller',
        name: 'Taller.java',
        path: 'src/main/java/com/digitechfp/talleres/entity/Taller.java',
        lang: 'java',
        badge: '1:N',
        code: `package com.digitechfp.talleres.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "talleres")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Taller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 80)
    private String nombre;

    @Column(name = "calle", nullable = false, length = 150)
    private String calle;

    @Column(name = "nombre_encargado", nullable = false, length = 80)
    private String nombreEncargado;

    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @JsonIgnoreProperties("taller")
    private List<Cliente> clientes = new ArrayList<>();

    public Taller(String nombre, String calle, String nombreEncargado) {
        this.nombre = nombre;
        this.calle = calle;
        this.nombreEncargado = nombreEncargado;
    }

    public void agregarCliente(Cliente cliente) {
        clientes.add(cliente);
        cliente.setTaller(this);
    }

    public void setClientes(List<Cliente> clientes) {
        this.clientes = clientes;
        if (clientes != null) {
            for (Cliente cliente : clientes) {
                cliente.setTaller(this);
            }
        }
    }
}`,
        explanationTitle: 'Entidad Taller (Lado inverso 1:N)',
        explanation: [
          '@OneToMany(mappedBy = "taller", cascade = CascadeType.ALL, orphanRemoval = true) delega la clave foránea al atributo taller de la clase Cliente.',
          '@JsonIgnoreProperties("taller") permite serializar la lista de clientes en JSON sin caer en recursión infinita.',
          'setClientes(...) intercepta la deserialización de Jackson desde Postman para que cada Cliente reciba cliente.setTaller(this) y no llegue taller_id = null.',
        ],
        examTip: 'Sin el setter setClientes(...) o un bucle equivalente en el servicio, al hacer POST desde Postman saltará un error de constraint NOT NULL en taller_id.',
      },
      {
        id: 'tdj-cliente',
        name: 'Cliente.java',
        path: 'src/main/java/com/digitechfp/talleres/entity/Cliente.java',
        lang: 'java',
        badge: 'N:1 + 1:1',
        code: `package com.digitechfp.talleres.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 80)
    private String nombre;

    @Column(name = "telefono", nullable = false, unique = true, length = 20)
    private String telefono;

    @Column(name = "codigo_postal", nullable = false, length = 10)
    private String codigoPostal;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "coche_id", referencedColumnName = "id", unique = true)
    private Coche coche;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taller_id", nullable = false)
    @ToString.Exclude
    @JsonIgnoreProperties("clientes")
    private Taller taller;

    public Cliente(String nombre, String telefono, String codigoPostal, Coche coche, Taller taller) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.codigoPostal = codigoPostal;
        this.coche = coche;
        this.taller = taller;
    }
}`,
        explanationTitle: 'Entidad Cliente (Propietaria de ambas claves foráneas)',
        explanation: [
          'Lleva @OneToOne(cascade = CascadeType.ALL) + @JoinColumn(name = "coche_id", unique = true) para garantizar un coche único por cliente.',
          'Lleva @ManyToOne(fetch = FetchType.LAZY) + @JoinColumn(name = "taller_id", nullable = false) como lado propietario de la relación con Taller.',
        ],
      },
      {
        id: 'tdj-coche',
        name: 'Coche.java',
        path: 'src/main/java/com/digitechfp/talleres/entity/Coche.java',
        lang: 'java',
        badge: 'Entity',
        code: `package com.digitechfp.talleres.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "coches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "modelo", nullable = false, length = 80)
    private String modelo;

    @Column(name = "matricula", nullable = false, unique = true, length = 15)
    private String matricula;

    @Column(name = "color", nullable = false, length = 30)
    private String color;

    public Coche(String modelo, String matricula, String color) {
        this.modelo = modelo;
        this.matricula = matricula;
        this.color = color;
    }
}`,
        explanationTitle: 'Entidad Coche',
        explanation: [
          'Entidad simple al final de la relación 1:1. La matrícula lleva unique = true para impedir duplicados en la base de datos.',
        ],
      },
      {
        id: 'tdj-taller-repo',
        name: 'TallerRepository.java',
        path: 'src/main/java/com/digitechfp/talleres/repository/TallerRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package com.digitechfp.talleres.repository;

import com.digitechfp.talleres.entity.Taller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TallerRepository extends JpaRepository<Taller, Long> {

    List<Taller> findByNombre(String nombre);

    boolean existsByNombre(String nombre);
}`,
        explanationTitle: 'Repositorio de Taller con métodos derivados',
        explanation: [
          'findByNombre devuelve List<Taller> porque varios talleres podrían llamarse igual si no es unique.',
          'existsByNombre devuelve boolean para comprobar rápidamente si existe un taller con ese nombre.',
        ],
      },
      {
        id: 'tdj-cliente-repo',
        name: 'ClienteRepository.java',
        path: 'src/main/java/com/digitechfp/talleres/repository/ClienteRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package com.digitechfp.talleres.repository;

import com.digitechfp.talleres.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}`,
        explanationTitle: 'Repositorio de Cliente',
        explanation: [
          'Extiende JpaRepository<Cliente, Long> cumpliendo el requisito de implementar los 3 repositorios.',
        ],
      },
      {
        id: 'tdj-coche-repo',
        name: 'CocheRepository.java',
        path: 'src/main/java/com/digitechfp/talleres/repository/CocheRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package com.digitechfp.talleres.repository;

import com.digitechfp.talleres.entity.Coche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CocheRepository extends JpaRepository<Coche, Long> {
}`,
        explanationTitle: 'Repositorio de Coche',
        explanation: [
          'Extiende JpaRepository<Coche, Long> heredando todo el CRUD estándar.',
        ],
      },
      {
        id: 'tdj-srv',
        name: 'TallerService.java',
        path: 'src/main/java/com/digitechfp/talleres/service/TallerService.java',
        lang: 'java',
        badge: 'Service',
        code: `package com.digitechfp.talleres.service;

import com.digitechfp.talleres.entity.Taller;
import com.digitechfp.talleres.repository.TallerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TallerService {

    private final TallerRepository tallerRepository;

    public TallerService(TallerRepository tallerRepository) {
        this.tallerRepository = tallerRepository;
    }

    @Transactional(readOnly = true)
    public List<Taller> listarTodos() {
        return tallerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Taller> buscarPorId(Long id) {
        return tallerRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Taller> buscarPorNombre(String nombre) {
        return tallerRepository.findByNombre(nombre);
    }

    @Transactional(readOnly = true)
    public boolean existePorId(Long id) {
        return tallerRepository.existsById(id);
    }

    @Transactional(readOnly = true)
    public boolean existePorNombre(String nombre) {
        return tallerRepository.existsByNombre(nombre);
    }

    @Transactional
    public Taller guardarTaller(Taller taller) {
        if (taller.getClientes() != null) {
            taller.getClientes().forEach(cliente -> cliente.setTaller(taller));
        }
        return tallerRepository.save(taller);
    }

    @Transactional
    public void eliminarTaller(Long id) {
        tallerRepository.deleteById(id);
    }
}`,
        explanationTitle: 'Servicio completo de Taller',
        explanation: [
          'Implementa todo lo pedido por el enunciado: listarTodos, guardarTaller, eliminarTaller, buscarPorId, buscarPorNombre, existePorId y existePorNombre.',
          '@Transactional asegura atomicidad al guardar o borrar en cascada las 3 tablas juntas.',
        ],
      },
      {
        id: 'tdj-ctrl',
        name: 'TallerController.java',
        path: 'src/main/java/com/digitechfp/talleres/controller/TallerController.java',
        lang: 'java',
        badge: 'REST',
        code: `package com.digitechfp.talleres.controller;

import com.digitechfp.talleres.entity.Cliente;
import com.digitechfp.talleres.entity.Taller;
import com.digitechfp.talleres.service.TallerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/talleres")
public class TallerController {

    private final TallerService tallerService;

    public TallerController(TallerService tallerService) {
        this.tallerService = tallerService;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Taller>> listarTodos() {
        return ResponseEntity.ok(tallerService.listarTodos());
    }

    @GetMapping("/getTaller/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return tallerService.buscarPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "El taller no existe")));
    }

    @PostMapping("/nuevoTaller")
    public ResponseEntity<Taller> crearTaller(@RequestBody Taller taller) {
        Taller nuevoTaller = tallerService.guardarTaller(taller);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoTaller);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarTaller(
            @PathVariable Long id,
            @RequestBody Taller tallerDatos) {

        return tallerService.buscarPorId(id)
                .<ResponseEntity<?>>map(tallerExistente -> {
                    tallerExistente.setNombre(tallerDatos.getNombre());
                    tallerExistente.setCalle(tallerDatos.getCalle());
                    tallerExistente.setNombreEncargado(tallerDatos.getNombreEncargado());

                    tallerExistente.getClientes().clear();
                    if (tallerDatos.getClientes() != null) {
                        for (Cliente cliente : tallerDatos.getClientes()) {
                            cliente.setTaller(tallerExistente);
                            tallerExistente.getClientes().add(cliente);
                        }
                    }

                    Taller actualizado = tallerService.guardarTaller(tallerExistente);
                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("mensaje", "El taller no existe")));
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> borrarTaller(@PathVariable Long id) {
        if (tallerService.existePorId(id)) {
            tallerService.eliminarTaller(id);
            return ResponseEntity.ok(
                    Collections.singletonMap("mensaje", "Taller eliminado correctamente")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("mensaje", "El taller no existe"));
    }
}`,
        explanationTitle: 'Controlador REST con las 5 rutas exactas y control de 404',
        explanation: [
          'Mapea el prefijo /api/v1/talleres y expone /todos, /getTaller/{id}, /nuevoTaller, /actualizar/{id} y /borrar/{id}.',
          'Todos los métodos que reciben {id} responden con HttpStatus.NOT_FOUND (404) si el taller no se encuentra en la BD.',
        ],
      },
      {
        id: 'tdj-app',
        name: 'TalleresApplication.java',
        path: 'src/main/java/com/digitechfp/talleres/TalleresApplication.java',
        lang: 'java',
        badge: 'Main',
        code: `package com.digitechfp.talleres;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TalleresApplication {
    public static void main(String[] args) {
        SpringApplication.run(TalleresApplication.class, args);
    }
}`,
        explanationTitle: 'Clase de arranque Spring Boot',
        explanation: [
          'Arranca el servidor Tomcat embebido en el puerto 8080 y escanea los subpaquetes entity, repository, service y controller.',
        ],
      },
      {
        id: 'tdj-props',
        name: 'application.properties',
        path: 'src/main/resources/application.properties',
        lang: 'properties',
        badge: 'Config',
        code: `spring.application.name=talleres-don-juan

spring.datasource.url=jdbc:h2:mem:talleres_db
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console`,
        explanationTitle: 'Configuración H2 e Hibernate',
        explanation: [
          'Habilita la base en memoria talleres_db, genera las tablas talleres, clientes y coches al arrancar e imprime el SQL en consola.',
        ],
      },
      {
        id: 'tdj-json',
        name: 'nuevoTaller.json',
        path: 'postman/nuevoTaller.json',
        lang: 'json',
        badge: 'Postman',
        code: `{
  "nombre": "Taller Don Juan",
  "calle": "Avenida de la Mecánica, 42",
  "nombreEncargado": "Juan Pérez",
  "clientes": [
    {
      "nombre": "María López",
      "telefono": "612345678",
      "codigoPostal": "28015",
      "coche": {
        "modelo": "Toyota Corolla",
        "matricula": "1234KLM",
        "color": "Gris Plata"
      }
    },
    {
      "nombre": "Carlos García",
      "telefono": "699887766",
      "codigoPostal": "28020",
      "coche": {
        "modelo": "Seat León",
        "matricula": "5678XYZ",
        "color": "Rojo"
      }
    }
  ]
}`,
        explanationTitle: 'Payload JSON completo para POST /api/v1/talleres/nuevoTaller',
        explanation: [
          'En Postman: método POST, Body → raw → JSON.',
          'Inserta en una sola transacción 1 taller, 2 clientes y 2 coches con sus claves foráneas generadas automáticamente.',
        ],
      },
    ],
  },
  {
    id: 'pi-spring',
    name: 'piSpring',
    subtitle: 'Proyecto de clase (Tema 7 TechCorp): Departamento (1:N) → Empleado (1:1) → Credencial',
    badge: 'Clase · 1:1 + 1:N',
    tree: [
      {
        type: 'folder',
        name: 'src/main/java/javier/com/pispring',
        defaultOpen: true,
        children: [
          {
            type: 'folder',
            name: 'config',
            defaultOpen: true,
            children: [{ type: 'file', fileId: 'pi-h2' }],
          },
          {
            type: 'folder',
            name: 'controller',
            defaultOpen: true,
            children: [{ type: 'file', fileId: 'pi-ctrl' }],
          },
          {
            type: 'folder',
            name: 'entity',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'pi-dep' },
              { type: 'file', fileId: 'pi-emp' },
              { type: 'file', fileId: 'pi-cred' },
            ],
          },
          {
            type: 'folder',
            name: 'repository',
            defaultOpen: true,
            children: [
              { type: 'file', fileId: 'pi-dep-repo' },
              { type: 'file', fileId: 'pi-emp-repo' },
              { type: 'file', fileId: 'pi-cred-repo' },
            ],
          },
          {
            type: 'folder',
            name: 'service',
            defaultOpen: true,
            children: [{ type: 'file', fileId: 'pi-srv' }],
          },
          { type: 'file', fileId: 'pi-app' },
        ],
      },
      {
        type: 'folder',
        name: 'src/main/resources',
        defaultOpen: true,
        children: [{ type: 'file', fileId: 'pi-props' }],
      },
    ],
    files: [
      {
        id: 'pi-dep',
        name: 'Departamento.java',
        path: 'src/main/java/javier/com/pispring/entity/Departamento.java',
        lang: 'java',
        badge: '1:N',
        code: `package javier.com.pispring.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private int planta;

    @OneToMany(mappedBy = "departamento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("departamento")
    private List<Empleado> empleados = new ArrayList<>();
}`,
        explanationTitle: 'Entidad Departamento',
        explanation: [
          'Relación 1:N con Empleado usando @JsonIgnoreProperties("departamento") para serializar los empleados sin recursión infinita.',
        ],
      },
      {
        id: 'pi-emp',
        name: 'Empleado.java',
        path: 'src/main/java/javier/com/pispring/entity/Empleado.java',
        lang: 'java',
        badge: 'N:1 + 1:1',
        code: `package javier.com.pispring.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "empleados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String puestos;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credencial_id", referencedColumnName = "id", unique = true)
    private Credencial credencial;

    @ManyToOne
    @JoinColumn(name = "departamento_id")
    @JsonIgnoreProperties("empleados")
    private Departamento departamento;
}`,
        explanationTitle: 'Entidad Empleado',
        explanation: [
          'Conecta en 1:1 con Credencial (clave foránea única credencial_id) y en N:1 con Departamento (departamento_id).',
        ],
      },
      {
        id: 'pi-cred',
        name: 'Credencial.java',
        path: 'src/main/java/javier/com/pispring/entity/Credencial.java',
        lang: 'java',
        badge: 'Entity',
        code: `package javier.com.pispring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "credenciales")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Credencial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String codigo;

    @Column(nullable = false)
    private String nivelSeguridad;
}`,
        explanationTitle: 'Entidad Credencial',
        explanation: [
          'Almacena el código alfanumérico único y nivel de seguridad asociado exclusivamente a un empleado.',
        ],
      },
      {
        id: 'pi-dep-repo',
        name: 'DepartamentoRepository.java',
        path: 'src/main/java/javier/com/pispring/repository/DepartamentoRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package javier.com.pispring.repository;

import javier.com.pispring.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
}`,
        explanationTitle: 'Repositorio de Departamento',
        explanation: ['Hereda todas las operaciones CRUD de JpaRepository<Departamento, Long>.'],
      },
      {
        id: 'pi-emp-repo',
        name: 'EmpleadoRepository.java',
        path: 'src/main/java/javier/com/pispring/repository/EmpleadoRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package javier.com.pispring.repository;

import javier.com.pispring.entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}`,
        explanationTitle: 'Repositorio de Empleado',
        explanation: ['Hereda todas las operaciones CRUD de JpaRepository<Empleado, Long>.'],
      },
      {
        id: 'pi-cred-repo',
        name: 'CredencialRepository.java',
        path: 'src/main/java/javier/com/pispring/repository/CredencialRepository.java',
        lang: 'java',
        badge: 'Repo',
        code: `package javier.com.pispring.repository;

import javier.com.pispring.entity.Credencial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CredencialRepository extends JpaRepository<Credencial, Long> {
    Optional<Credencial> findByCodigo(String codigo);
}`,
        explanationTitle: 'Repositorio de Credencial',
        explanation: ['Añade la búsqueda por código devolviendo Optional<Credencial>.'],
      },
      {
        id: 'pi-srv',
        name: 'DepartamentoService.java',
        path: 'src/main/java/javier/com/pispring/service/DepartamentoService.java',
        lang: 'java',
        badge: 'Service',
        code: `package javier.com.pispring.service;

import javier.com.pispring.entity.Departamento;
import javier.com.pispring.repository.DepartamentoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    public DepartamentoService(DepartamentoRepository departamentoRepository) {
        this.departamentoRepository = departamentoRepository;
    }

    @Transactional
    public Departamento guardar(Departamento departamento) {
        if (departamento.getEmpleados() != null) {
            departamento.getEmpleados().forEach(empleado -> empleado.setDepartamento(departamento));
        }
        return departamentoRepository.save(departamento);
    }

    @Transactional(readOnly = true)
    public List<Departamento> listarTodos() {
        return departamentoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Departamento> buscarPorId(Long id) {
        return departamentoRepository.findById(id);
    }
}`,
        explanationTitle: 'Servicio Transaccional',
        explanation: [
          'Enlaza cada empleado con su departamento antes de guardar para mantener la integridad referencial al recibir JSON anidado.',
        ],
      },
      {
        id: 'pi-ctrl',
        name: 'DepartamentoController.java',
        path: 'src/main/java/javier/com/pispring/controller/DepartamentoController.java',
        lang: 'java',
        badge: 'REST',
        code: `package javier.com.pispring.controller;

import javier.com.pispring.entity.Departamento;
import javier.com.pispring.service.DepartamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    private final DepartamentoService departamentoService;

    public DepartamentoController(DepartamentoService departamentoService) {
        this.departamentoService = departamentoService;
    }

    @PostMapping
    public ResponseEntity<Departamento> crearDepartamento(@RequestBody Departamento departamento) {
        Departamento guardado = departamentoService.guardar(departamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    @GetMapping
    public ResponseEntity<List<Departamento>> listarTodos() {
        return ResponseEntity.ok(departamentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departamento> obtenerPorId(@PathVariable Long id) {
        return departamentoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}`,
        explanationTitle: 'Controlador REST de Departamentos',
        explanation: [
          'Expone POST (201 Created), GET all y GET by ID (con 404 Not Found si no existe).',
        ],
      },
      {
        id: 'pi-h2',
        name: 'H2ConsoleConfig.java',
        path: 'src/main/java/javier/com/pispring/config/H2ConsoleConfig.java',
        lang: 'java',
        badge: 'Config',
        code: `package javier.com.pispring.config;

import org.h2.server.web.JakartaWebServlet;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class H2ConsoleConfig {

    @Bean
    public ServletRegistrationBean<JakartaWebServlet> h2servletRegistration() {
        ServletRegistrationBean<JakartaWebServlet> registrationBean =
                new ServletRegistrationBean<>(new JakartaWebServlet());
        registrationBean.addUrlMappings("/h2-console/*");
        return registrationBean;
    }
}`,
        explanationTitle: 'Configuración de consola H2',
        explanation: ['Registra /h2-console/* en el proyecto piSpring.'],
      },
      {
        id: 'pi-app',
        name: 'PiSpringApplication.java',
        path: 'src/main/java/javier/com/pispring/PiSpringApplication.java',
        lang: 'java',
        badge: 'Main',
        code: `package javier.com.pispring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PiSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(PiSpringApplication.class, args);
    }
}`,
        explanationTitle: 'Clase principal de arranque',
        explanation: ['Arranca el contexto Spring Boot del proyecto piSpring.'],
      },
      {
        id: 'pi-props',
        name: 'application.properties',
        path: 'src/main/resources/application.properties',
        lang: 'properties',
        badge: 'Config',
        code: `spring.application.name=piSpring
spring.datasource.url=jdbc:h2:mem:empresa_db
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console`,
        explanationTitle: 'Propiedades de conexión H2',
        explanation: ['Configura la base en memoria empresa_db y activa la consola web en /h2-console.'],
      },
    ],
  },
];

