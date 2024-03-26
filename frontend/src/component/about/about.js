import React from 'react';
import './about.css'; // Import your CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>Welcome to Bloom-Kart - Your Ultimate Electronics Destination!</h1>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>Bloom-Kart was founded with a simple yet powerful vision: to provide customers with a seamless shopping experience for all their electronic needs...</p>
        </div>
        <div className="about-section">
          <h2>What We Offer</h2>
          <p>Explore our extensive catalog featuring a wide range of electronics, including smartphones, laptops, cameras, gaming consoles, smart home devices, and much more...</p>
        </div>
        <div className="about-section">
          <h2>Why Choose Bloom-Kart?</h2>
          <ul>
            <li><strong>Quality Assurance:</strong> We handpick products from trusted brands to ensure quality and reliability.</li>
            <li><strong>Competitive Pricing:</strong> Enjoy competitive prices on a diverse range of products, along with regular discounts and special offers.</li>
            <li><strong>Expert Guidance:</strong> Our team of tech enthusiasts is here to provide expert advice and assistance...</li>
            <li><strong>Convenience:</strong> With our user-friendly website built using React, browsing and shopping for electronics has never been easier.</li>
            <li><strong>Secure Transactions:</strong> Shop with confidence knowing that your transactions are secure and your data is protected.</li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>At Bloom-Kart, our mission is to make the latest technology accessible to everyone...</p>
        </div>
        <div className="about-section">
          <h2>Get in Touch</h2>
          <p>Have questions or need assistance? Our dedicated customer support team is here to help. Reach out to us via email, phone, or live chat...</p>
        </div>
      </div>
    </div>
  );
}

export default About;
