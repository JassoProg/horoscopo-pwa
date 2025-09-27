import React, { useState } from 'react'
import { getZodiacSign, parseDate, zodiacSigns } from './zodiacData'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [zodiacSign, setZodiacSign] = useState(null)
  const [errors, setErrors] = useState({})
  const [currentView, setCurrentView] = useState('home')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Por favor, introduce tu nombre'
    }

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
    let value = e.target.value.replace(/[^\d]/g, '')
    
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

  const resetToHome = () => {
    setCurrentView('home')
    setZodiacSign(null)
    setName('')
    setBirthDate('')
    setErrors({})
  }

  // Vista de resultado detallado
  if (currentView === 'result' && zodiacSign) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <button className="back-btn" onClick={resetToHome}>
              ← Volver al inicio
            </button>
            <h1 className="navbar-brand">Horóscopo</h1>
            <button className="view-all-btn" onClick={() => setCurrentView('all-signs')}>
              Ver todos
            </button>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <div className="result-card">
              <div className="result-header" style={{ background: zodiacSign.bgGradient }}>
                <div className="zodiac-symbol">{zodiacSign.image}</div>
                <h1 className="zodiac-name">{zodiacSign.name}</h1>
                <p className="zodiac-dates">{zodiacSign.dateRange}</p>
                <div className="zodiac-info">
                  <span className="element-badge">Elemento: {zodiacSign.element}</span>
                  <span className="planet-badge">Planeta: {zodiacSign.planet}</span>
                </div>
              </div>

              <div className="result-body">
                <div className="info-grid">
                  <div className="info-card">
                    <h3>Características</h3>
                    <div className="traits-container">
                      {zodiacSign.traits.map((trait, index) => (
                        <span key={index} className="trait-tag">{trait}</span>
                      ))}
                    </div>
                  </div>

                  <div className="info-card">
                    <h3>Fortalezas</h3>
                    <ul className="list">
                      {zodiacSign.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-card">
                    <h3>Áreas de mejora</h3>
                    <ul className="list">
                      {zodiacSign.weaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-card">
                    <h3>Compatibilidad</h3>
                    <div className="traits-container">
                      {zodiacSign.compatibility.map((compatible, index) => (
                        <span key={index} className="compatibility-tag">{compatible}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="description-card">
                  <h3>Descripción</h3>
                  <p>{name ? `${name}, ` : ''}{zodiacSign.description}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Vista de todos los signos
  if (currentView === 'all-signs') {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <button className="back-btn" onClick={resetToHome}>
              ← Volver al inicio
            </button>
            <h1 className="navbar-brand">Todos los Signos</h1>
            <div className="spacer"></div>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <div className="signs-grid">
              {zodiacSigns.map((sign, index) => (
                <div 
                  key={index}
                  className="sign-card"
                  style={{ background: sign.bgGradient }}
                  onClick={() => handleSignClick(sign)}
                >
                  <div className="sign-icon">{sign.image}</div>
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

  // Vista principal (home)
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div className="spacer"></div>
          <h1 className="navbar-brand">Horóscopo</h1>
          <button className="view-all-btn" onClick={() => setCurrentView('all-signs')}>
            Ver todos
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Descubre tu Signo Zodiacal</h1>
              <p className="hero-subtitle">
                Introduce tu fecha de nacimiento y descubre las características únicas de tu signo,
                tus fortalezas, compatibilidades y mucho más.
              </p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="container">
            <div className="form-container">
              <form onSubmit={handleSubmit} className="zodiac-form">
                <div className="form-group">
                  <label htmlFor="name">Tu nombre</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: María"
                    className={errors.name ? 'invalid' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Fecha de nacimiento</label>
                  <input
                    type="text"
                    id="birthDate"
                    value={birthDate}
                    onChange={handleDateChange}
                    placeholder="dd/mm/yyyy"
                    maxLength="10"
                    className={errors.birthDate ? 'invalid' : ''}
                  />
                  {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                </div>

                <button type="submit" className="submit-btn">
                  Descubrir mi signo
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App