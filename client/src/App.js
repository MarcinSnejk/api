import React, {useState} from 'react'
import './App.css'

const App = () => {

  const [formData, setFormData] = useState({name:'', email:'',message:''});

  const [responseMessage, setResponseMessage] = useState('');

  // Funkcja zmiany wartości do formularza
  const handleChange = (e) => {

    const {id, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }) );

  };

  //Funkcja wysyłania formularza, ehhhh dużo nauki mnie czeka z backendem...

  const handleSubmit = (e) => {

    e.preventDeafult();

    fetch('/api/send-message', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
     })
    .then((response) => response.json())
    .then((data) => {
      if(data.succes)
      {
        setResponseMessage("Your message has been sent successfully.");
      }
      else
      {
        setResponseMessage("Error, something gone wrong..");
      }
    }).catch((error) => {
      setResponseMessage('Error, try again.');
      console.error('Error', error);
    });

  };


  return (
    <div>
        
        <div className='container'>
          
          <div className='contact'>
            
            <form className='contact-form' onSubmit={handleSubmit}>
              
              <h1  id="title">Contact us</h1>

              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />

              <label htmlFor="message">Message</label>
              <textarea id="message" value={formData.message} onChange={handleChange} required ></textarea>

              <button type="submit">Send</button>

            </form>

            <div id="responseMessage">
              {responseMessage && <p>{responseMessage}</p> }
            </div>

          </div>
          
        </div>

    </div>
  )
}

export default App
