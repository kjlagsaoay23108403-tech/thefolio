import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = ({ toggleDarkMode, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('❌ Name is required.');
      return;
    }
    
    if (!formData.email.trim()) {
      alert('❌ Email is required.');
      return;
    }
    
    if (!formData.message.trim()) {
      alert('❌ Message is required.');
      return;
    }
    
    alert('✅ Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <section>
          <h2>Contact Form:</h2>
          <div className="contact-form-center">
            <form id="contactForm" onSubmit={handleSubmit}>
              <input 
                type="text" 
                id="name" 
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input 
                type="email" 
                id="email" 
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <textarea 
                id="message" 
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>

        <section>
          <h2>Drawing Resources</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Proko</td>
                <td>Drawing and anatomy tutorials</td>
              </tr>
              <tr>
                <td>Drawspace</td>
                <td>Step-by-step drawing lessons</td>
              </tr>
              <tr>
                <td>Behance</td>
                <td>Art inspiration and portfolios</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Map Location</h2>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5180799.94232874!2d-120.5016704712969!3d59.00629883348068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e1!3m2!1sen!2sph!4v1768120741617!5m2!1sen!2sph"
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Canada Map"
          ></iframe>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;