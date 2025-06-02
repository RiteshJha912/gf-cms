import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [events, setEvents] = useState([])

  const convertToGoogleusercontent = (url) => {
    const match = url.match(/id=([^&]+)/)
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w1080`
    }
    return url
  }

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
        const sorted = [...data].sort((a, b) => {
          const dateA = new Date(a['Date of Event'])
          const dateB = new Date(b['Date of Event'])
          return dateB - dateA
        })
        setEvents(sorted)
      })
      .catch((err) => console.error('Failed to fetch events:', err))
  }, [])

  return (
    <div className='gallery-container'>
      <h1 className='gallery-title'>Event Gallery</h1>
      <div className='card-grid'>
        {events.map((event, index) => (
          <div className='polaroid-card' key={index}>
            <img
              src={convertToGoogleusercontent(event['Image of Event (Only 1)'])}
              alt={event['Title of Event (Example : Night Trek)'] || 'Event'}
              className='polaroid-image'
            />
            <div className='polaroid-caption'>
              <h2 className='polaroid-title'>
                {event['Title of Event (Example : Night Trek)'] ||
                  'Untitled Event'}
              </h2>
              <p className='polaroid-date'>
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
