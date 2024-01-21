import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <section className="title-section">
        <h1 className="main-title">WORKOUT APP</h1>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
