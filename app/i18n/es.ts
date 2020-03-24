import pluralize from 'pluralize'

const enLocale = {
  localeName: 'Español',

  title: 'Generador de lista de compras de Coronavirus',
  description:
    "¿Qué comprar y cocinar durante el coronavirus? Como sobrevivir la cuarenta? Cuéntanos que tan grande es tu familia, tu dieta, y nosotros generaremos una lista de compras racionalizada.",

  about: {
    collapsed: `<strong>¿Para qué sirve esta App?</strong>`,
    expanded: `
<p>
  <strong>¿Para qué sirve esta App?</strong> Usa el generador
  para planear las compras para la cuarentena del COVID-19. Selecciona la duración de estadía en casa, cantidad de personas, menú, y 
  obtén la lista de productos a comprar.
</p>
<p>
  Usa el "Compartir con familia" para generar una lista de quehaceres y 
  compartirla con tu hogar o enviarla a tu telefono.
</p>
<p>
  <a href="mailto:koss@nocorp.me">Email me</a> Si tienes alguna sugerencia!
</p>
`
  },

  measurement: {
    system: 'Sistema métrico',
    metric: 'Métrico',
    imperial: 'Imperial'
  },

  numberOfDays: 'Cantidad de días',
  numberOfAdults: 'Cantidad de adultos',
  numberOfKids: 'Niños',

  kidsServing: {
    title: 'El tamaño de la porción de niños se calcula como',
    adult: 'adultos'
  },

  sections: {
    essentials: {
      title: 'Esenciales'
    },

    breakfast: {
      title: 'Desayuno'
    },

    meals: {
      title: 'Comidas',
      formula: {
        intro: '2 comidas por día'
      }
    },

    drinks: {
      title: 'Bebidas',
      description:
        'Tres bebidas por día por persona. En desayuno, almuerzo, y cena.'
    },

    preview: {
      title: 'Lista de Compra',
      share: 'Compartir con familia'
    },

    list: {
      title: 'Lista de Compra',
      description:
        'Comparte esta página con tu familia. Cuando marques un producto, la lista se actualiza automáticamente en todos tus dispositivos que tengan abierta esta página.',
      generated: {
        intro: 'La lista de compras se ha generado usando',
        link: 'Generador de lista de compras de Coronavirus'
      },
      addToList: 'Agregar a lista',
      remove: 'Eliminar'
    }
  },

  translate: (str: string) => str,

  pluralize: (str: string, num: number) => pluralize(str, num)
}
export default enLocale
