import Header from "../../component/header";
import Video from "../../component/video";
import "./style.css";


export default function Home() {
  return (
    <div className="home-wrapper">
      <Header />


      <div className="home-container">
        <Video />
      </div>
    
    </div>
  )
}

