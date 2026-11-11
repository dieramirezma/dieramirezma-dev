import type { DiagramName, Locale } from '@/types'
import { Caption, DiagramFrame, Edge, Group, Node } from '@/components/diagrams/primitives'

interface DiagramProps {
  locale: Locale
}

const T = {
  en: {
    before: 'Before',
    after: 'After',
    app: 'Country app',
    codebase: 'One codebase',
    ui: 'UI + features',
    config: 'Configuration',
    flags: 'Feature flags',
    markets: '10+ markets',
    storefront: 'Storefront',
    widget: 'Payment widget',
    pay: 'pay',
    webhook: 'webhook',
    api: 'API',
    state: 'Payment state',
    stateSub: 'pending · confirmed · refunded',
    orders: 'orders',
    fsTitle: 'FullStyle architecture',
    fsDesc:
      'Web and Flutter clients enter through an Nginx proxy. Inside an internal Docker network, the Next.js web app calls an Apollo GraphQL gateway, which reaches a Go auth service and the Flask business API. The FastAPI chatbot acts through the business API with a delegated identity. Business rules and PostgreSQL are the authority; email leaves asynchronously from a PostgreSQL outbox through RabbitMQ.',
    network: 'Internal Docker network',
    clients: 'Clients',
    proxy: 'proxy',
    webApp: 'Web app',
    authService: 'Auth service',
    business: 'Business API',
    truth: 'source of truth',
    mail: 'Mail delivery',
    delegated: 'delegated',
    outbox: 'outbox',
    legendAuthority: 'Authority: business rules and PostgreSQL',
    legendAsync: 'Asynchronous',
    people: 'Team members',
    auth: 'Authentication',
    nursery: 'Nursery',
    planting: 'Planting',
    record: 'Traceability data',
    stages: 'Lifecycle stages',
    rtTitle: 'Bus Tracking architecture',
    rtDesc:
      'A Fastify API on Render polls the TransMilenio GTFS Realtime feed every 30 seconds, keeps only trunk buses, derives their heading and holds the snapshot in memory; the browser asks it for /vehicles every 15 seconds. The browser loads the static Next.js site and the route and station GeoJSON from Cloudflare Pages and the map tiles from OpenFreeMap. A daily GitHub Action downloads GTFS.zip, rebuilds the data and triggers new deploys of the API and the site.',
    vectorTiles: 'vector tiles',
    browser: 'Browser',
    apiNote: 'trunk only · heading · cache',
    daily: 'daily · 05:00 Bogotá',
    staticExport: 'static export',
    tiles: 'tiles',
    redeploy: 'redeploy',
    rebuild: 'rebuild',
    legendServer: 'The only server I run',
    legendDaily: 'Daily data build',
  },
  es: {
    before: 'Antes',
    after: 'Después',
    app: 'App por país',
    codebase: 'Un solo código',
    ui: 'UI + funciones',
    config: 'Configuración',
    flags: 'Feature flags',
    markets: '10+ mercados',
    storefront: 'Tienda',
    widget: 'Widget de pago',
    pay: 'pago',
    webhook: 'webhook',
    api: 'API',
    state: 'Estado del pago',
    stateSub: 'pendiente · confirmado · devuelto',
    orders: 'órdenes',
    fsTitle: 'Arquitectura de FullStyle',
    fsDesc:
      'Los clientes web y Flutter entran por un proxy Nginx. Dentro de una red Docker interna, la web en Next.js llama a un gateway GraphQL con Apollo, que llega al servicio de autenticación en Go y a la API de negocio en Flask. El chatbot en FastAPI actúa a través de la API de negocio con una identidad delegada. Las reglas de negocio y PostgreSQL son la autoridad; el correo sale de forma asíncrona desde un outbox en PostgreSQL a través de RabbitMQ.',
    network: 'Red Docker interna',
    clients: 'Clientes',
    proxy: 'proxy',
    webApp: 'Web',
    authService: 'Autenticación',
    business: 'API de negocio',
    truth: 'fuente de verdad',
    mail: 'Envío de correo',
    delegated: 'delegada',
    outbox: 'outbox',
    legendAuthority: 'Autoridad: reglas de negocio y PostgreSQL',
    legendAsync: 'Asíncrono',
    people: 'Integrantes',
    auth: 'Autenticación',
    nursery: 'Vivero',
    planting: 'Siembra',
    record: 'Datos de trazabilidad',
    stages: 'Etapas del ciclo',
    rtTitle: 'Arquitectura de Bus Tracking',
    rtDesc:
      'Un API en Fastify sobre Render consulta cada 30 segundos el feed GTFS Realtime de TransMilenio, conserva solo los buses troncales, calcula su rumbo y guarda el resultado en memoria; el navegador le pide /vehicles cada 15 segundos. El navegador carga el sitio estático de Next.js y el GeoJSON de rutas y estaciones desde Cloudflare Pages, y los tiles del mapa desde OpenFreeMap. Una GitHub Action diaria descarga GTFS.zip, regenera los datos y dispara nuevos despliegues del API y del sitio.',
    vectorTiles: 'tiles vectoriales',
    browser: 'Navegador',
    apiNote: 'troncales · rumbo · caché',
    daily: 'diario · 05:00 Bogotá',
    staticExport: 'export estático',
    tiles: 'tiles',
    redeploy: 'redespliegue',
    rebuild: 'rebuild',
    legendServer: 'El único servidor propio',
    legendDaily: 'Build diario de datos',
  },
} as const

function MultiMarket({ locale }: DiagramProps) {
  const t = T[locale]
  const squares = Array.from({ length: 10 }, (_, i) => ({
    x: 500 + (i % 2) * 36,
    y: 70 + Math.floor(i / 2) * 36,
  }))
  return (
    <DiagramFrame
      width={640}
      height={300}
      title={`${t.before} → ${t.after}`}
      desc={`3 ${t.app} → ${t.codebase} (${t.config}, ${t.flags}) → ${t.markets}`}
    >
      <Caption x={20} y={18}>
        {t.before}
      </Caption>
      {[0, 1, 2].map(i => (
        <Node key={i} x={20} y={52 + i * 70} w={130} h={46} label={`${t.app} ${i + 1}`} />
      ))}
      {[0, 1, 2].map(i => (
        <Edge
          key={i}
          points={[
            [150, 75 + i * 70],
            [220, 150],
          ]}
        />
      ))}
      <Caption x={220} y={18}>
        {t.after}
      </Caption>
      <Group x={220} y={52} w={210} h={216} label={t.codebase} />
      <Node x={240} y={76} w={170} h={44} label={t.ui} />
      <Node x={240} y={134} w={170} h={44} label={t.config} accent />
      <Node x={240} y={192} w={170} h={44} label={t.flags} accent />
      <Edge
        points={[
          [430, 160],
          [490, 160],
        ]}
      />
      {squares.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={28}
          height={28}
          rx={2}
          className="fill-bg stroke-rule-strong"
          strokeWidth={1.25}
        />
      ))}
      <text x={500} y={272} className="fill-fg font-mono" fontSize={13}>
        {t.markets}
      </text>
    </DiagramFrame>
  )
}

function Payments({ locale }: DiagramProps) {
  const t = T[locale]
  return (
    <DiagramFrame
      width={640}
      height={300}
      title="Next.js → Wompi → Django → PostgreSQL"
      desc={`${t.storefront} (Next.js) → ${t.widget} → Wompi → ${t.webhook} → Django ${t.api} → PostgreSQL`}
    >
      <Node x={20} y={40} w={150} h={52} label={t.storefront} sub="Next.js" />
      <Node x={245} y={40} w={150} h={52} label={t.widget} sub="Wompi" />
      <Node x={470} y={40} w={150} h={52} label="Wompi" accent />
      <Edge
        points={[
          [170, 66],
          [245, 66],
        ]}
      />
      <Edge
        points={[
          [395, 66],
          [470, 66],
        ]}
        label={t.pay}
        labelAt={[432, 56]}
      />
      <Node x={245} y={190} w={150} h={52} label={`Django ${t.api}`} sub="REST" />
      <Node x={470} y={190} w={150} h={52} label="PostgreSQL" sub={t.state} />
      <Edge
        points={[
          [545, 92],
          [545, 140],
          [345, 140],
          [345, 190],
        ]}
        label={t.webhook}
        labelAt={[445, 132]}
      />
      <Edge
        points={[
          [395, 216],
          [470, 216],
        ]}
      />
      <Edge
        points={[
          [95, 92],
          [95, 216],
          [245, 216],
        ]}
        label={t.orders}
        labelAt={[105, 160]}
        anchor="start"
      />
      <text x={620} y={266} textAnchor="end" className="fill-subtle font-mono" fontSize={12}>
        {t.stateSub}
      </text>
    </DiagramFrame>
  )
}

function FullStyle({ locale }: DiagramProps) {
  const t = T[locale]
  return (
    <DiagramFrame width={880} height={488} title={t.fsTitle} desc={t.fsDesc}>
      <Group x={272} y={48} w={592} h={384} label={t.network} />

      <Edge
        points={[
          [120, 196],
          [152, 196],
        ]}
      />
      <Edge
        points={[
          [248, 100],
          [296, 100],
        ]}
      />
      <Edge
        points={[
          [370, 128],
          [370, 168],
        ]}
      />
      <Edge
        points={[
          [248, 244],
          [540, 244],
          [540, 224],
        ]}
        label="REST"
        labelAt={[372, 264]}
      />
      <Edge
        points={[
          [248, 292],
          [508, 292],
        ]}
      />
      <Edge
        points={[
          [444, 180],
          [476, 180],
          [476, 100],
          [508, 100],
        ]}
      />
      <Edge
        points={[
          [444, 204],
          [508, 204],
        ]}
      />
      <Edge
        points={[
          [616, 264],
          [616, 224],
        ]}
        label={t.delegated}
        labelAt={[628, 248]}
        anchor="start"
      />
      {[100, 196, 292].map(y => (
        <Edge
          key={y}
          points={[
            [660, y],
            [724, y],
          ]}
        />
      ))}
      <Edge
        points={[
          [788, 320],
          [788, 352],
        ]}
        label={t.outbox}
        labelAt={[800, 340]}
        anchor="start"
        dashed
      />

      <Node x={16} y={168} w={104} h={56} label={t.clients} sub="Web · Flutter" muted />
      <Node x={152} y={72} w={96} h={248} label="Nginx" sub={t.proxy} />
      <Node x={296} y={72} w={148} h={56} label={t.webApp} sub="Next.js · NextAuth" />
      <Node x={296} y={168} w={148} h={56} label="API gateway" sub="Apollo GraphQL" />
      <Node x={508} y={72} w={152} h={56} label={t.authService} sub="Go · Gin" />
      <Node x={508} y={168} w={152} h={56} label={t.business} sub="Flask · Redis cache" accent />
      <Node x={508} y={264} w={152} h={56} label="Chatbot" sub="FastAPI" />
      <Node x={724} y={72} w={128} h={248} label="PostgreSQL" sub={t.truth} accent />
      <Node x={708} y={352} w={144} h={56} label={t.mail} sub="RabbitMQ · worker" />

      <line x1={16} y1={448} x2={864} y2={448} className="stroke-rule" strokeWidth={1} />
      <rect x={16} y={464} width={12} height={12} rx={2} className="fill-bg stroke-accent" />
      <text x={36} y={474} className="fill-subtle font-mono" fontSize={12}>
        {t.legendAuthority}
      </text>
      <Edge
        points={[
          [480, 470],
          [512, 470],
        ]}
        dashed
      />
      <text x={524} y={474} className="fill-subtle font-mono" fontSize={12}>
        {t.legendAsync}
      </text>
    </DiagramFrame>
  )
}

function Lifecycle({ locale }: DiagramProps) {
  const t = T[locale]
  return (
    <DiagramFrame
      width={640}
      height={290}
      title={`${t.nursery} → ${t.planting}`}
      desc={`${t.people} → ${t.auth} → ${t.nursery} → ${t.planting}, both writing to ${t.record}`}
    >
      <Node x={20} y={60} w={120} h={52} label={t.people} />
      <Edge
        points={[
          [140, 86],
          [190, 86],
        ]}
      />
      <Node x={190} y={60} w={130} h={52} label={t.auth} accent />
      <Edge
        points={[
          [320, 86],
          [370, 86],
        ]}
      />
      <Group x={360} y={40} w={260} h={92} label={t.stages} />
      <Node x={375} y={60} w={100} h={52} label={t.nursery} />
      <Edge
        points={[
          [475, 86],
          [505, 86],
        ]}
      />
      <Node x={505} y={60} w={100} h={52} label={t.planting} />
      <Edge
        points={[
          [425, 112],
          [425, 190],
          [450, 190],
        ]}
      />
      <Edge
        points={[
          [555, 112],
          [555, 160],
          [500, 160],
          [500, 190],
        ]}
      />
      <Node x={300} y={190} w={320} h={52} label={t.record} />
    </DiagramFrame>
  )
}

function BusTracking({ locale }: DiagramProps) {
  const t = T[locale]
  return (
    <DiagramFrame width={880} height={440} title={t.rtTitle} desc={t.rtDesc}>
      <Edge
        points={[
          [168, 200],
          [336, 200],
        ]}
        label="GTFS-RT · 30 s"
        labelAt={[252, 188]}
      />
      <Edge
        points={[
          [568, 200],
          [712, 200],
        ]}
        label="/vehicles · 15 s"
        labelAt={[640, 188]}
      />
      <Edge
        points={[
          [788, 88],
          [788, 172],
        ]}
        label={t.tiles}
        labelAt={[776, 134]}
        anchor="end"
      />
      <Edge
        points={[
          [788, 312],
          [788, 228],
        ]}
        label="HTML · GeoJSON"
        labelAt={[776, 274]}
        anchor="end"
      />
      <Edge
        points={[
          [92, 228],
          [92, 340],
          [336, 340],
        ]}
        label="GTFS.zip"
        labelAt={[214, 330]}
        dashed
      />
      <Edge
        points={[
          [452, 312],
          [452, 240],
        ]}
        label={t.redeploy}
        labelAt={[464, 280]}
        anchor="start"
        dashed
      />
      <Edge
        points={[
          [568, 340],
          [712, 340],
        ]}
        label={t.rebuild}
        labelAt={[640, 330]}
        dashed
      />

      <Node x={16} y={172} w={152} h={56} label="TransMilenio" sub="GTFS · GTFS-RT" muted />
      <Node x={712} y={32} w={152} h={56} label="OpenFreeMap" sub={t.vectorTiles} muted />
      <Node
        x={336}
        y={160}
        w={232}
        h={80}
        label="API"
        sub="Fastify · Render"
        note={t.apiNote}
        accent
      />
      <Node x={712} y={172} w={152} h={56} label={t.browser} sub="Next.js · MapLibre" />
      <Node x={336} y={312} w={232} h={56} label="GitHub Actions" sub={t.daily} />
      <Node x={712} y={312} w={152} h={56} label="Cloudflare Pages" sub={t.staticExport} />

      <line x1={16} y1={400} x2={864} y2={400} className="stroke-rule" strokeWidth={1} />
      <rect x={16} y={416} width={12} height={12} rx={2} className="fill-bg stroke-accent" />
      <text x={36} y={426} className="fill-subtle font-mono" fontSize={12}>
        {t.legendServer}
      </text>
      <Edge
        points={[
          [320, 422],
          [352, 422],
        ]}
        dashed
      />
      <text x={364} y={426} className="fill-subtle font-mono" fontSize={12}>
        {t.legendDaily}
      </text>
    </DiagramFrame>
  )
}

const DIAGRAMS = {
  'multi-market': MultiMarket,
  payments: Payments,
  services: FullStyle,
  lifecycle: Lifecycle,
  realtime: BusTracking,
} satisfies Record<DiagramName, (props: DiagramProps) => React.ReactNode>

const WIDTHS: Partial<Record<DiagramName, number>> = { services: 880, realtime: 880 }

export function diagramWidth(name: DiagramName) {
  return WIDTHS[name] ?? 640
}

export function Diagram({ name, locale }: { name: DiagramName; locale: Locale }) {
  const Component = DIAGRAMS[name]
  return <Component locale={locale} />
}
