import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import Card from "../../Components/card/Card";

function Home() {
  return (
    <div className="home">
      <div className="navbarTop">
        <Navbar />
      </div>

      <div className="hometitle">
        <h1 className="hometitle1">WELCOME TO BIOEXPLORER</h1>
      </div>

      <div className="cards">
        <Card />
      </div>
    </div>
  );
}

export default Home;
