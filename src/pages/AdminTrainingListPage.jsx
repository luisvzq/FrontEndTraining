import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";

const AdminTrainingListPage = () => {
  return (
    <>
      <Header />
      <div>Pagina Training List Page ADMIN</div>
      <Link to={`/admin/añadir`}>
          <button>Añadir entreno</button>
      </Link>
      <Footer />
    </>
  );
};

export default AdminTrainingListPage;
