import React, { useState } from 'react'
import { getZodiacSign, parseDate, zodiacSigns } from './zodiacData'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [zodiacSign, setZodiacSign] = useState(null)
  const [errors, setErrors] = useState({})
  const [currentView, setCurrentView] = useState('home') // 'home', 'result', 'all-signs'

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Por favor, introduce tu nombre'
    }

    // Validate and parse date
    if (!birthDate.trim()) {
      newErrors.birthDate = 'Por favor, introduce tu fecha de nacimiento'
    } else {
      const parsedDate = parseDate(birthDate)
      if (!parsedDate) {
        newErrors.birthDate = 'Formato de fecha inválido. Usa dd/mm/yyyy'
      } else {
        const sign = getZodiacSign(parsedDate)
        setZodiacSign(sign)
        setCurrentView('result')
      }
    }

    setErrors(newErrors)
  }

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '') // Remove non-digits
    
    // Auto-format with slashes
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2)
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '/' + value.substring(5, 9)
    }
    
    setBirthDate(value)
  }

  const handleSignClick = (sign) => {
    setZodiacSign(sign)
    setCurrentView('result')
  }

  if (currentView === 'result' && zodiacSign) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="container-fluid">
            <button 
              className="back-btn"
              onClick={() => setCurrentView('home')}
            >
              ← Volver
            </button>
            <h1 className="navbar-brand">Horóscopo</h1>
            <button 
              className="view-all-btn"
              onClick={() => setCurrentView('all-signs')}
            >
              Ver todos
            </button>
          </div>
        </nav>

        <main className="main-content result-view">
          <div className="container-fluid">
            <div className="zodiac-detailed-card">
              <div 
                className="zodiac-header-bg"
                style={{ background: zodiacSign.bgGradient }}
              >
                <div className="zodiac-header-content">
                  <div className="zodiac-symbol-large">{zodiacSign.image}</div>
                  <h1 className="zodiac-name">{zodiacSign.name}</h1>
                  <p className="zodiac-dates">{zodiacSign.dateRange}</p>
                  <div className="zodiac-element-planet">
                    <span className="element-badge">Elemento: {zodiacSign.element}</span>
                    <span className="planet-badge">Planeta: {zodiacSign.planet}</span>
                  </div>
                </div>
              </div>

              <div className="zodiac-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="info-section">
                      <h3>Características Principales</h3>
                      <div className="traits-grid">
                        {zodiacSign.traits.map((trait, index) => (
                          <span key={index} className="trait-chip">{trait}</span>
                        ))}
                      </div>
                    </div>

                    <div className="info-section">
                      <h3>Fortalezas</h3>
                      <div className="strengths-list">
                        {zodiacSign.strengths.map((strength, index) => (
                          <div key={index} className="strength-item">
                            <span className="strength-icon">✨</span>
                            <span>{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="info-section">
                      <h3>Áreas de Mejora</h3>
                      <div className="weaknesses-list">
                        {zodiacSign.weaknesses.map((weakness, index) => (
                          <div key={index} className="weakness-item">
                            <span className="weakness-icon">⚠️</span>
                            <span>{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="info-section">
                      <h3>Compatibilidad</h3>
                      <div className="compatibility-grid">
                        {zodiacSign.compatibility.map((compatible, index) => (
                          <span key={index} className="compatibility-chip">{compatible}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="description-section">
                  <h3>Descripción Completa</h3>
                  <div className="description-card">
                    <p>{name ? `${name}, ` : ''}{zodiacSign.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (currentView === 'all-signs') {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="container-fluid">
            <button 
              className="back-btn"
              onClick={() => setCurrentView('home')}
            >
              ← Inicio
            </button>
            <h1 className="navbar-brand">Todos los Signos</h1>
            <div className="placeholder-btn"></div>
          </div>
        </nav>

        <main className="main-content all-signs-view">
          <div className="container-fluid">
            <div className="signs-grid">
              {zodiacSigns.map((sign, index) => (
                <div 
                  key={index} 
                  className="sign-card"
                  style={{ background: sign.bgGradient }}
                  onClick={() => handleSignClick(sign)}
                >
                  <div className="sign-symbol">{sign.image}</div>
                  <h3 className="sign-name">{sign.name}</h3>
                  <p className="sign-dates">{sign.dateRange}</p>
                  <p className="sign-element">{sign.element}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Default home view
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="placeholder-btn"></div>
          <h1 className="navbar-brand">Horóscopo</h1>
          <button 
            className="view-all-btn"
            onClick={() => setCurrentView('all-signs')}
          >
            Ver todos
          </button>
        </div>
      </nav>

      <main className="main-content home-view">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Descubre tu Horóscopo</h1>
              <p className="hero-subtitle">
                ¿Publicar horóscopos para sus lectores? El editor en línea<br/>
                Interactyc le permite organizar rápida y fácilmente un horóscopo<br/>
                en un elegante bloque interactivo e incrustarlo en su sitio web<br/>
                con un simple copiar y pegar. Cree horóscopos que atraigan a<br/>
                los usuarios y que se distingan de la competencia.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-outline">VER PLANTILLAS</button>
                <button className="btn btn-primary">CREAR GRATIS</button>
              </div>
            </div>
            <div className="hero-image">
              <div className="zodiac-wheel">
                <div className="zodiac-center">♌</div>
                <div className="zodiac-signs-circle">
                  {zodiacSigns.slice(0, 12).map((sign, index) => (
                    <div 
                      key={index}
                      className="zodiac-sign-item"
                      style={{ 
                        transform: `rotate(${index * 30}deg) translateY(-120px) rotate(-${index * 30}deg)`,
                        background: sign.bgGradient
                      }}
                    >
                      <span className="sign-symbol">{sign.image}</span>
                      <span className="sign-name-small">{sign.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="form-card">
                  <h2 className="form-title">¿Diseñar un horóscopo bonito?<br/>Tan fácil como un pastel</h2>
                  <form onSubmit={handleSubmit} className="zodiac-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Nombre:</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Introduce tu nombre"
                        className={errors.name ? 'form-control is-invalid' : 'form-control'}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento:</label>
                      <input
                        type="text"
                        id="birthDate"
                        value={birthDate}
                        onChange={handleDateChange}
                        placeholder="dd/mm/yyyy"
                        maxLength="10"
                        className={errors.birthDate ? 'form-control is-invalid' : 'form-control'}
                      />
                      {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg">
                      Descubrir mi Signo
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">🛠️</div>
                  <h3>Solución llave en mano</h3>
                  <p>Para crear un horóscopo, simplemente seleccione una plantilla y añada su contenido. El bloque del horóscopo puede integrarse fácilmente en el sitio y actualizarse sobre la marcha.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">🎨</div>
                  <h3>Su propio diseño</h3>
                  <p>Un editor flexible le permite afinar el diseño de su proyecto. Cree su propia plantilla para que coincida con el estilo de su publicación o marca.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card">
                  <div className="feature-icon">�</div>
                  <h3>Ideal para dispositivos móviles</h3>
                  <p>Ahorre a sus usuarios el desplazamiento interminable. El bloque, formado por tarjetas interactivas, permite ir directamente al signo zodiacal de interés.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
