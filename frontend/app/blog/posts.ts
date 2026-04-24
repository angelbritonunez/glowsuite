export interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: number
  publishedAt: string // ISO date
  description: string // for metadata
}

export const posts: Post[] = [
  {
    slug: "como-organizar-clientes-mary-kay",
    title: "Cómo organizar tus clientes de Mary Kay (y de cualquier empresa de venta directa)",
    excerpt:
      "Llevar a tus clientas en un cuaderno o en notas del celular funciona al principio, pero conforme crece tu negocio se vuelve caótico. Aquí te explicamos cómo pasar a un sistema que escala.",
    category: "Organización",
    readTime: 6,
    publishedAt: "2026-04-22",
    description:
      "Aprende a organizar tu cartera de clientes de Mary Kay o venta directa con un sistema que escala: fichas de cliente, historial de compras y seguimientos automatizados.",
  },
  {
    slug: "sistema-2-2-2-seguimiento-post-venta",
    title: "Qué es el sistema 2+2+2 y cómo aplicarlo en tu negocio de belleza",
    excerpt:
      "El 2+2+2 es el método de seguimiento post-venta más efectivo en venta directa: tres contactos en el momento exacto que la clienta más lo necesita. Aquí te enseñamos cómo funciona.",
    category: "Ventas",
    readTime: 7,
    publishedAt: "2026-04-22",
    description:
      "Guía completa del sistema 2+2+2 de seguimiento post-venta: qué es, por qué funciona y cómo aplicarlo en tu negocio de Mary Kay, Yanbal o venta directa.",
  },
  {
    slug: "como-llevar-cuentas-negocio-venta-directa",
    title: "Cómo llevar las cuentas de tu negocio de venta directa sin ser contadora",
    excerpt:
      "Muchas consultoras no saben exactamente cuánto ganan. Con unas pocas métricas clave y las herramientas correctas puedes tener claridad financiera total sin complicarte.",
    category: "Finanzas",
    readTime: 8,
    publishedAt: "2026-04-22",
    description:
      "Aprende a llevar las cuentas de tu negocio de venta directa: ganancias, inventario, ventas a crédito y metas mensuales. Sin ser contadora y sin Excel complicado.",
  },
  {
    slug: "como-saber-quien-te-debe-dinero-belleza",
    title: "Cómo saber quién te debe dinero en tu negocio de belleza",
    excerpt:
      "Las ventas a crédito son buenas para retener clientas, pero si no llevas el control te pueden descapitalizar. Te mostramos cómo gestionar tus cuentas por cobrar de forma simple.",
    category: "Cobros",
    readTime: 5,
    publishedAt: "2026-04-22",
    description:
      "Cómo llevar el control de ventas a crédito y cuentas por cobrar en tu negocio de belleza o venta directa: métodos manuales y con software especializado.",
  },
]
