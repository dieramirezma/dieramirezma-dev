import type { AlsoProject, Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    slug: 'multi-market-platform',
    title: 'Multi-market platform',
    featured: true,
    diagram: 'multi-market',
    year: '2025',
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Orval',
      'Vitest',
      'GitHub Actions',
    ],
    context: {
      en: 'Professional · Dapper',
      es: 'Profesional · Dapper',
    },
    summary: {
      en: 'Three country-specific apps consolidated into one feature-flag-driven codebase, as the platform grew from 3 to 10+ markets.',
      es: 'Tres aplicaciones por país consolidadas en un solo código basado en feature flags, mientras la plataforma pasaba de 3 a más de 10 mercados.',
    },
    role: {
      en: 'I led the consolidation of the country-specific frontends.',
      es: 'Lideré la consolidación de los frontends por país.',
    },
    problem: {
      en: 'The B2B SaaS platform ran as three separate country applications. Each new market meant more duplication, and expanding became harder with every copy.',
      es: 'La plataforma B2B SaaS funcionaba como tres aplicaciones separadas por país. Cada mercado nuevo significaba más duplicación, y expandirse era cada vez más difícil.',
    },
    approach: {
      en: 'Merge the three repositories into a single codebase where country differences live in configuration and feature flags instead of in forks of the code.',
      es: 'Unificar los tres repositorios en un solo código donde las diferencias entre países viven en configuración y feature flags, y no en copias del código.',
    },
    highlights: {
      en: [
        'Country behavior is expressed as configuration and feature flags, so a new market is a configuration concern rather than a new application.',
        'REST integrations with the Django backend are type-safe, generated with Orval and consumed through TanStack Query, giving every feature the same data-fetching pattern.',
        'A suite of 100+ automated tests (Vitest and React Testing Library) runs in GitHub Actions CI/CD, which makes a shared codebase safe to change.',
        'Authentication uses NextAuth and JWT.',
      ],
      es: [
        'El comportamiento por país se expresa con configuración y feature flags, así que un mercado nuevo es un tema de configuración y no una aplicación nueva.',
        'Las integraciones REST con el backend en Django son type-safe, generadas con Orval y consumidas con TanStack Query, lo que da a cada funcionalidad el mismo patrón de acceso a datos.',
        'Más de 100 pruebas automatizadas (Vitest y React Testing Library) corren en CI/CD con GitHub Actions, lo que hace seguro cambiar un código compartido.',
        'La autenticación usa NextAuth y JWT.',
      ],
    },
    outcome: {
      en: 'The core consolidation took about one month. Over roughly six months the platform grew from 3 to 10+ Latin American markets. This case study is intentionally high level; implementation details are confidential.',
      es: 'La consolidación principal tomó cerca de un mes. En aproximadamente seis meses la plataforma pasó de 3 a más de 10 mercados latinoamericanos. Este caso es intencionalmente de alto nivel; los detalles de implementación son confidenciales.',
    },
    links: [],
  },
  {
    slug: 'bus-tracking',
    title: 'Bus Tracking',
    featured: true,
    diagram: 'realtime',
    diagramScope: 'deployed',
    image: {
      src: '/projects/bus-tracking.png',
      width: 1600,
      height: 1000,
      alt: {
        en: 'The live map of Bogotá in dark mode: TransMilenio trunk routes in red and dual routes in green, each bus drawn as a dot along its corridor, with a panel counting 368 buses in operation.',
        es: 'El mapa en vivo de Bogotá en modo oscuro: rutas troncales de TransMilenio en rojo y duales en verde, cada bus dibujado como un punto sobre su corredor, con un panel que cuenta 368 buses en operación.',
      },
    },
    year: '2026',
    stack: [
      'Next.js',
      'TypeScript',
      'Fastify',
      'MapLibre GL',
      'GTFS Realtime',
      'Cloudflare Pages',
      'Render',
      'GitHub Actions',
      'Vitest',
      'Turborepo',
    ],
    context: {
      en: 'Personal project · Open data',
      es: 'Proyecto personal · Datos abiertos',
    },
    summary: {
      en: 'A live map of TransMilenio’s trunk and dual buses in Bogotá, with routes and stations, built on the open GTFS and GTFS Realtime data the operator publishes.',
      es: 'Un mapa en vivo de los buses troncales y duales de TransMilenio en Bogotá, con sus rutas y estaciones, construido sobre los datos abiertos GTFS y GTFS Realtime que publica el operador.',
    },
    role: {
      en: 'Solo project, end to end: data preprocessing, API, map frontend, tests, CI and deployment.',
      es: 'Proyecto individual de extremo a extremo: preprocesamiento de datos, API, frontend del mapa, pruebas, CI y despliegue.',
    },
    problem: {
      en: 'TransMilenio publishes bus positions as a GTFS Realtime protobuf feed, but a browser cannot read it: the feed sends no CORS headers and answers with Cross-Origin-Resource-Policy: same-origin. It carries 4,000+ vehicles, most of them not trunk buses, and no heading or speed.',
      es: 'TransMilenio publica las posiciones de los buses como un feed protobuf GTFS Realtime, pero el navegador no puede leerlo: el feed no envía cabeceras CORS y responde con Cross-Origin-Resource-Policy: same-origin. Trae más de 4.000 vehículos, en su mayoría no troncales, y no incluye rumbo ni velocidad.',
    },
    approach: {
      en: 'One small Fastify API is the only server: it polls the feed every 30 seconds, keeps the trunk and dual buses, derives each heading from consecutive positions and serves the snapshot from memory. The frontend is a static Next.js export on Cloudflare Pages that draws the buses with MapLibre over OpenFreeMap tiles and asks for /vehicles every 15 seconds. Routes and stations come from the static GTFS, preprocessed once a day into light JSON and GeoJSON.',
      es: 'Un pequeño API en Fastify es el único servidor: consulta el feed cada 30 segundos, conserva los buses troncales y duales, calcula el rumbo de cada uno con posiciones consecutivas y entrega el resultado desde memoria. El frontend es un export estático de Next.js en Cloudflare Pages que dibuja los buses con MapLibre sobre tiles de OpenFreeMap y consulta /vehicles cada 15 segundos. Rutas y estaciones salen del GTFS estático, preprocesado una vez al día en JSON y GeoJSON livianos.',
    },
    highlights: {
      en: [
        'The API turns about 180 KB of protobuf with 4,000+ vehicles into about 20 KB gzipped with only the trunk buses.',
        'Heading is computed between consecutive positions and only updated after a move of about 15 m, so GPS noise does not spin a stopped bus. Buses glide between readings unless the visitor prefers reduced motion.',
        'A daily GitHub Action downloads the static GTFS (about 121 MB), streams its 578 MB stop_times file, simplifies route shapes with Douglas-Peucker and commits only when the data changed; Render and Cloudflare Pages redeploy from that commit.',
        'Built for free tiers: the map detects a cold start and says the server is waking up, backs off on errors and stops polling while the tab is hidden. /health reports stale feeds and route IDs missing from the static GTFS.',
        'The rate limit is keyed on Cloudflare’s CF-Connecting-IP, so a forged X-Forwarded-For cannot bypass it, and CORS only admits the site’s own origins.',
        'CI checks formatting, types, Vitest tests against a recorded feed and the build on every pull request and push to main.',
      ],
      es: [
        'El API reduce cerca de 180 KB de protobuf con más de 4.000 vehículos a unos 20 KB comprimidos con solo los buses troncales.',
        'El rumbo se calcula entre posiciones consecutivas y solo se actualiza tras un movimiento de unos 15 m, para que el ruido del GPS no haga girar a un bus detenido. Los buses se desplazan suavemente entre lecturas, salvo que el visitante prefiera movimiento reducido.',
        'Una GitHub Action diaria descarga el GTFS estático (cerca de 121 MB), procesa en streaming su archivo stop_times de 578 MB, simplifica los trazados con Douglas-Peucker y solo hace commit si los datos cambiaron; Render y Cloudflare Pages redespliegan a partir de ese commit.',
        'Pensado para planes gratuitos: el mapa detecta el arranque en frío y avisa que el servidor está despertando, espacia los reintentos ante errores y deja de consultar con la pestaña oculta. /health reporta feeds desactualizados y route_id que faltan en el GTFS estático.',
        'El rate limit usa el CF-Connecting-IP de Cloudflare, así que un X-Forwarded-For falso no sirve para saltárselo, y CORS solo admite los orígenes del propio sitio.',
        'La CI revisa formato, tipos, pruebas con Vitest sobre un feed grabado y el build en cada pull request y push a main.',
      ],
    },
    outcome: {
      en: 'Live at bus-tracking.dieramirezma.dev on free tiers (Render, Cloudflare Pages, OpenFreeMap). The API sleeps after 15 minutes without traffic, so the first visit can take about a minute. Data © TRANSMILENIO S.A.',
      es: 'En vivo en bus-tracking.dieramirezma.dev sobre planes gratuitos (Render, Cloudflare Pages, OpenFreeMap). El API se duerme tras 15 minutos sin tráfico, así que la primera visita puede tardar cerca de un minuto. Datos © TRANSMILENIO S.A.',
    },
    links: [
      {
        label: { en: 'Live site', es: 'Sitio en vivo' },
        href: 'https://bus-tracking.dieramirezma.dev',
      },
      {
        label: { en: 'Repository', es: 'Repositorio' },
        href: 'https://github.com/dieramirezma/bus-tracking',
      },
    ],
  },
  {
    slug: 'dulce-berlin',
    title: 'Dulce Berlín',
    diagram: 'payments',
    year: '2024',
    stack: ['Next.js', 'Django', 'PostgreSQL', 'Wompi'],
    context: {
      en: 'Freelance · E-commerce',
      es: 'Freelance · E-commerce',
    },
    summary: {
      en: 'End-to-end e-commerce for a small business, with the Wompi payment widget, webhooks, payment states and refunds.',
      es: 'E-commerce de extremo a extremo para un pequeño negocio, con widget de pagos Wompi, webhooks, estados de pago y devoluciones.',
    },
    role: {
      en: 'Freelance full-stack developer with end-to-end ownership: requirements, frontend, backend, payments and deployment.',
      es: 'Desarrollador full-stack freelance con responsabilidad de extremo a extremo: requerimientos, frontend, backend, pagos y despliegue.',
    },
    problem: {
      en: 'A small business needed to sell online and take payments reliably, including the cases where a payment is pending or has to be refunded.',
      es: 'Un pequeño negocio necesitaba vender en línea y recibir pagos de forma confiable, incluyendo los casos en que un pago queda pendiente o debe devolverse.',
    },
    approach: {
      en: 'A Next.js storefront on top of a Django API and PostgreSQL. The payment widget starts the transaction, and webhooks from Wompi, not the browser, decide the final payment state.',
      es: 'Una tienda en Next.js sobre una API en Django y PostgreSQL. El widget de pago inicia la transacción, y los webhooks de Wompi, no el navegador, deciden el estado final del pago.',
    },
    highlights: {
      en: [
        'Wompi payment widget integrated end to end.',
        'Payment webhooks keep order state consistent on the server.',
        'Pending-payment handling, so an order is never lost between checkout and confirmation.',
        'Refund flows built into the backend.',
      ],
      es: [
        'Widget de pagos de Wompi integrado de extremo a extremo.',
        'Los webhooks de pago mantienen consistente el estado de las órdenes en el servidor.',
        'Manejo de pagos pendientes, para que una orden no se pierda entre el checkout y la confirmación.',
        'Flujos de devolución integrados en el backend.',
      ],
    },
    links: [],
  },
  {
    slug: 'fullstyle',
    title: 'FullStyle',
    diagram: 'services',
    year: '2024–2026',
    stack: [
      'Next.js',
      'Go',
      'Flask',
      'FastAPI',
      'PostgreSQL',
      'Docker',
      'TypeScript',
      'GraphQL',
      'Redis',
      'RabbitMQ',
      'Flutter',
      'Kubernetes',
      'GKE',
    ],
    context: {
      en: 'University team project',
      es: 'Proyecto universitario en equipo',
    },
    summary: {
      en: 'A platform for barbershops and salons to manage locations, services, staff and bookings. Built by a university team, then modernized in my own public repository.',
      es: 'Una plataforma para que barberías y salones gestionen sedes, servicios, profesionales y reservas. Construida por un equipo universitario y modernizada después en mi propio repositorio público.',
    },
    role: {
      en: 'Full-stack developer in a university team (Universidad Nacional de Colombia, June 2024 to July 2025). This was an academic project, not commercial employment. I later modernized it and consolidated the team’s nine repositories into one monorepo, with the original contributors credited.',
      es: 'Desarrollador full-stack en un equipo universitario (Universidad Nacional de Colombia, junio 2024 a julio 2025). Fue un proyecto académico, no un empleo comercial. Después lo modernicé y consolidé los nueve repositorios del equipo en un monorepo, con el crédito de los colaboradores originales.',
    },
    problem: {
      en: 'Barbershops and salons need bookings, payments and customer accounts in one product. The original services also left gaps: resources without ownership checks, session issuers without a shared policy, and availability checked apart from the booking write.',
      es: 'Las barberías y salones necesitan reservas, pagos y cuentas de clientes en un solo producto. Los servicios originales también dejaban vacíos: recursos sin verificación de propiedad, emisores de sesión sin una política común y disponibilidad comprobada por separado de la escritura de la reserva.',
    },
    approach: {
      en: 'Each service keeps its own process behind an Nginx proxy: a Next.js web app with NextAuth, an Apollo GraphQL gateway, a Go auth service, a Flask business API and a FastAPI chatbot, plus a Flutter mobile client. The original ran on Docker and Google Kubernetes Engine. The modernization makes business rules and PostgreSQL the single authority: identity, bookings and payment effects are decided inside SQL transactions.',
      es: 'Cada servicio conserva su propio proceso detrás de un proxy Nginx: una web en Next.js con NextAuth, un gateway GraphQL con Apollo, un servicio de autenticación en Go, una API de negocio en Flask y un chatbot en FastAPI, además de un cliente móvil en Flutter. El original corría en Docker y Google Kubernetes Engine. La modernización convierte las reglas de negocio y PostgreSQL en la única autoridad: identidad, reservas y efectos de pago se deciden dentro de transacciones SQL.',
    },
    highlights: {
      en: [
        'Bookings are written under a per-staff lock in the same transaction that checks availability, so concurrent requests cannot confirm overlapping slots.',
        'Authentication with NextAuth, Google OAuth, 2FA and CAPTCHA, backed by one SQL session policy shared by the Go, Flask and Firebase adapters: revocable sessions and recoverable MFA.',
        'Email leaves through a PostgreSQL outbox and RabbitMQ with deduplicated delivery. Redis is a disposable cache that cannot change a booking decision.',
        'Wompi payments for appointments, with webhooks, refunds and cancellations.',
        'One Docker Compose command starts the whole stack with synthetic data. CI runs linters and type checks, then security and concurrency tests against a real PostgreSQL database, with deliberate mutations that prove the tests catch regressions.',
      ],
      es: [
        'Las reservas se escriben bajo un bloqueo por profesional en la misma transacción que comprueba la disponibilidad, así que dos solicitudes concurrentes no pueden confirmar horarios que se cruzan.',
        'Autenticación con NextAuth, Google OAuth, 2FA y CAPTCHA, respaldada por una política de sesión en SQL compartida por los adaptadores de Go, Flask y Firebase: sesiones revocables y MFA recuperable.',
        'El correo sale por un outbox en PostgreSQL y RabbitMQ con entrega deduplicada. Redis es una caché prescindible que no puede cambiar una decisión de reserva.',
        'Pagos con Wompi para citas, con webhooks, reembolsos y cancelaciones.',
        'Un solo comando de Docker Compose levanta todo el sistema con datos sintéticos. La CI ejecuta linters y verificación de tipos, luego pruebas de seguridad y concurrencia contra una base PostgreSQL real, con mutaciones deliberadas que demuestran que las pruebas detectan regresiones.',
      ],
    },
    outcome: {
      en: 'The repository runs locally with one command and no provider accounts. Payments, email and chatbot answers are scoped to the demo; it is a portfolio demo, not a production deployment.',
      es: 'El repositorio corre localmente con un solo comando y sin cuentas de proveedores. Pagos, correo y respuestas del chatbot tienen alcance de demostración; es una demo de portafolio, no un despliegue productivo.',
    },
    links: [
      {
        label: { en: 'Repository', es: 'Repositorio' },
        href: 'https://github.com/dieramirezma/fullstyle',
      },
    ],
  },
  {
    slug: 'gemalab-hackathon',
    title: 'Gemalab',
    diagram: 'lifecycle',
    year: '2024',
    stack: ['React', 'Python'],
    context: {
      en: 'Hackathon · 1st place',
      es: 'Hackathon · 1er lugar',
    },
    summary: {
      en: 'A plant-traceability platform covering the lifecycle from nursery to planting, built in a hackathon.',
      es: 'Una plataforma de trazabilidad de plantas que cubre el ciclo de vida desde el vivero hasta la siembra, construida en un hackathon.',
    },
    role: {
      en: 'Member of an interdisciplinary team. I implemented the secure authentication system and the end-to-end data flow for plant lifecycle tracking.',
      es: 'Integrante de un equipo interdisciplinario. Implementé el sistema de autenticación segura y el flujo de datos de extremo a extremo para el seguimiento del ciclo de vida de las plantas.',
    },
    problem: {
      en: 'Tracking a plant from nursery to planting needs a trustworthy record of each stage and of who changed it.',
      es: 'Hacer seguimiento a una planta desde el vivero hasta la siembra requiere un registro confiable de cada etapa y de quién la modificó.',
    },
    approach: {
      en: 'Put authentication in front of every operation, then model the lifecycle as stages whose data flows from one stage to the next.',
      es: 'Poner la autenticación al frente de cada operación y luego modelar el ciclo de vida como etapas cuyos datos fluyen de una a la siguiente.',
    },
    highlights: {
      en: [
        'Secure authentication system.',
        'End-to-end data flow for plant lifecycle tracking.',
        'Delivered under a limited hackathon time constraint.',
      ],
      es: [
        'Sistema de autenticación segura.',
        'Flujo de datos de extremo a extremo para el seguimiento del ciclo de vida.',
        'Entregado bajo el límite de tiempo de un hackathon.',
      ],
    },
    outcome: {
      en: 'The project won 1st place.',
      es: 'El proyecto obtuvo el 1er lugar.',
    },
    links: [
      {
        label: { en: 'Repository', es: 'Repositorio' },
        href: 'https://github.com/dieramirezma/hackathon-nacional-talento-tech',
      },
    ],
  },
]

export const ALSO: AlsoProject[] = [
  {
    title: 'FoodRadar',
    year: '2025',
    context: {
      en: 'Academic project · Android, team of four',
      es: 'Proyecto académico · Android, equipo de cuatro',
    },
    stack: ['Kotlin', 'Android', 'OpenStreetMap', 'Gemini AI'],
  },
]

export function getProject(slug: string) {
  return PROJECTS.find(project => project.slug === slug)
}
