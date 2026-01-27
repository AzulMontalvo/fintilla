// import React from "react";
import cochinito from "../../assets/icons/cochinito.png";
import plantilla from "../../assets/icons/plantilla.png";
import predefinidas from "../../assets/icons/predefinidas.png";
import nuevo from "../../assets/icons/nuevo.png";
import fijo from "../../assets/icons/fijos.png";
import aleatorio from "../../assets/icons/aleatorios.png";
import progresivo from "../../assets/icons/progresivos.png";

export default function Home() {
  return (
    <>
      <article className="hero">
        <header>
          <h1>Crea plantillas para ahorrar y formar hábitos</h1>
        </header>
        <p>
          Define un objetivo, establece un plazo y da seguimiento a tu progreso
          de forma clara y constante.
        </p>
        <section className="hero-buttons">
          <a href="#predefinidas" className="flat-button">Explorar</a>
          <a href="#nuevo" className="flat-button">Crear</a>
        </section>
      </article>

      <section className="card">
        <div className="circle-container">
          <img src={cochinito} alt="alcancia" className="icon" />
        </div>
        <section className="card-content">
          <h2>Haz que tus metas sucedan</h2>
          <p>
            No dejes tus propósitos al azar. Visualiza tu progreso diario y
            convierte tus grandes objetivos en pasos pequeños y alcanzables.
          </p>
        </section>
      </section>

      <section className="column-card">
        <section id="predefinidas" className="card">
          <h2>Plantillas predefinidas</h2>
          <p>
            Explora plantillas diseñadas para diferentes objetivos de ahorro,
            desde vacaciones hasta emergencias.
          </p>
          <a className="circle-container">
            <img src={predefinidas} alt="plantillas" className="icon" />
          </a>
        </section>
        <section id="nuevo" className="card">
          <h2>Crear tu propia plantilla</h2>
          <p>
            Personaliza tu plan de ahorro según tus necesidades y preferencias,
            estableciendo metas y plazos que se adapten a ti.
          </p>
          <a className="circle-container">
            <img src={nuevo} alt="nueva plantilla" className="icon" />
          </a>
        </section>
      </section>

      <section className="card">
        <div className="circle-container">
          <img src={plantilla} alt="hoja de plantilla" className="icon" />
        </div>
        <section className="card-content">
          <h2>¿Por qué usar una plantilla para ahorrar?</h2>
          <p>
            El cerebro responde mejor a sistemas claros que a la fuerza de
            voluntad. Al usar nuestras plantillas, eliminas la fatiga de
            decisión y permites que tu progreso sea evidente, reduciendo la
            fricción para mantener la constancia cada día.
          </p>
        </section>
      </section>

      <section className="column-card">
        <section className="card">
          <header>
            <h2>Montos fijos</h2>
          </header>
          <p>
            Ideal para presupuestos estables. Establece una cifra exacta para
            ahorrar cada período y automatiza tu camino hacia la meta sin
            sorpresas ni complicaciones.
          </p>
          <div className="circle-container">
            <img src={fijo} alt="plantillas" className="icon" />
          </div>
        </section>
        <section className="card">
          <header>
            <h2>Montos aleatorios</h2>
          </header>
          <p>
            Dinamismo en el ahorro a través de cifras variables generadas de
            forma aleatoria. Una alternativa para romper la monotonía y mantener
            el compromiso mediante metas que cambian en cada paso.
          </p>
          <div className="circle-container">
            <img src={aleatorio} alt="plantillas" className="icon" />
          </div>
        </section>
        <section className="card">
          <header>
            <h2>Montos progresivos</h2>
          </header>
          <p>
            Empieza con poco y termina con mucho. Aumenta gradualmente tu
            capacidad de ahorro semana tras semana, entrenando tu disciplina
            financiera como si fuera un músculo.
          </p>
          <div className="circle-container">
            <img src={progresivo} alt="plantillas" className="icon" />
          </div>
        </section>
      </section>
    </>
  );
}
