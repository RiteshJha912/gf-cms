import { useEffect, useState } from 'react'

function App() {
  const [events, setEvents] = useState([])

  const convertToGoogleusercontent = (url) => {
    const match = url.match(/id=([^&]+)/)
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w1080`
    }
    return url
  }

  // Format date nicely
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    if (isNaN(date)) return dateStr
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  useEffect(() => {
    fetch(
      'https://opensheet.vercel.app/1ihsm4x0d3Cym41Rc4FIs5ujytnSiA_2ZIV7BU3s1DZI/Form%20Responses%201'
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data)
      })
      .catch((err) => console.error('Failed to fetch events:', err))
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Event Gallery
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={convertToGoogleusercontent(event['Image of Event (Only 1)'])}
              alt={
                event['Title of Event (Example : Night Trek)'] || 'Event Image'
              }
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '15px' }}>
              <h2
                style={{
                  margin: '0 0 10px 0',
                  fontSize: '1.2rem',
                  color: '#222',
                }}
              >
                {event['Title of Event (Example : Night Trek)'] ||
                  'Untitled Event'}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: '#555',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}
              >
                {formatDate(event['Date of Event'])}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
