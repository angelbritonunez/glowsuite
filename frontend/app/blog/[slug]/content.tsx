// Article body content for each blog post.
// Each value is JSX rendered inside <article> with Tailwind prose classes.
// Keep headings as h2/h3, use <p> for paragraphs.

import type { ReactNode } from "react"

export const articleContent: Record<string, ReactNode> = {
  /* ─────────────────────────────────────────
   * 1. Cómo organizar tus clientes de Mary Kay
   ───────────────────────────────────────── */
  "como-organizar-clientes-mary-kay": (
    <>
      <h2>El problema del cuaderno</h2>
      <p>
        Cuando empiezas en venta directa —ya sea con Mary Kay, Yanbal, Avon u
        otra empresa— el primer sistema que usas es un cuaderno. O notas en el
        celular. O una hoja de cálculo que se convierte en un laberinto.
        Funciona cuando tienes 10 clientas. Con 50, ya no.
      </p>
      <p>
        Los problemas que aparecen son siempre los mismos: no recuerdas cuándo
        fue la última vez que le vendiste a fulana, no sabes quién te debe, y
        los cumpleaños y preferencias de piel de tus clientas viven en tu
        cabeza y en ningún otro lugar.
      </p>

      <h2>Qué información necesitas tener de cada clienta</h2>
      <p>
        Antes de hablar de herramientas, define qué datos son realmente útiles.
        Para una consultora de venta directa, la ficha mínima de cada clienta
        debe incluir:
      </p>
      <ul>
        <li>Nombre completo y número de teléfono (WhatsApp)</li>
        <li>Tipo de piel o preferencias de producto</li>
        <li>Historial de compras (qué compró y cuándo)</li>
        <li>Estado: ¿es clienta activa, prospecto o dejó de comprar?</li>
        <li>Notas de seguimiento: ¿cómo le fue con el último producto?</li>
      </ul>
      <p>
        Con esa información puedes personalizar cada contacto y no tratar a
        todas tus clientas como si fueran iguales.
      </p>

      <h2>El sistema de clasificación que más funciona</h2>
      <p>
        Divide tu cartera en tres categorías según la actividad de cada
        clienta:
      </p>
      <ul>
        <li>
          <strong>Activa:</strong> compró en los últimos 2 meses. Son tu motor
          de ingresos.
        </li>
        <li>
          <strong>Tibia:</strong> no ha comprado en 2 a 6 meses. Necesita un
          recordatorio o una novedad que la reactive.
        </li>
        <li>
          <strong>Inactiva:</strong> más de 6 meses sin comprar. Antes de
          descartarla, prueba un contacto con una oferta específica.
        </li>
      </ul>
      <p>
        Esta segmentación te ayuda a priorizar a quién llamas primero cuando
        tienes poco tiempo.
      </p>

      <h2>Herramientas: de menos a más organización</h2>
      <h3>1. Hoja de cálculo (punto de partida)</h3>
      <p>
        Si estás empezando, una hoja de Google Sheets con las columnas correctas
        es mejor que ningún sistema. Crea columnas para: nombre, teléfono, tipo
        de piel, última compra, próximo seguimiento y notas. Es gratis y
        funciona.
      </p>
      <h3>2. CRM especializado en venta directa</h3>
      <p>
        Cuando tu cartera supera las 30 clientas, una hoja de cálculo empieza a
        ser un obstáculo. Un CRM como GlowSuite CRM centraliza todo: fichas de
        cliente, historial de ventas, seguimientos automáticos y cuentas por
        cobrar. No necesitas recordar nada porque el sistema te avisa.
      </p>

      <h2>La clave: consistencia</h2>
      <p>
        El mejor sistema es el que usas todos los días. Si anotas cada venta en
        el momento, en seis meses tendrás una base de datos de tu negocio que
        vale mucho más que cualquier cuaderno. La disciplina de registrar cada
        transacción es lo que separa a las consultoras que crecen de las que
        siempre empiezan de cero.
      </p>
    </>
  ),

  /* ─────────────────────────────────────────
   * 2. Sistema 2+2+2
   ───────────────────────────────────────── */
  "sistema-2-2-2-seguimiento-post-venta": (
    <>
      <h2>¿De dónde viene el sistema 2+2+2?</h2>
      <p>
        El sistema 2+2+2 es una metodología de seguimiento post-venta muy
        utilizada en venta directa, especialmente en empresas como Mary Kay.
        La idea es simple: después de que una clienta compra un producto, hay
        tres momentos clave en los que debes contactarla.
      </p>

      <h2>Los tres contactos del 2+2+2</h2>
      <h3>Contacto 1: a los 2 días</h3>
      <p>
        El objetivo es saber cómo le está yendo con el producto que acaba de
        recibir. ¿Lo usó bien? ¿Tuvo alguna reacción? ¿Le gustó la textura?
        Este contacto genera confianza y demuestra que te importa su
        experiencia, no solo la venta.
      </p>
      <p>
        Ejemplo de mensaje: "Hola [nombre], ¿cómo te ha ido con el sérum que
        te llevaste? ¿Ya lo pudiste probar?"
      </p>

      <h3>Contacto 2: a las 2 semanas</h3>
      <p>
        A las dos semanas la clienta ya tiene suficiente experiencia con el
        producto para evaluar resultados. Es el momento ideal para preguntar
        cómo le está yendo, resolver dudas de uso y anticipar lo que podría
        necesitar a continuación.
      </p>
      <p>
        Si el producto funcionó bien, este contacto suele abrir la puerta a
        una segunda compra o a que te refiera con alguien más.
      </p>

      <h3>Contacto 3: a los 2 meses</h3>
      <p>
        Dos meses es el tiempo promedio en que un producto de cuidado de piel
        se agota. Este contacto es para la recompra. Si la clienta tuvo una
        buena experiencia, ya está lista para comprar de nuevo. Si no la has
        contactado, lo más probable es que compre a otra consultora o en una
        tienda.
      </p>

      <h2>Por qué funciona</h2>
      <p>
        El 2+2+2 funciona porque elimina el mayor error de las consultoras:
        desaparecer después de vender. La mayoría de los negocios de venta
        directa fracasan no por falta de clientas, sino por falta de
        seguimiento.
      </p>
      <p>
        Estudios de comportamiento del consumidor muestran que cuesta entre 5
        y 7 veces más conseguir una clienta nueva que retener una existente. El
        2+2+2 es tu sistema de retención.
      </p>

      <h2>Cómo automatizar el 2+2+2</h2>
      <p>
        El mayor problema del sistema es que con muchas clientas es imposible
        recordar manualmente las fechas de cada seguimiento. Por eso existen
        herramientas como GlowSuite CRM, que calculan automáticamente las
        tres fechas en cuanto registras una venta y te avisan cuándo es el
        momento de contactar a cada clienta.
      </p>
      <p>
        Así no dependes de tu memoria ni de alertas en el calendario. El sistema
        trabaja contigo para que ninguna clienta quede sin atender.
      </p>

      <h2>El mensaje importa</h2>
      <p>
        Cada contacto debe sentirse personal, no como un mensaje masivo. Usa el
        nombre de la clienta, menciona el producto específico que compró y
        muestra interés genuino. Un mensaje de 30 segundos bien personalizado
        vale más que un párrafo genérico.
      </p>
    </>
  ),

  /* ─────────────────────────────────────────
   * 3. Cómo llevar las cuentas
   ───────────────────────────────────────── */
  "como-llevar-cuentas-negocio-venta-directa": (
    <>
      <h2>El problema más común: no saber cuánto ganas</h2>
      <p>
        Muchas consultoras de venta directa tienen clientes, hacen ventas y
        trabajan duro, pero al final del mes no saben exactamente cuánto
        ganaron. El dinero entra, sale para comprar más inventario y en algún
        punto se pregunta: ¿en qué quedé?
      </p>
      <p>
        Llevar las cuentas no requiere ser contadora. Requiere claridad sobre
        cuatro números clave.
      </p>

      <h2>Los 4 números que debes conocer cada mes</h2>
      <h3>1. Total de ventas</h3>
      <p>
        Cuánto facturaste: la suma de todas las ventas realizadas en el mes,
        independientemente de si ya te pagaron o no.
      </p>
      <h3>2. Costo de tu inventario</h3>
      <p>
        Cuánto le pagaste a la empresa de venta directa por los productos que
        vendiste. En la mayoría de las empresas de venta directa pagas el 50%
        del precio de catálogo.
      </p>
      <h3>3. Ganancia neta</h3>
      <p>
        Ventas menos costo = ganancia bruta. A eso réstale cualquier gasto
        adicional (transporte, packaging, publicidad) para llegar a tu ganancia
        neta real.
      </p>
      <h3>4. Cuentas por cobrar</h3>
      <p>
        Cuánto te deben. Si vendes a crédito y no llevas este número, estás
        regalando dinero sin saberlo.
      </p>

      <h2>La regla del 50% en venta directa</h2>
      <p>
        En la mayoría de empresas de venta directa como Mary Kay, tu ganancia
        bruta es el 50% del precio de catálogo. Si vendiste $10,000 pesos en
        productos, tu ganancia bruta es $5,000. Ese es tu punto de partida.
      </p>
      <p>
        Donde muchas consultoras se confunden es que mezclan ese dinero con sus
        gastos personales antes de reponer inventario. La regla: cuando cobras
        una venta, separa inmediatamente el 50% para el siguiente pedido.
      </p>

      <h2>La meta mensual: tu brújula financiera</h2>
      <p>
        Define cuánto quieres ganar neto cada mes. Ese número es tu meta. Luego
        calcula cuánto tienes que vender para llegar ahí. Si quieres ganar
        $15,000 pesos netos y tu margen es del 50%, necesitas vender $30,000.
      </p>
      <p>
        Con una meta clara puedes evaluar a mitad de mes si vas por buen camino
        o si necesitas acelerar.
      </p>

      <h2>Herramientas para llevar las cuentas</h2>
      <p>
        Puedes empezar con una libreta y disciplina. Pero si quieres claridad
        real sin complicaciones, un CRM como GlowSuite CRM te permite registrar
        cada venta con el cálculo automático de ganancias, ver tus cuentas por
        cobrar y medir tu progreso contra tu meta mensual. Sin Excel complicado
        y sin fórmulas.
      </p>
    </>
  ),

  /* ─────────────────────────────────────────
   * 4. Cuentas por cobrar
   ───────────────────────────────────────── */
  "como-saber-quien-te-debe-dinero-belleza": (
    <>
      <h2>Las ventas a crédito: necesarias pero peligrosas</h2>
      <p>
        En venta directa, vender a crédito es casi inevitable. Una clienta que
        confía en ti te pide que le fíes, y si le dices que no, se va con otra
        consultora. Así que aceptas. El problema es que si no llevas el control,
        en un mes puedes tener $20,000 pesos en ventas y solo $5,000 cobrados.
      </p>

      <h2>Por qué las consultoras pierden el control de los cobros</h2>
      <p>
        El patrón es siempre el mismo: al principio recuerdas quién te debe,
        porque son pocas personas. Cuando tienes 15 o 20 clientas con deudas
        distintas en fechas distintas, la memoria humana simplemente no da
        abasto. Y la vergüenza de cobrar también juega un papel: muchas
        consultoras evitan el tema hasta que es demasiado tarde.
      </p>

      <h2>Cómo llevar el control de forma simple</h2>
      <h3>Método 1: hoja de registro manual</h3>
      <p>
        Crea una tabla con estas columnas: nombre de la clienta, fecha de la
        venta, monto total, monto pagado, monto pendiente y fecha de próximo
        cobro. Actualízala cada vez que recibes un abono. Es básico pero
        funciona si eres disciplinada.
      </p>
      <h3>Método 2: software de gestión</h3>
      <p>
        Herramientas como GlowSuite CRM permiten registrar el pago inicial al
        momento de la venta, agregar abonos parciales después, y ver en tu
        dashboard un listado actualizado de todo lo que te deben. Sin buscar
        en notas, sin recordar fechas.
      </p>

      <h2>Las reglas de oro para cobrar sin perder clientas</h2>
      <ul>
        <li>
          <strong>Define los términos antes de entregar el producto.</strong>{" "}
          "Te lo llevo hoy y me abonás la mitad el viernes, ¿te parece?" es
          mucho mejor que asumir que te van a pagar.
        </li>
        <li>
          <strong>Registra todo por escrito (o en el sistema).</strong> Aunque
          sea una foto de una nota. Si no está registrado, no existe.
        </li>
        <li>
          <strong>Cobra en el momento acordado, no después.</strong> Cada semana
          que pasa sin cobrar hace más difícil la conversación.
        </li>
        <li>
          <strong>Usa el mensaje correcto.</strong> "Hola [nombre], ya se cumplió
          la fecha de tu abono, ¿cómo estamos?" es amigable y directo. No
          tienes que disculparte por cobrar lo que es tuyo.
        </li>
      </ul>

      <h2>Cuándo dejar de vender a crédito</h2>
      <p>
        Si una clienta tiene más de dos meses en mora y no responde a tus
        mensajes, es momento de pausar las entregas a crédito con ella. No es
        personal: es gestión de tu negocio. Puedes seguir atendiéndola, pero
        solo contra pago inmediato.
      </p>
      <p>
        Saber quién te debe y actuar a tiempo es lo que separa un negocio de
        venta directa que crece de uno que siempre está sin liquidez.
      </p>
    </>
  ),
}
