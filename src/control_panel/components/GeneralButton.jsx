import "../styles/generalbutton.css";

const GeneralButton = ({ handleSubmit }) => {
  return (
    <button className="general_button" type="submit" onClick={handleSubmit}>
      Submit
    </button>
  );
};

export default GeneralButton;
