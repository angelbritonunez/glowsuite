import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ayuda y preguntas frecuentes",
  description:
    "Resuelve tus dudas sobre GlowSuite CRM: cómo funciona el sistema 2+2+2, planes, pagos, seguimientos y más. Soporte para consultoras de venta directa en RD.",
  robots: { index: true, follow: true },
}

const faqs = [
  // --- Sobre GlowSuite CRM ---
  {
    category: "Sobre GlowSuite CRM",
    items: [
      {
        q: "¿GlowSuite CRM es oficial de Mary Kay?",
        a: "No. GlowSuite CRM es un software independiente, sin afiliación con Mary Kay, Yanbal, Avon, Natura, Herbalife ni ninguna otra empresa de venta directa. Es una herramienta de gestión diseñada para consultoras que trabajan con cualquiera de estas marcas.",
      },
      {
        q: "¿Para quién está diseñado GlowSuite CRM?",
        a: "Está diseñado para consultoras de venta directa en la República Dominicana que venden productos de belleza con marcas como Mary Kay, Yanbal, Avon, Natura o Herbalife y necesitan organizar sus clientes, ventas y seguimientos en un solo lugar.",
      },
      {
        q: "¿En qué idioma está GlowSuite CRM?",
        a: "GlowSuite CRM está completamente en español, pensado para consultoras en República Dominicana.",
      },
    ],
  },
  // --- Primeros pasos ---
  {
    category: "Primeros pasos",
    items: [
      {
        q: "¿Cómo me registro en GlowSuite CRM?",
        a: "Ve a glowsuitecrm.com/register, completa el formulario con tu nombre, correo y contraseña, y confirma tu cuenta desde el email que recibirás. El plan gratuito se activa automáticamente.",
      },
      {
        q: "¿Necesito descargar alguna aplicación?",
        a: "No. GlowSuite CRM funciona directamente en tu navegador (Chrome, Safari, Firefox). Puedes usarlo desde tu teléfono, tablet o computadora sin instalar nada.",
      },
      {
        q: "¿Puedo importar mis clientes desde Excel?",
        a: "Por ahora los clientes se registran manualmente dentro del sistema. La importación masiva desde Excel está en el roadmap para versiones futuras.",
      },
    ],
  },
  // --- Sistema 2+2+2 ---
  {
    category: "Sistema 2+2+2",
    items: [
      {
        q: "¿Qué es el sistema 2+2+2?",
        a: "Es un método de seguimiento post-venta: contactar a la clienta a los 2 días (para saber cómo le fue con el producto), a las 2 semanas (para verificar resultados) y a los 2 meses (para una recompra o nueva recomendación). GlowSuite CRM crea estos seguimientos automáticamente cuando registras una venta.",
      },
      {
        q: "¿Cómo sé cuándo tocarle a mis seguimientos?",
        a: "En la sección Seguimientos del sistema verás todos tus recordatorios organizados: vencidos, para hoy y próximos. El sistema calcula las fechas automáticamente a partir de la fecha de venta.",
      },
      {
        q: "¿Puedo desactivar los seguimientos para un cliente?",
        a: "Sí. En el perfil de cada cliente puedes activar o desactivar el ciclo de seguimiento 2+2+2 según lo necesites.",
      },
      {
        q: "¿Puedo ver el mensaje que debo enviarle a mi clienta?",
        a: "Sí. Cuando abres un seguimiento, el sistema genera automáticamente un mensaje personalizado con el nombre de la clienta y el producto comprado, listo para copiar y enviar por WhatsApp.",
      },
    ],
  },
  // --- Clientes y ventas ---
  {
    category: "Clientes y ventas",
    items: [
      {
        q: "¿Cómo registro una venta?",
        a: "Ve a la sección Ventas, selecciona la clienta, agrega los productos con sus cantidades y precio, indica la forma de pago y guarda. El sistema calculará tu ganancia automáticamente y programará los seguimientos.",
      },
      {
        q: "¿Puedo registrar ventas a crédito?",
        a: "Sí (plan Basic o Pro). Puedes registrar el monto inicial pagado y luego agregar abonos parciales. El sistema lleva el historial de pagos y te muestra las cuentas por cobrar en tu dashboard.",
      },
      {
        q: "¿Cómo sé quién me debe dinero?",
        a: "En tu dashboard hay una sección de Cuentas por Cobrar con el listado de ventas pendientes de pago, los montos y las clientas. Disponible en plan Basic y Pro.",
      },
      {
        q: "¿Cómo calcula GlowSuite mi ganancia?",
        a: "El sistema asume que el precio de catálogo es el 100% y que tú, como consultora, pagas el 50% a la empresa de venta directa. Tu ganancia neta es el otro 50% sobre los productos vendidos.",
      },
    ],
  },
  // --- Planes y precios ---
  {
    category: "Planes y precios",
    items: [
      {
        q: "¿Cuánto cuesta GlowSuite CRM?",
        a: "El plan Free es completamente gratis e incluye gestión de clientes, ventas y seguimientos 2+2+2. El plan Basic cuesta $9 USD/mes e incluye crédito y cobros. El plan Pro cuesta $19 USD/mes e incluye métricas avanzadas, WhatsApp y más funciones.",
      },
      {
        q: "¿Qué incluye el plan gratuito?",
        a: "El plan Free incluye: registro ilimitado de clientes, registro de ventas, seguimientos automáticos 2+2+2, dashboard con resumen de tu negocio y metas mensuales.",
      },
      {
        q: "¿Cómo subo de plan?",
        a: "Durante el piloto, el cambio de plan se gestiona directamente con el equipo de GlowSuite. Próximamente habrá una pasarela de pago para que puedas suscribirte directamente desde tu perfil.",
      },
      {
        q: "¿Puedo cancelar en cualquier momento?",
        a: "Sí. No hay contratos ni permanencia mínima. Puedes bajar o cambiar tu plan cuando quieras.",
      },
    ],
  },
  // --- Cuenta y seguridad ---
  {
    category: "Cuenta y seguridad",
    items: [
      {
        q: "¿Olvidé mi contraseña, qué hago?",
        a: "En la pantalla de inicio de sesión haz clic en '¿Olvidaste tu contraseña?' e ingresa tu correo. Recibirás un email con un enlace para crear una nueva contraseña.",
      },
      {
        q: "¿Mis datos están seguros?",
        a: "Sí. GlowSuite CRM usa Supabase para almacenar tus datos con cifrado en reposo y en tránsito. Tu información es privada y nunca es compartida con empresas de venta directa ni terceros.",
      },
      {
        q: "¿Puedo usar GlowSuite en varios dispositivos?",
        a: "Sí. Al ser una aplicación web, puedes acceder desde cualquier dispositivo con internet y tu sesión se mantiene activa.",
      },
    ],
  },
]

// Build flat FAQ list for JSON-LD
const allFaqs = faqs.flatMap((cat) => cat.items)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
}

export default function AyudaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="border-b border-gray-100 px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <a href="/">
              <img src="/logos/glowsuite-crm-horizontal.svg" alt="GlowSuite CRM" height={36} style={{ height: 36, width: "auto" }} />
            </a>
            <a href="/" className="text-sm text-gray-500 hover:text-[#E75480] transition-colors">← Inicio</a>
          </div>
        </nav>

        {/* Header */}
        <section className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#1A1A2E] mb-4">
              Centro de ayuda
            </h1>
            <p className="text-lg text-gray-600">
              Resuelve tus dudas sobre GlowSuite CRM. Si no encuentras lo que
              buscas, escríbenos a{" "}
              <a
                href="mailto:hola@glowsuitecrm.com"
                className="text-[#E75480] font-medium hover:underline"
              >
                hola@glowsuitecrm.com
              </a>
            </p>
          </div>
        </section>

        {/* FAQ sections */}
        <section className="max-w-3xl mx-auto px-4 py-16 space-y-14">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-semibold text-[#E75480] mb-6 pb-2 border-b border-pink-100">
                {section.category}
              </h2>
              <div className="space-y-6">
                {section.items.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="font-semibold text-[#1A1A2E] mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Contact CTA */}
        <section className="bg-pink-50 border-t border-pink-100 py-12 px-4 text-center">
          <h2 className="text-xl font-semibold text-[#1A1A2E] mb-2">
            ¿Tienes otra pregunta?
          </h2>
          <p className="text-gray-600 mb-4">
            Nuestro equipo responde por correo en menos de 24 horas.
          </p>
          <a
            href="mailto:hola@glowsuitecrm.com"
            className="inline-block bg-[#E75480] text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            Escribirnos
          </a>
        </section>
      </main>
    </>
  )
}
