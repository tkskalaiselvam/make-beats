import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ButtonContainer from "./components/ButtonContainer";

function App() {

  const data = [
    [{ name: "Kick",bg:"#123456" }, { name: "Snare",bg:"green" }, { name: "Snap",bg:"#123" }],
    [{ name: "Clap",bg:"red" }, { name: "Hat",bg:"#123" }, { name: "Crash",bg:"brown" }],
    [{ name: "Bell",bg:"violet" }, { name: "Ride",bg:"pink" }, { name: "Rim",bg:"purple" }],
  ];

  return (
    <div>
      <div className="">
        {data.map((item) => (
          <ButtonContainer data={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
