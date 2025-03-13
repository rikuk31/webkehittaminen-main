const Section = ({ id, bgColor, children }) => {
    return (
      <section id={id} style={{ backgroundColor: bgColor, padding: '2rem', textAlign: 'center' }}>
        {children}
      </section>
    );
  };
  
  export default Section;
  