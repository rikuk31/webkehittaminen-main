const TeamMember = ({ name, role, imgSrc }) => {
    return (
      <div className="team-member">
        <img src={imgSrc} alt={name} />
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    );
  };
  
  export default TeamMember;
  