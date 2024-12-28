const Positions = () => {
  return (
    <div>
      <h1>Positions</h1>
      <ul>
        {["1", "2", "3"].map((position) => (
          <li key={position}>{position}</li>
        ))}
      </ul>
    </div>
  );
};

export default Positions;
