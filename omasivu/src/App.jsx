import React, { useEffect } from 'react';
import Section from './components/Section';
import TeamMember from './components/TeamMember';
import Service from './components/Service';
import ContactForm from './components/ContactForm';

const App = () => {
  useEffect(() => {
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }, []);

  return (
    <div>
      <header>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main>
        <Section id="home" bgColor="#f4f4f4">
          <h1>Welcome to Our Website</h1>
          <p>We are a company focused on providing the best services to our customers.</p>
          <img src="https://via.placeholder.com/1200x400" alt="Banner Image" className="hero-image" />
        </Section>

        <Section id="about" bgColor="#ddd">
          <h1>About Us</h1>
          <p>We are a dedicated team with years of experience in delivering top-notch solutions for our clients. Our mission is to help businesses grow by providing high-quality services and innovative solutions.</p>
          <div className="team">
            <TeamMember name="John Doe" role="CEO & Founder" imgSrc="https://via.placeholder.com/150" />
            <TeamMember name="Jane Smith" role="Lead Developer" imgSrc="https://via.placeholder.com/150" />
            <TeamMember name="Emily Johnson" role="Marketing Director" imgSrc="https://via.placeholder.com/150" />
          </div>
        </Section>

        <Section id="services" bgColor="#bbb">
          <h1>Our Services</h1>
          <Service title="Web Development" description="We create responsive and user-friendly websites tailored to your business needs." />
          <Service title="SEO Optimization" description="Our SEO services ensure that your website ranks well in search engines, bringing more traffic to your site." />
          <Service title="Digital Marketing" description="We help businesses grow online through targeted marketing strategies, including social media and paid ads." />
        </Section>

        <Section id="contact" bgColor="#999">
          <h1>Contact Us</h1>
          <p>If you'd like to get in touch, feel free to reach out to us!</p>
          <ContactForm />
        </Section>
      </main>
    </div>
  );
};

export default App;
