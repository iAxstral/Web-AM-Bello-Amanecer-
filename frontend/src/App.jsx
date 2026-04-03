import { useState } from "react";
import bannerImage from "./assets/banner.jpeg";
import houseImage from "./assets/foto-1.jpeg";
import caregiversImage from "./assets/foto-2.jpeg";
import activitiesImage from "./assets/foto-3.jpeg";
import residentsImage from "./assets/residentes.jpeg";

const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" }
];

const services = [
  {
    title: "Acompanamiento permanente",
    description:
      "Supervision cercana, apoyo en rutinas diarias y atencion con enfoque humano para que cada adulto mayor se sienta seguro y valorado."
  },
  {
    title: "Alimentacion y bienestar",
    description:
      "Menus balanceados, seguimiento de habitos y apoyo en el cuidado diario para promover salud, energia y tranquilidad."
  },
  {
    title: "Actividades de estimulacion",
    description:
      "Espacios recreativos, ocupacionales y de integracion que fortalecen la memoria, el animo y la vida en comunidad."
  },
  {
    title: "Entorno comodo y protegido",
    description:
      "Instalaciones pensadas para el descanso y la movilidad, con ambientes acogedores para residentes y sus familias."
  }
];

const modalities = [
  {
    title: "Estadia permanente",
    description:
      "Ideal para familias que buscan atencion integral y acompanamiento continuo.",
    image: residentsImage
  },
  {
    title: "Cuidado por temporadas",
    description:
      "Una opcion flexible para recuperacion, viajes familiares o apoyos temporales.",
    image: caregiversImage
  },
  {
    title: "Atencion diurna",
    description:
      "Compania, actividades y seguimiento durante el dia, con regreso al hogar por la noche.",
    image: activitiesImage
  }
];

const highlights = [
  "Atencion calida y respetuosa",
  "Comunicacion cercana con la familia",
  "Rutinas adaptadas a cada necesidad",
  "Ambiente hogareno, tranquilo y digno"
];

const contactCards = [
  { label: "Llamanos", value: "320 494 1858", href: "tel:+573204941858" },
  {
    label: "Escribenos",
    value: "belloamaneceram@gmail.com",
    href: "mailto:belloamaneceram@gmail.com"
  },
  { label: "WhatsApp", value: "314 358 3504", href: "https://wa.me/573143583504" }
];

const initialForm = {
  nombre: "",
  telefono: "",
  email: "",
  servicioInteres: "Estadia permanente",
  mensaje: ""
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No pudimos registrar la solicitud.");
      }

      setFormData(initialForm);
      setFormStatus({
        type: "success",
        message:
          "Recibimos tus datos correctamente. Pronto nos pondremos en contacto contigo."
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error.message || "Hubo un problema al enviar tus datos. Intentalo nuevamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page-shell">
      <header className="hero" id="inicio">
        <div className="hero__image-wrap">
          <img className="hero__image" src={bannerImage} alt="Hogar Bello Amanecer" />
        </div>
        <div className="hero__overlay" />
        <nav className="topbar">
          <a className="brand" href="#inicio">
            Hogar Bello Amanecer
          </a>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a className="button button--sm" href="#contacto" onClick={closeMenu}>
              Solicitar llamada
            </a>
          </div>
        </nav>
        <div className="hero__content">
          <p className="eyebrow">Cuidado integral para adultos mayores</p>
          <h1>Un lugar tranquilo, humano y digno para acompanar a quienes mas queremos.</h1>
          <p className="hero__text">
            Creamos una experiencia cercana para cada familia: atencion, bienestar,
            compania y seguimiento en un entorno calido.
          </p>
          <div className="hero__actions">
            <a className="button" href="#contacto">
              Quiero mas informacion
            </a>
            <a className="button button--ghost" href="#servicios">
              Ver servicios
            </a>
          </div>
          <div className="hero__metrics">
            <div>
              <strong>Atencion cercana</strong>
              <span>Seguimiento pensado para cada residente</span>
            </div>
            <div>
              <strong>Ambiente familiar</strong>
              <span>Espacios comodos, tranquilos y acompanados</span>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="section intro">
          <div className="section__copy">
            <p className="eyebrow">Quienes somos</p>
            <h2>Mas que una residencia, un espacio para vivir con calma y compania.</h2>
            <p>
              En Hogar Bello Amanecer acompanamos a los adultos mayores con respeto,
              calidez y dedicacion. Nuestro enfoque esta en brindar tranquilidad a la
              familia y bienestar real a cada residente.
            </p>
            <div className="highlight-list">
              {highlights.map((item) => (
                <div key={item} className="highlight-pill">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="intro__visual">
            <img src={houseImage} alt="Instalaciones del hogar geriatrico" />
          </div>
        </section>
        <section className="section section--soft" id="servicios">
          <div className="section-heading">
            <p className="eyebrow">Servicios</p>
            <h2>Lo que ofrecemos para cuidar a los abuelos con dedicacion y orden.</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span className="service-card__index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section experience-band">
          <div>
            <p className="eyebrow">Nuestra propuesta</p>
            <h2>Un servicio pensado para que la familia sienta confianza desde el primer contacto.</h2>
          </div>
          <div className="experience-band__cards">
            <article>
              <strong>Atencion personalizada</strong>
              <p>Cada caso se escucha y se orienta segun la necesidad real del adulto mayor.</p>
            </article>
            <article>
              <strong>Comunicacion simple</strong>
              <p>La web guia rapido al visitante y deja claro como pedir informacion o una llamada.</p>
            </article>
            <article>
              <strong>Presencia profesional</strong>
              <p>La nueva imagen transmite confianza, cercania y seriedad para el negocio familiar.</p>
            </article>
          </div>
        </section>
        <section className="section" id="modalidades">
          <div className="section-heading">
            <p className="eyebrow">Modalidades</p>
            <h2>Opciones de cuidado que se adaptan a cada familia.</h2>
          </div>
          <div className="modalities-grid">
            {modalities.map((item) => (
              <article className="modality-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="modality-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section about-grid" id="nosotros">
          <article className="about-card">
            <p className="eyebrow">Mision</p>
            <h3>Brindar un cuidado digno y cercano.</h3>
            <p>
              Trabajamos para que cada adulto mayor reciba atencion integral en un
              entorno sereno, seguro y profundamente humano.
            </p>
          </article>
          <article className="about-card">
            <p className="eyebrow">Vision</p>
            <h3>Ser una referencia de confianza para las familias.</h3>
            <p>
              Queremos que nuestra labor se reconozca por la calidez del servicio, la
              cercania con la familia y la calidad de la experiencia cotidiana.
            </p>
          </article>
          <article className="about-card about-card--image">
            <img src={caregiversImage} alt="Equipo y acompanamiento" />
          </article>
        </section>
        <section className="section section--soft contact-section" id="contacto">
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Contacto</p>
              <h2>Dejanos tus datos y te llamamos para orientarte sobre el servicio ideal.</h2>
              <p>
                Este espacio esta pensado para que cualquier familiar pueda pedir
                informacion de forma rapida, sin complicaciones.
              </p>
              <div className="contact-cards">
                {contactCards.map((card) => (
                  <a
                    key={card.label}
                    className="contact-card"
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                  </a>
                ))}
              </div>
            </div>
            <form className="lead-form" onSubmit={handleSubmit}>
              <label>
                Nombre completo
                <input name="nombre" type="text" placeholder="Ej. Maria Rodriguez" value={formData.nombre} onChange={handleChange} required />
              </label>
              <label>
                Telefono
                <input name="telefono" type="tel" placeholder="Ej. 3001234567" value={formData.telefono} onChange={handleChange} required />
              </label>
              <label>
                Correo electronico
                <input name="email" type="email" placeholder="correo@ejemplo.com" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Servicio de interes
                <select name="servicioInteres" value={formData.servicioInteres} onChange={handleChange}>
                  <option>Estadia permanente</option>
                  <option>Cuidado por temporadas</option>
                  <option>Atencion diurna</option>
                  <option>Quiero recibir asesoria</option>
                </select>
              </label>
              <label>
                Cuentanos un poco sobre lo que necesitan
                <textarea
                  name="mensaje"
                  rows="5"
                  placeholder="Ej. Buscamos acompanamiento permanente para un familiar..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                />
              </label>
              <button className="button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar contacto"}
              </button>
              {formStatus.message ? (
                <p className={`form-status form-status--${formStatus.type}`}>{formStatus.message}</p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div>
          <strong>Hogar Bello Amanecer</strong>
          <p>Cuidado integral para adultos mayores con un trato calido y familiar.</p>
        </div>
        <a href="https://wa.me/573204941858" target="_blank" rel="noreferrer">
          Hablar por WhatsApp
        </a>
      </footer>
    </div>
  );
}

export default App;
