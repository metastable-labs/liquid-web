const Add = ({ onClose }: InteractionProps) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <div>
      <h1>Add money Interaction</h1>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default Add;
