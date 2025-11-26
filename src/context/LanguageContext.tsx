import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'es';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.booking': 'Book Now',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Home Page
    'home.hero.title': 'Discover Your Beauty at MENTHA SALÓN',
    'home.hero.subtitle': 'Premium beauty services with personalized care in a luxurious environment',
    'home.hero.cta': 'Book Your Appointment',
    'home.featured.title': 'Featured Services',
    'home.featured.subtitle': 'Discover our most popular treatments designed to enhance your natural beauty',
    'home.testimonials.title': 'What Our Clients Say',
    'home.testimonials.subtitle': 'Real experiences from our valued clients',
    'home.stats.clients': 'Happy Clients',
    'home.stats.experience': 'Years of Experience',
    'home.stats.services': 'Services Completed',
    'home.stats.rating': 'Average Rating',
    'home.cta.title': 'Ready to Transform Your Look?',
    'home.cta.subtitle': 'Book your appointment today and experience the MENTHA difference',
    'home.cta.book': 'Book Appointment',
    'home.cta.contact': 'Contact Us',
    'home.viewAll': 'View All Services',

    // Service Names
    'services.facial': 'Facial Cleansing',
    'services.lashesClassic': 'Classic Lashes',
    'services.lashesRimel': 'Mascara Effect',
    'services.lashesMascara': 'Mascara Effect Plus',
    'services.lashesRussian': 'Russian Volume',
    'services.eyebrowsTint': 'Eyebrow Design with Tint',
    'services.lashLift': 'Lash Lift',
    'services.lashLiftTint': 'Lash Lift with Tint',
    'services.nailsAcrylic': 'Acrylic Nails',
    'services.nailsSoftGel': 'Soft Gel Nails',
    'services.nailsPolygel': 'Polygel Nails',
    'services.haircut': 'Hair Cutting',
    'services.coloring': 'Hair Coloring',
    'services.highlights': 'Highlights',
    'services.balayage': 'Balayage',
    'services.extensions': 'Hair Extensions',
    'services.blowout': 'Blowouts',
    'services.keratin': 'Keratin Treatments',
    'services.waxing': 'Hair Removal',
    'services.eyebrows': 'Eyebrow Threading',
    'services.lashes': 'Eyelash Extensions',
    'services.makeup': 'Makeup Application',

    // Service Descriptions (Short)
    'service.facial.desc': 'Deep renewal for healthy, radiant skin',
    'service.lashesClassic.desc': 'One extension per natural lash for elegant definition',
    'service.lashesRimel.desc': 'Thick, bold lashes like wearing mascara daily',
    'service.lashesMascara.desc': 'High density and dramatic volume',
    'service.lashesRussian.desc': 'Maximum glamour with ultra-fine fans',
    'service.eyebrowsTint.desc': 'Perfect shape with long-lasting color',
    'service.lashLift.desc': 'Natural curl that opens your eyes',
    'service.lashLiftTint.desc': 'Lift and color for maximum impact',
    'service.nailsAcrylic.desc': 'Long, strong, perfect nails',
    'service.nailsSoftGel.desc': 'Natural, flexible, lightweight nails',
    'service.nailsPolygel.desc': 'The perfect fusion of gel and acrylic',
    'service.haircut.desc': 'Professional haircut with wash, cut, and style consultation',
    'service.coloring.desc': 'Full hair coloring service with premium products',
    'service.highlights.desc': 'Professional highlights to brighten your natural color',
    'service.balayage.desc': 'Natural-looking highlights with seamless color blending',
    'service.extensions.desc': 'Premium hair extensions for length and volume',
    'service.blowout.desc': 'Professional blowout styling for any occasion',
    'service.keratin.desc': 'Smoothing keratin treatment for frizz-free hair',
    'service.waxing.desc': 'Professional waxing services for smooth skin',
    'service.eyebrows.desc': 'Precise eyebrow threading for perfect shape',
    'service.lashes.desc': 'Premium eyelash extensions for stunning eyes',
    'service.makeup.desc': 'Professional makeup application for special events',

    // Service Descriptions (Full)
    'service.facial.full': 'At Mentha Salon we understand that your facial skin deserves deep and specialized care. Our facial cleansing service is designed to renew, oxygenate and revitalize your skin, eliminating impurities, dead cells and excess oil that accumulate over time. Through a professional protocol, we combine hygiene, exfoliation, gentle extraction and application of specific masks according to your skin type.',
    
    'service.lashesClassic.full': 'The most natural and delicate technique. One extension is applied to each natural lash, achieving a subtle finish that enhances the look without exaggerating. Ideal for those looking for an elegant and discreet look.',
    
    'service.lashesRimel.full': 'Designed for those who love the intense finish of mascara. Thicker and more defined extensions are applied, giving depth and strength to the look, as if you always had mascara on.',
    
    'service.lashesMascara.full': 'A more pronounced look than the mascara effect, with lashes of greater density and volume throughout the eye line. Creates a more dramatic and striking result, perfect for those who want a look always ready to impact.',
    
    'service.lashesRussian.full': 'The most glamorous technique. It consists of placing fans of 2 to 6 ultra-fine lashes on each natural lash, achieving an effect of maximum volume, density and softness without overloading the look. Ideal for those seeking a more sophisticated and theatrical finish.',
    
    'service.eyebrowsTint.full': 'At Mentha Salon we understand that eyebrows are the natural frame of your face. Our profiling service with tint combines eyebrow waxing and design with the application of a specialized tint that enhances their shape and color. With professional techniques and high quality products, we achieve defined, symmetrical and naturally finished eyebrows.',
    
    'service.lashLift.full': 'At Mentha Salon we enhance your natural beauty with our lash lift service, a treatment that lifts and curves your lashes from the root, achieving a visual effect of greater length and volume without the need for extensions. This procedure is ideal for those looking for a more open, fresh and luminous look naturally.',
    
    'service.lashLiftTint.full': 'At Mentha Salon we take your look to the next level with our lash lift with tint service, which combines the natural lifting and curvature effect of the lift with the intensity of a specialized tint. This treatment not only enhances the shape of your lashes, but also gives them color, definition and an effect similar to that of mascara.',
    
    'service.nailsAcrylic.full': 'Acrylic nails are ideal for those looking to lengthen, shape and maintain a flawless finish for longer. At Mentha Salon we work with high quality materials that ensure durability, acrylic and Mia Secret monomer, elegance and a totally personalized style according to your taste. The service comes with 2-color enamel and 2 designs or French. Bluesky enamels. Length up to number 3.',
    
    'service.nailsSoftGel.full': 'Soft gel nails are the most innovative alternative to achieve strong, flexible nails with a completely natural finish. Its application is fast, comfortable and without mistreatment of the natural nail. In addition, they allow you to wear styles from the most elegant and discreet to modern and creative designs. The service comes with permanent enamel in 2 colors and 2 designs or French. Bluesky Enamels.',
    
    'service.nailsPolygel.full': 'Polygel combines the best of acrylic and gel nails: it is light, flexible and resistant at the same time. Its application allows sculpting naturally-looking nails, with great durability and without the strong smell characteristic of acrylic. The service includes permanent enamel in 2 colors and 2 designs or French. Bluesky enamels.',

    // Service Categories
    'services.category.all': 'All Services',
    'services.category.hair': 'Hair Services',
    'services.category.facial': 'Facial Treatments',
    'services.category.beauty': 'Beauty Services',
    'services.category.lashes': 'Lashes & Eyebrows',
    'services.category.nails': 'Nail Services',

    // Testimonials
    'testimonial.1.text': 'Amazing experience! The staff is so professional and the results exceeded my expectations.',
    'testimonial.1.service': 'Balayage & Cut',
    'testimonial.2.text': 'I love coming here! They always make me feel beautiful and pampered. Highly recommended!',
    'testimonial.2.service': 'Facial Treatment',
    'testimonial.3.text': 'The best salon in town! Quality services and such a relaxing atmosphere.',
    'testimonial.3.service': 'Full Service',

    // Services Page
    'services.title': 'Our Services',
    'services.subtitle': 'Transform your look with our comprehensive range of professional beauty services',
    'services.popular': 'Popular',
    'services.cta.title': "Can't Decide? Let Us Help!",
    'services.cta.subtitle': 'Book a consultation with our beauty experts to find the perfect services for you',
    'services.cta.button': 'Schedule Consultation',

    // Common
    'common.book': 'Book Now',
    'common.learnMore': 'Learn More',
    'common.price': 'Price',
    'common.duration': 'Duration',
    'common.contact': 'Contact Us',
    'common.required': '*',
    'common.at': 'at',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.booking': 'Reservar',
    'nav.gallery': 'Galería',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.dashboard': 'Panel',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',

    // Home Page
    'home.hero.title': 'Descubre Tu Belleza en MENTHA SALÓN',
    'home.hero.subtitle': 'Servicios de belleza premium con cuidado personalizado en un ambiente de lujo',
    'home.hero.cta': 'Reserva Tu Cita',
    'home.featured.title': 'Servicios Destacados',
    'home.featured.subtitle': 'Descubre nuestros tratamientos más populares diseñados para realzar tu belleza natural',
    'home.testimonials.title': 'Lo Que Dicen Nuestros Clientes',
    'home.testimonials.subtitle': 'Experiencias reales de nuestros valiosos clientes',
    'home.stats.clients': 'Clientes Felices',
    'home.stats.experience': 'Años de Experiencia',
    'home.stats.services': 'Servicios Completados',
    'home.stats.rating': 'Calificación Promedio',
    'home.cta.title': '¿Lista para Transformar Tu Look?',
    'home.cta.subtitle': 'Reserva tu cita hoy y experimenta la diferencia MENTHA',
    'home.cta.book': 'Reservar Cita',
    'home.cta.contact': 'Contáctanos',
    'home.viewAll': 'Ver Todos los Servicios',

    // Service Names
    'services.facial': 'Limpieza Facial',
    'services.lashesClassic': 'Pestañas Clásicas',
    'services.lashesRimel': 'Efecto Rímel',
    'services.lashesMascara': 'Efecto Máscara',
    'services.lashesRussian': 'Volumen Ruso',
    'services.eyebrowsTint': 'Perfilado de Cejas con Tinte',
    'services.lashLift': 'Lifting de Pestañas',
    'services.lashLiftTint': 'Lifting de Pestañas con Tinte',
    'services.nailsAcrylic': 'Uñas Acrílicas',
    'services.nailsSoftGel': 'Uñas Soft Gel',
    'services.nailsPolygel': 'Uñas Polygel',
    'services.haircut': 'Corte de Cabello',
    'services.coloring': 'Coloración',
    'services.highlights': 'Mechas',
    'services.balayage': 'Balayage',
    'services.extensions': 'Extensiones',
    'services.blowout': 'Brushing',
    'services.keratin': 'Tratamiento de Keratina',
    'services.waxing': 'Depilación',
    'services.eyebrows': 'Diseño de Cejas',
    'services.lashes': 'Extensiones de Pestañas',
    'services.makeup': 'Maquillaje Profesional',

    // Service Descriptions (Short)
    'service.facial.desc': 'Renovación profunda para una piel sana y radiante',
    'service.lashesClassic.desc': 'Una extensión por pestaña natural para una definición elegante',
    'service.lashesRimel.desc': 'Pestañas gruesas y definidas como llevar rímel a diario',
    'service.lashesMascara.desc': 'Mayor densidad y volumen dramático',
    'service.lashesRussian.desc': 'Máximo glamour con abanicos ultrafinos',
    'service.eyebrowsTint.desc': 'Forma perfecta con color de larga duración',
    'service.lashLift.desc': 'Curvatura natural que abre tu mirada',
    'service.lashLiftTint.desc': 'Lifting y color para máximo impacto',
    'service.nailsAcrylic.desc': 'Uñas largas, fuertes y perfectas',
    'service.nailsSoftGel.desc': 'Uñas naturales, flexibles y livianas',
    'service.nailsPolygel.desc': 'La fusión perfecta entre gel y acrílico',
    'service.haircut.desc': 'Corte profesional con lavado, corte y consulta de estilo',
    'service.coloring.desc': 'Servicio completo de coloración con productos premium',
    'service.highlights.desc': 'Mechas profesionales para iluminar tu color natural',
    'service.balayage.desc': 'Mechas de aspecto natural con mezcla de color impecable',
    'service.extensions.desc': 'Extensiones de cabello premium para largo y volumen',
    'service.blowout.desc': 'Peinado profesional para cualquier ocasión',
    'service.keratin.desc': 'Tratamiento de keratina alisadora para cabello sin frizz',
    'service.waxing.desc': 'Servicios profesionales de depilación para piel suave',
    'service.eyebrows.desc': 'Diseño preciso de cejas con hilo para forma perfecta',
    'service.lashes.desc': 'Extensiones de pestañas premium para ojos impactantes',
    'service.makeup.desc': 'Aplicación de maquillaje profesional para eventos especiales',

    // Service Descriptions (Full)
    'service.facial.full': 'En Mentha Salón entendemos que la piel de tu rostro merece un cuidado profundo y especializado. Nuestro servicio de limpieza facial está diseñado para renovar, oxigenar y revitalizar tu piel, eliminando impurezas, células muertas y exceso de grasa que se acumulan con el tiempo. A través de un protocolo profesional, combinamos técnicas de higiene, exfoliación, extracción suave y aplicación de mascarillas específicas según tu tipo de piel. Finalizamos con productos nutritivos e hidratantes que devuelven frescura, luminosidad y suavidad al rostro. Más que un tratamiento estético, es un momento de autocuidado y bienestar, que ayuda a prevenir imperfecciones, estimular la regeneración celular y mantener una piel sana, equilibrada y radiante.',
    
    'service.lashesClassic.full': 'La técnica más natural y delicada. Se aplica una extensión sobre cada pestaña natural, logrando un acabado sutil que realza la mirada sin exagerar. ✨ Ideal para quienes buscan un look elegante y discreto.',
    
    'service.lashesRimel.full': 'Diseñadas para quienes aman el acabado intenso de la máscara de pestañas. Se logra aplicando extensiones más gruesas y definidas, que dan profundidad y fuerza a la mirada, como si siempre llevaras rímel puesto.',
    
    'service.lashesMascara.full': 'Un look más marcado que el efecto rímel, con pestañas de mayor densidad y volumen en toda la línea del ojo. Crea un resultado más dramático y llamativo, perfecto para quienes quieren una mirada siempre lista para impactar.',
    
    'service.lashesRussian.full': 'La técnica más glamorosa. Consiste en colocar abanicos de 2 a 6 pestañas ultrafinas sobre cada pestaña natural, logrando un efecto de máximo volumen, densidad y suavidad sin sobrecargar la mirada. Ideal para quienes buscan un acabado más sofisticado y teatral.',
    
    'service.eyebrowsTint.full': 'En Mentha Salón entendemos que las cejas son el marco natural de tu rostro. Nuestro servicio de perfilado con tinte combina la depilación y diseño de cejas con la aplicación de un tinte especializado que realza su forma y color. Con técnicas profesionales y productos de alta calidad, logramos unas cejas definidas, simétricas y de acabado natural, que resaltan tu mirada y armonizan con tus facciones. Este tratamiento es ideal para quienes desean unas cejas más expresivas, estilizadas y con carácter, manteniendo siempre un acabado elegante y moderno.',
    
    'service.lashLift.full': 'En Mentha Salón realzamos tu belleza natural con nuestro servicio de lifting de pestañas, un tratamiento que eleva y curva tus pestañas desde la raíz, logrando un efecto visual de mayor longitud y volumen sin necesidad de extensiones. Este procedimiento es ideal para quienes buscan una mirada más abierta, fresca y luminosa de manera natural. Utilizamos productos de alta calidad que nutren y fortalecen tus pestañas durante el proceso, dejándolas más saludables y definidas.',
    
    'service.lashLiftTint.full': 'En Mentha Salón llevamos tu mirada al siguiente nivel con nuestro servicio de lifting de pestañas con tinte, que combina el efecto de elevación y curvatura natural del lifting con la intensidad de un tinte especializado. Este tratamiento no solo realza la forma de tus pestañas, sino que también les da color, definición y un efecto similar al de la máscara, logrando una mirada más profunda y expresiva sin necesidad de maquillaje.',
    
    'service.nailsAcrylic.full': 'Las uñas acrílicas son ideales para quienes buscan alargar, dar forma y mantener un acabado impecable por más tiempo. En Mentha Salon trabajamos con materiales de alta calidad que aseguran durabilidad, acrílico y monómero Mia Secret, elegancia y un estilo totalmente personalizado según tu gusto: natural, clásico o con diseños creativos. El servicio viene con esmaltado en 2 colores y 2 diseños o francesa. Esmaltes Bluesky. Largo hasta número 3.',
    
    'service.nailsSoftGel.full': 'Las uñas soft gel son la alternativa más innovadora para lograr uñas fuertes, flexibles y con un acabado completamente natural. Su aplicación es rápida, cómoda y sin maltrato a la uña natural. Además, permiten lucir estilos desde lo más elegante y discreto hasta diseños modernos y creativos, con una duración prolongada y sin perder ligereza. El servicio viene con esmaltado permanente en 2 colores y 2 diseños o francesa. Esmaltes Bluesky.',
    
    'service.nailsPolygel.full': 'El polygel combina lo mejor de las uñas acrílicas y las de gel: es ligero, flexible y resistente a la vez. Su aplicación permite esculpir uñas de aspecto natural, con gran durabilidad y sin el olor fuerte característico del acrílico. Además, es ideal para adaptarse a cualquier estilo, desde lo más elegante y natural hasta diseños artísticos y modernos. El servicio incluye esmaltado permanente en 2 colores y 2 diseños o francesa. Esmaltes Bluesky.',

    // Service Categories
    'services.category.all': 'Todos los Servicios',
    'services.category.hair': 'Servicios de Cabello',
    'services.category.facial': 'Tratamientos Faciales',
    'services.category.beauty': 'Servicios de Belleza',
    'services.category.lashes': 'Pestañas y Cejas',
    'services.category.nails': 'Servicios de Uñas',

    // Testimonials
    'testimonial.1.text': '¡Experiencia increíble! El personal es muy profesional y los resultados superaron mis expectativas.',
    'testimonial.1.service': 'Balayage y Corte',
    'testimonial.2.text': '¡Me encanta venir aquí! Siempre me hacen sentir hermosa y mimada. ¡Muy recomendado!',
    'testimonial.2.service': 'Tratamiento Facial',
    'testimonial.3.text': '¡El mejor salón de la ciudad! Servicios de calidad y un ambiente tan relajante.',
    'testimonial.3.service': 'Servicio Completo',

    // Services Page
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Transforma tu look con nuestra amplia gama de servicios profesionales de belleza',
    'services.popular': 'Popular',
    'services.cta.title': '¿No puedes decidir? ¡Déjanos ayudarte!',
    'services.cta.subtitle': 'Reserva una consulta con nuestros expertos en belleza para encontrar los servicios perfectos para ti',
    'services.cta.button': 'Programar Consulta',

    // Booking Page
    'booking.step1.title': 'Selecciona Tu Servicio',
    'booking.step2.title': 'Elige Fecha y Hora',
    'booking.step3.title': 'Tu Información',
    'booking.step4.title': 'Confirma y Paga',
    'booking.step1.short': 'Seleccionar Servicio',
    'booking.step2.short': 'Fecha y Hora',
    'booking.step3.short': 'Tu Info',
    'booking.step4.short': 'Confirmar y Pagar',
    'booking.selectDate': 'Seleccionar Fecha',
    'booking.selectTime': 'Seleccionar Hora',
    'booking.preferredSpecialist': 'Especialista Preferido',
    'booking.fullName': 'Nombre Completo',
    'booking.email': 'Correo Electrónico',
    'booking.phone': 'Número de Teléfono',
    'booking.specialNotes': 'Notas Especiales (Opcional)',
    'booking.notesPlaceholder': 'Cualquier solicitud o nota especial...',
    'booking.namePlaceholder': 'Ingresa tu nombre completo',
    'booking.emailPlaceholder': 'Ingresa tu correo',
    'booking.phonePlaceholder': 'Ingresa tu teléfono',
    'booking.summary': 'Resumen de Reserva',
    'booking.service': 'Servicio:',
    'booking.dateTime': 'Fecha y Hora:',
    'booking.specialist': 'Especialista:',
    'booking.duration': 'Duración:',
    'booking.minutes': 'minutos',
    'booking.total': 'Total:',
    'booking.payment': 'Información de Pago',
    'booking.cardNumber': 'Número de Tarjeta',
    'booking.expiryDate': 'Fecha de Vencimiento',
    'booking.cvc': 'CVC',
    'booking.cancellation': 'Política de Cancelación:',
    'booking.cancellationText': 'Puedes cancelar o reprogramar tu cita hasta 24 horas antes de la hora programada sin penalización.',
    'booking.previous': 'Anterior',
    'booking.next': 'Siguiente Paso',
    'booking.confirm': 'Confirmar Reserva',
    'booking.confirmAlert': '¡Reserva confirmada! Recibirás un correo de confirmación en breve.',
    'booking.staff.specialty.hair': 'Especialista en Cabello',
    'booking.staff.specialty.facial': 'Experto en Faciales',
    'booking.staff.specialty.beauty': 'Especialista en Belleza',
    'booking.staff.specialty.any': 'Mejor Opción',
    'booking.staff.anyAvailable': 'Cualquiera Disponible',

    // About Page
    'about.title': 'Acerca de MENTHA SALÓN',
    'about.subtitle': 'Durante más de una década, nos hemos dedicado a realzar la belleza natural a través de un servicio excepcional, técnicas expertas y un compromiso de hacer que cada cliente se sienta seguro y hermoso.',
    'about.story.title': 'Nuestra Historia',
    'about.story.p1': 'MENTHA SALÓN nació de una pasión por la belleza y una visión de crear un santuario donde los clientes pudieran escapar, relajarse y emerger sintiéndose más seguros que nunca.',
    'about.story.p2': 'Nuestro nombre "MENTHA" representa frescura, renovación y belleza natural, valores que están en el corazón de todo lo que hacemos.',
    'about.story.p3': 'Hoy, continuamos evolucionando mientras nos mantenemos fieles a nuestra misión principal: proporcionar servicios de belleza excepcionales en un ambiente donde el lujo se encuentra con la comodidad.',
    'about.stats.experience': 'Años de Excelencia',
    'about.stats.clients': 'Clientes Felices',
    'about.stats.services': 'Servicios Completados',
    'about.stats.rating': 'Calificación Promedio',
    'about.values.title': 'Nuestros Valores',
    'about.values.subtitle': 'Los principios que guían todo lo que hacemos en MENTHA SALÓN',
    'about.values.clientCare': 'Cuidado Centrado en el Cliente',
    'about.values.clientCareDesc': 'Cada servicio está personalizado para cumplir con tus objetivos únicos de belleza y estilo de vida.',
    'about.values.excellence': 'Excelencia en el Servicio',
    'about.values.excellenceDesc': 'Mantenemos los más altos estándares en técnica, productos y experiencia del cliente.',
    'about.values.expertTeam': 'Equipo Experto',
    'about.values.expertTeamDesc': 'Nuestros profesionales calificados se mantienen al día con las últimas tendencias y técnicas.',
    'about.values.luxury': 'Experiencia de Lujo',
    'about.values.luxuryDesc': 'Desde el ambiente hasta las comodidades, cada detalle está diseñado para tu confort y relajación.',
    'about.team.title': 'Conoce Nuestro Equipo Experto',
    'about.team.subtitle': 'Profesionales apasionados dedicados a resaltar tu belleza natural',
    'about.team.founder': 'Fundadora y Estilista Senior',
    'about.team.facialSpecialist': 'Especialista en Faciales',
    'about.team.hairStylist': 'Estilista de Cabello',
    'about.team.lashTechnician': 'Técnica de Pestañas',
    'about.cta.title': '¿Lista para Experimentar la Diferencia MENTHA?',
    'about.cta.subtitle': 'Únete a miles de clientes satisfechos y descubre por qué somos el salón de belleza más confiable',
    'about.cta.book': 'Reservar Cita',
    'about.cta.gallery': 'Ver Nuestra Galería',

    // Contact Page
    'contact.title': 'Contáctanos',
    'contact.subtitle': '¿Tienes preguntas? Nos encantaría saber de ti',
    'contact.form.title': 'Envíanos un Mensaje',
    'contact.form.name': 'Tu Nombre',
    'contact.form.namePlaceholder': 'Ingresa tu nombre',
    'contact.form.email': 'Tu Correo',
    'contact.form.emailPlaceholder': 'tu@correo.com',
    'contact.form.phone': 'Tu Teléfono',
    'contact.form.phonePlaceholder': '(555) 123-4567',
    'contact.form.subject': 'Asunto',
    'contact.form.subjectPlaceholder': '¿En qué podemos ayudarte?',
    'contact.form.message': 'Mensaje',
    'contact.form.messagePlaceholder': 'Cuéntanos más sobre tu consulta...',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.form.success': '¡Mensaje enviado! Te responderemos pronto.',
    'contact.info.title': 'Información de Contacto',
    'contact.info.address': 'Dirección',
    'contact.info.phone': 'Teléfono',
    'contact.info.email': 'Correo',
    'contact.info.hours': 'Horario de Atención',
    'contact.info.hoursWeekday': 'Lun - Vie: 9AM - 8PM',
    'contact.info.hoursSaturday': 'Sábado: 9AM - 6PM',
    'contact.info.hoursSunday': 'Domingo: 10AM - 5PM',
    'contact.faq.title': 'Preguntas Frecuentes',
    'contact.faq.q1': '¿Necesito una cita?',
    'contact.faq.a1': 'Sí, trabajamos con sistema de citas para garantizar que recibas nuestra atención completa.',
    'contact.faq.q2': '¿Cuál es su política de cancelación?',
    'contact.faq.a2': 'Puedes cancelar o reprogramar hasta 24 horas antes sin cargo.',
    'contact.faq.q3': '¿Qué métodos de pago aceptan?',
    'contact.faq.a3': 'Aceptamos efectivo, tarjetas de crédito/débito y transferencias.',
    'contact.faq.q4': '¿Ofrecen paquetes o membresías?',
    'contact.faq.a4': 'Sí, tenemos varios paquetes y programas de lealtad disponibles.',

    // Gallery Page
    'gallery.title': 'Galería de Nuestro Trabajo',
    'gallery.subtitle': 'Explora nuestras impresionantes transformaciones e inspírate para tu próximo viaje de belleza',
    'gallery.searchPlaceholder': 'Buscar por estilo, servicio o etiqueta...',
    'gallery.filter': 'Filtrar',
    'gallery.categories': 'Categorías',
    'gallery.allWork': 'Todos los Trabajos',
    'gallery.hairCuts': 'Cortes de Cabello',
    'gallery.hairColor': 'Color de Cabello',
    'gallery.viewDetails': 'Ver Detalles',
    'gallery.noResults': 'No se encontraron resultados',
    'gallery.noResultsDesc': 'Intenta ajustar tu búsqueda o criterios de filtro para encontrar lo que buscas.',
    'gallery.cta.title': '¿Lista para Tu Transformación?',
    'gallery.cta.subtitle': 'Reserva tu cita hoy y deja que nuestros expertos creen tu look perfecto',
    'gallery.cta.book': 'Reservar Ahora',
    'gallery.cta.instagram': 'Síguenos en Instagram',

    // Staff Dashboard
    'staff.welcome': 'Bienvenido de nuevo',
    'staff.overview': 'Aquí está tu resumen diario.',
    'staff.tabs.overview': 'Resumen',
    'staff.tabs.schedule': 'Horario',
    'staff.tabs.clients': 'Clientes',
    'staff.tabs.performance': 'Rendimiento',
    'staff.stats.todayAppointments': 'Citas de Hoy',
    'staff.stats.todayRevenue': 'Ingresos de Hoy',
    'staff.stats.weeklyRevenue': 'Ingresos Semanales',
    'staff.stats.averageRating': 'Calificación Promedio',
    'staff.todaySchedule': 'Horario de Hoy',
    'staff.status.confirmed': 'confirmada',
    'staff.status.inProgress': 'en-progreso',
    'staff.status.upcoming': 'próxima',
    'staff.schedule.title': 'Horario Semanal',
    'staff.schedule.blockTime': 'Bloquear Tiempo',
    'staff.schedule.addAppointment': 'Agregar Cita',
    'staff.schedule.appointments': 'citas',
    'staff.schedule.calendarNote': 'La vista detallada del calendario se implementaría aquí',
    'staff.clients.title': 'Gestión de Clientes',
    'staff.clients.addNew': 'Agregar Nuevo Cliente',
    'staff.clients.recent': 'Clientes Recientes',
    'staff.clients.search': 'Buscar clientes...',
    'staff.clients.name': 'Nombre',
    'staff.clients.lastVisit': 'Última Visita',
    'staff.clients.totalSpent': 'Total Gastado',
    'staff.clients.visits': 'Visitas',
    'staff.clients.rating': 'Calificación',
    'staff.clients.actions': 'Acciones',
    'staff.clients.viewDetails': 'Ver Detalles',
    'staff.performance.title': 'Análisis de Rendimiento',
    'staff.performance.monthly': 'Rendimiento Mensual',
    'staff.performance.revenue': 'Ingresos',
    'staff.performance.appointments': 'Citas',
    'staff.performance.clientRetention': 'Retención de Clientes',
    'staff.performance.popularServices': 'Servicios Populares',
    'staff.performance.monthlyGoals': 'Metas Mensuales',
    'staff.performance.revenueGoal': 'Meta de Ingresos',
    'staff.performance.appointmentsGoal': 'Meta de Citas',
    'staff.performance.ratingGoal': 'Meta de Calificación',
    'staff.days.monday': 'Lunes',
    'staff.days.tuesday': 'Martes',
    'staff.days.wednesday': 'Miércoles',
    'staff.days.thursday': 'Jueves',
    'staff.days.friday': 'Viernes',
    'staff.days.saturday': 'Sábado',
    'staff.days.sunday': 'Domingo',

    // Admin Dashboard
    'admin.title': 'Panel de Administración',
    'admin.subtitle': 'Gestiona todas las citas del salón',
    'admin.stats.total': 'Total Citas',
    'admin.stats.pending': 'Pendientes',
    'admin.stats.confirmed': 'Confirmadas',
    'admin.stats.completed': 'Completadas',
    'admin.filter.all': 'Todas',
    'admin.filter.pending': 'Pendiente',
    'admin.filter.confirmed': 'Confirmada',
    'admin.filter.completed': 'Completada',
    'admin.filter.canceled': 'Cancelada',
    'admin.noAppointments': 'No hay citas en esta categoría',
    'admin.client': 'Cliente',
    'admin.notes': 'Notas',
    'admin.actions.confirm': 'Confirmar',
    'admin.actions.complete': 'Completar',
    'admin.actions.cancel': 'Cancelar',
    'admin.actions.delete': 'Eliminar',
    'admin.deleteConfirm': '¿Estás seguro de eliminar esta cita?',
    'admin.status.pending': 'Pendiente',
    'admin.status.confirmed': 'Confirmada',
    'admin.status.completed': 'Completada',
    'admin.status.canceled': 'Cancelada',

    // Booking Page (New)
    'booking.new.title': 'Reserva tu Cita',
    'booking.new.subtitle': 'Selecciona tu servicio y hora preferida',
    'booking.new.success': '¡Cita reservada exitosamente! Te contactaremos pronto para confirmar.',
    'booking.new.personalInfo': 'Información Personal',
    'booking.new.fullName': 'Nombre Completo',
    'booking.new.fullNamePlaceholder': 'Tu nombre completo',
    'booking.new.phone': 'Teléfono',
    'booking.new.phonePlaceholder': '(555) 123-4567',
    'booking.new.email': 'Correo Electrónico',
    'booking.new.emailPlaceholder': 'tu@correo.com',
    'booking.new.selectService': 'Selecciona un Servicio',
    'booking.new.dateTime': 'Fecha y Hora',
    'booking.new.date': 'Fecha',
    'booking.new.time': 'Hora',
    'booking.new.selectTime': 'Selecciona una hora',
    'booking.new.additionalNotes': 'Notas Adicionales (Opcional)',
    'booking.new.notesPlaceholder': '¿Alguna preferencia o solicitud especial?',
    'booking.new.bookButton': 'Reservar Cita',
    'booking.new.booking': 'Reservando...',
    'booking.new.required': '*',

    // Footer
    'footer.description': 'Experimenta servicios de belleza de lujo con cuidado personalizado en nuestro ambiente de salón moderno. Tu transformación de belleza te espera.',
    'footer.hours': 'Horario',
    'footer.monday': 'Lun - Vie',
    'footer.saturday': 'Sábado',
    'footer.sunday': 'Domingo',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.cancellation': 'Política de Cancelación',

    // Common
    'common.book': 'Reservar',
    'common.learnMore': 'Saber Más',
    'common.price': 'Precio',
    'common.duration': 'Duración',
    'common.contact': 'Contáctanos',
    'common.required': '*',
    'common.at': 'a las',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};