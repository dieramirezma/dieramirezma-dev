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
    frontend: 'Frontend',
    services: 'Microservices',
    service: 'service',
    people: 'Team members',
    auth: 'Authentication',
    nursery: 'Nursery',
    planting: 'Planting',
    record: 'Traceability data',
    stages: 'Lifecycle stages',
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
    frontend: 'Frontend',
    services: 'Microservicios',
    service: 'servicio',
    people: 'Integrantes',
    auth: 'Autenticación',
    nursery: 'Vivero',
    planting: 'Siembra',
    record: 'Datos de trazabilidad',
    stages: 'Etapas del ciclo',
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

function Services({ locale }: DiagramProps) {
  const t = T[locale]
  return (
    <DiagramFrame
      width={700}
      height={310}
      title="Next.js → Go + Flask → PostgreSQL"
      desc={`${t.frontend}: Next.js + NextAuth → ${t.services}: Go, Flask on Docker and Kubernetes / GKE → PostgreSQL; Flask ↔ Wompi`}
    >
      <Node x={20} y={118} w={150} h={56} label="Next.js" sub="NextAuth" />
      <Group x={220} y={44} w={280} h={226} label="Docker · Kubernetes / GKE" />
      <Node x={250} y={78} w={220} h={50} label={`Go ${t.service}`} />
      <Node x={250} y={180} w={220} h={50} label={`Flask ${t.service}`} />
      <Edge
        points={[
          [170, 135],
          [200, 135],
          [200, 103],
          [250, 103],
        ]}
      />
      <Edge
        points={[
          [170, 158],
          [200, 158],
          [200, 205],
          [250, 205],
        ]}
      />
      <Node x={550} y={180} w={130} h={50} label="PostgreSQL" />
      <Edge
        points={[
          [470, 214],
          [550, 214],
        ]}
      />
      <Node x={550} y={78} w={130} h={50} label="Wompi" accent />
      <Edge
        points={[
          [470, 190],
          [520, 190],
          [520, 103],
          [550, 103],
        ]}
      />
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

const DIAGRAMS = {
  'multi-market': MultiMarket,
  payments: Payments,
  services: Services,
  lifecycle: Lifecycle,
} satisfies Record<DiagramName, (props: DiagramProps) => React.ReactNode>

export function Diagram({ name, locale }: { name: DiagramName; locale: Locale }) {
  const Component = DIAGRAMS[name]
  return <Component locale={locale} />
}
