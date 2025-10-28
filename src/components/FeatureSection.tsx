import { ChatBubbleBottomCenterTextIcon, GlobeAltIcon, BoltIcon, ScaleIcon } from '@heroicons/react/24/outline';
import EngineeringImage from '../img/landingPage/EPA-Bienestar-FuentesDeDatos.jpg';

const features = [
  {
    name: 'Prevención ! Tabaquismo',
    descripción:
      'Los cigarrillos, los cigarrillos electrónicos y los productos del tabaco contienen numerosas sustancias químicas tóxicas. Incluido el Vapeo y tabaquismo pasivo. Simplemente evitalo, no fumes!',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
   name: 'Bienestar Emocional | Ansiedad',
    description:
      'En situaciones estresantes, como hablar en público o realizar un exámen es normal sentir ansiedad. Es indicador de una condición subyacente, cuando los sentimientos se vuelven excesivos, en todo momento e interfieren en tu vida cotidiana.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Bienestar físico | Nutrición',
    description:
        'Ludwig Feuerbach afirma "Somos lo que comemos". Promovemos el disfrute con límites, aprendiendo a comer cada vez mejor, en el marco de nuestra sociedad y su cultura.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Bienestar físico | Sueño',
    description:
      'La principal función del sueño es la recuperación fisiológica y psicológica. Está demostrado científicamente que dormir menos de 6 horas por noche afecta tu salud.',
    icon: ScaleIcon,
  },
  {
    name: 'Bienestar físico | Actividad Física',
    description:
      'Es esencial para el mantenimiento y mejora de la salud y la prevención de enfermedades, para todas las personas y a cualquier edad, con beneficios fisiológicos, psicológicos y sociales, que han sido avalados por investigaciones científicas.',
    icon: BoltIcon,
  },
  {
    name: 'Prevención | Hipertensión Arterial',
    description:
      'Es el principal factor de riesgo para el desarrollo de Enfermedad Cardiovascular y Cerebrovascular. Afecta entre 20-40% de la población de Latinoamerica',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Prevención ! Glucemia',
    descripción:
      'Para personas con o sin diabetes Tipo I, Tipo 2 o PreDiabetes. La hemoglobina Glicosilada Hb A1c puede reflejar mejor el control glucémico a largo plazo en personas con diabetes.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Prevención ! Colesterol',
    descripción:
      'El colesterol no HDL puede medirse sin ayuno de antemano (lo que aumenta su disponibilidad en cualquier momento del día y su implementación en el seguimiento) y se calcula de manera confiable entre todas las personas.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
];

export function FeatureSection(): JSX.Element {
  return (
    <div className="relative bg-white py-8 sm:py-12 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex hidden flex-col items-start md:inline">
          <h2 className="text-xl text-red-600">Cuidado de la Salud y Bienestar</h2>
          <p className="mt-6 text-4xl font-semibold text-gray-900">Prevención</p>
          <p className="mt-4 w-full max-w-xs text-lg font-normal text-neutral-600 sm:max-w-none md:max-w-sm lg:max-w-lg lg:text-xl">
	    Un programa para la Salud y el Bienestar con foco en la toma de conciencia de los beneficios de una vida saludable, en un proceso de aprendizaje personalizado e innovador.
          </p>
        </div>
        <div className="mt-8 md:mt-28 lg:mt-44 xl:mt-60">
          <div className="flex flex-col items-center space-y-6 sm:space-y-10 md:items-end">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="w-full max-w-lg rounded-2xl bg-gradient-to-r from-red-50 to-red-50 p-4 md:max-w-md lg:max-w-lg lg:p-8"
              >
                <h5 className="text-lg font-medium text-gray-900 lg:text-2xl">{feature.name}</h5>
                <p className="mt-4 text-base font-normal text-neutral-600 lg:text-lg lg:text-xl">
                  {feature.description}
                </p>
              </div>
            ))}
            <img
              className="z-10 h-72 w-72 rounded-full object-cover sm:h-156 sm:w-156 md:absolute md:-left-[21rem] md:bottom-52 lg:bottom-56 lg:-left-[27rem] lg:h-216 lg:w-216 xl:bottom-10 xl:-left-[36rem] xl:h-264 xl:w-264"
              src={EngineeringImage}
              alt="Engineering"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
