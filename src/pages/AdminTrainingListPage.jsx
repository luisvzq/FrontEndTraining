import { Link } from "react-router-dom";

const AdminTrainingListPage = () => {
  return (
    <>
      <div>Pagina Training List Page ADMIN</div>
      
      <Link to={`/admin/añadir`}>
          <button>Añadir entreno</button>
      </Link>
      <Link to={`/admin/entreno/5`}>
          <button>Ir al entreno 5</button>
      </Link>
      <Link to={`/admin/user/modify`}>
            <button>Modificar usuario</button>
      </Link>
    </>
  );
};

export default AdminTrainingListPage;
