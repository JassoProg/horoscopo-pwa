import { useState } from 'react'
import { getZodiacSign, parseDate } from './zodiacData'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [zodiacSign, setZodiacSign] = useState(null)
  const [errors, setErrors] = useState({})

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

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container-fluid">
          <h1 className="navbar-brand">Horóscopo React</h1>
          <p className="navbar-text">Descubre tu signo zodiacal y personalidad</p>
        </div>
      </nav>

      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            {/* Left Section - Input Form */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label name-label">Nombre:</label>
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

                    <div className="mb-3">
                      <label htmlFor="birthDate" className="form-label date-label">Fecha de Nacimiento:</label>
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

                    <button type="submit" className="btn btn-primary">
                      Descubrir mi Signo
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Section - Zodiac Display */}
            <div className="col-md-6">
              <div className="card zodiac-result-card">
                {zodiacSign && (
                  <div 
                    className="zodiac-gradient-bg" 
                    style={{ background: zodiacSign.bgGradient }}
                  ></div>
                )}
                <div className="card-body zodiac-content">
                  {zodiacSign ? (
                    <div className="zodiac-result">
                      <div className="text-center mb-4">
                        <h2 className="card-title">Tu Signo: {zodiacSign.name}</h2>
                        <div className="zodiac-image">{zodiacSign.image}</div>
                        <div className="zodiac-symbol">{zodiacSign.symbol}</div>
                      </div>
                      
                      <div className="text-center mb-3">
                        <span className="badge badge-secondary">Elemento: {zodiacSign.element}</span>
                      </div>

                      <div className="traits-list">
                        {zodiacSign.traits.map((trait, index) => (
                          <span key={index} className="trait-badge">{trait}</span>
                        ))}
                      </div>

                      <div 
                        className="horoscope-description"
                        style={{ '--zodiac-gradient': zodiacSign.bgGradient }}
                      >
                        <h5>{name}</h5>
                        <p>{zodiacSign.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center placeholder">
                      <div className="placeholder-icon">🔮</div>
                      <p>Introduce tu nombre y fecha de nacimiento para descubrir tu signo zodiacal</p>
                    </div>
                  )}
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
