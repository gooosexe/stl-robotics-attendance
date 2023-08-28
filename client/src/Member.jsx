import "./App.css";
import "./index.css";

function changeButtonStatus(name, team) {
  // changes the colour
  console.log(`${name} ${team}`);
}

function Member(props) {
  const {team, name, permission, token} = props;
  
  return (
    <>
      <h2>Welcome <span style={{ color: "yellow" }} >{name}</span> from <span style={{ color: "yellow" }}>82855{team}</span></h2>
      <button className="big-button">
        <p id="buttonText" style={{color: "red"}} > Sign in/out </p>
      </button>
    </>
  );
}

export default Member;
