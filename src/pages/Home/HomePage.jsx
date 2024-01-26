import SimpleSlider from "../../components/HomeSlider/HomeSlider";
// import Fade from "../../components/HomeSlider/HomeSlider";
// import Slideshow from "../../components/HomeSlider/HomeSlider";
// import HomeSlider from "../../components/HomeSlider/HomeSlider";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home">
      <section className="title-section">
        <h1 className="main-title">WORKOUT APP</h1>
      </section>
      <SimpleSlider />
    </div>
  );
};

export default HomePage;
