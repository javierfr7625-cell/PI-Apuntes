export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  description?: string;
  tags?: string[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: 'General',
    items: [
      {
        title: 'Inicio y Guía de Estudio',
        href: '/',
        description: 'Mapa completo de la asignatura, arquitectura en capas y chuleta rápida para el examen.',
        tags: ['inicio', 'arquitectura', 'chuleta', 'spring boot'],
      },
      {
        title: 'Simulacro: Taller Don Juan',
        href: '/simulacro/taller-don-juan',
        badge: 'EXAMEN',
        description: 'Solución completa paso a paso: Entidades JPA 1:N y 1:1, 3 Repositorios, TallerService, TallerController, 404 y JSON Postman.',
        tags: ['simulacro', 'examen', 'taller don juan', 'jpa', 'onetomany', 'onetoone', '404', 'postman', 'crud'],
      },
      {
        title: 'Super Cheatcode (Explorador IDE)',
        href: '/cheatcode',
        badge: 'NUEVO',
        description: 'Árbol interactivo de carpetas y archivos de demo-spring, talleres-don-juan y piSpring con código coloreado y explicación.',
        tags: ['cheatcode', 'explorador', 'carpetas', 'demo-spring', 'talleres-don-juan', 'pispring', 'estructura'],
      },
    ],
  },
  {
    label: 'Teoría (PDFs y Apuntes)',
    items: [
      {
        title: 'Índice de Teoría',
        href: '/teoria',
        description: 'Todos los temas del módulo Spring Boot con resúmenes y descarga de PDFs.',
        tags: ['teoria', 'pdf', 'temario'],
      },
      {
        title: 'Tema 1: Introducción a Spring Boot',
        href: '/teoria/tema-1',
        description: 'IoC, Inyección de Dependencias, Spring Initializr, pom.xml, @SpringBootApplication y primer @RestController.',
        tags: ['ioc', 'di', 'spring initializr', 'pom.xml', 'restcontroller', 'getmapping', 'requestparam'],
      },
      {
        title: 'Tema 2: Persistencia JPA y Entidades',
        href: '/teoria/tema-2',
        description: 'ORM, Hibernate, H2 en memoria, application.properties, H2ConsoleConfig, @Entity, @Id, @GeneratedValue y @Column.',
        tags: ['jpa', 'hibernate', 'h2', 'entity', 'table', 'column', 'ddl-auto'],
      },
      {
        title: 'Tema 3: Spring Data JPA y Repositorios',
        href: '/teoria/tema-3',
        description: 'Patrón Repository, JpaRepository<T, ID>, Query Methods (existsBy, findBy) y pruebas con CommandLineRunner.',
        tags: ['repository', 'jparepository', 'commandlinerunner', 'save', 'findbyid', 'findall', 'deletebyid'],
      },
      {
        title: 'Tema 4: Servicios y Controladores REST',
        href: '/teoria/tema-4',
        description: 'Arquitectura en capas, @Service, @RestController, ResponseEntity, @PathVariable, @RequestBody, PUT, PATCH, DELETE y 404.',
        tags: ['service', 'controller', 'responseentity', 'put', 'patch', 'delete', '404', '201', '409'],
      },
      {
        title: 'Tema 5: Relaciones 1:1 y Lombok',
        href: '/teoria/tema-5',
        description: 'Lombok (@Data, @NoArgsConstructor, @AllArgsConstructor), @OneToOne, @JoinColumn, CascadeType.ALL y actualización en PUT/PATCH.',
        tags: ['onetoone', 'joincolumn', 'lombok', 'data', 'cascade', 'eager'],
      },
      {
        title: 'Tema 6: Relaciones 1:N (@OneToMany)',
        href: '/teoria/tema-6',
        description: '@ManyToOne, @OneToMany(mappedBy), orphanRemoval, FetchType.LAZY, @ToString.Exclude, @JsonIgnore y setter personalizado.',
        tags: ['onetomany', 'manytoone', 'mappedby', 'orphanremoval', 'lazy', 'jsonignore', 'tostring.exclude'],
      },
      {
        title: 'Tema 7: Proyecto TechCorp (Reto 1:1 + 1:N)',
        href: '/teoria/tema-7',
        description: 'Caso práctico integrador: Departamento, Empleado y Credencial con @Transactional y persistencia en cascada desde Postman.',
        tags: ['tema 7', 'techcorp', 'transactional', 'cascada', 'jsonignoreproperties'],
      },
      {
        title: 'Diapositivas de Clase (.pptx)',
        href: '/teoria/diapos',
        description: 'Resumen slide a slide y descarga de las 6 presentaciones de PowerPoint del curso.',
        tags: ['diapos', 'pptx', 'presentaciones'],
      },
    ],
  },
  {
    label: 'Práctica y Sesiones',
    items: [
      {
        title: 'Índice de Ejercicios',
        href: '/ejercicios',
        description: 'Resumen de los 2 proyectos Spring Boot resueltos en clase: demo-spring y piSpring.',
        tags: ['ejercicios', 'practica', 'demo-spring', 'pispring'],
      },
      {
        title: 'Ejercicio 1: demo-spring',
        href: '/ejercicios/demo-spring',
        description: 'Proyecto de clase: Estudiante, Profesor, H2ConsoleConfig, InicializadorDatos y CRUD REST completo con PUT/PATCH/DELETE.',
        tags: ['demo-spring', 'estudiante', 'profesor', 'ejercicio', 'patch', 'put'],
      },
      {
        title: 'Ejercicio 2: piSpring (TechCorp)',
        href: '/ejercicios/pi-spring',
        description: 'Proyecto avanzado: Departamento -> Empleado -> Credencial con @JsonIgnoreProperties y @Transactional.',
        tags: ['pispring', 'departamento', 'empleado', 'credencial', 'transactional', 'jsonignoreproperties'],
      },
      {
        title: 'Transcripciones de Clase (S01–S08)',
        href: '/transcripciones',
        description: 'Puntos clave, avisos de examen y enlaces a las 10 grabaciones transcritas (.srt) incluyendo el simulacro S08.',
        tags: ['transcripciones', 'srt', 's08', 'examen', 'consejos'],
      },
    ],
  },
];

export interface SearchEntry {
  title: string;
  href: string;
  section: string;
  description: string;
  keywords: string[];
}

export const searchIndex: SearchEntry[] = navigation.flatMap((group) =>
  group.items.map((item) => ({
    title: item.title,
    href: item.href,
    section: group.label,
    description: item.description ?? '',
    keywords: [
      item.title.toLowerCase(),
      ...(item.tags ?? []),
      ...(item.description ? item.description.toLowerCase().split(/\W+/) : []),
    ],
  }))
);

