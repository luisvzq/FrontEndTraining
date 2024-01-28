import { Formik, Form, Field } from "formik";

import { Link } from "react-router-dom";

const AdminTrainingListPage = () => {


  const publicar = (values) => {
    console.log(values);
  };

  
  return (
    <div >
      <div>Pagina Training List Page ADMIN</div>

      <Link to={"/admin/nuevo-entreno"}>
        <button>Añadir entreno</button>
      </Link>
      <Link to={`/admin/entreno/5`}>
        <button>Ir al entreno 5</button>
      </Link>
      <Link to={`/admin/ajustes`}>
        <button>Modificar usuario</button>
      </Link>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={publicar}
      >
        <Form>
          <Field name="name" type="text"/>
          <Field name="email" type="email"/>
          <Field name="password" type="password"/>
          <button type="submit">Registrarse
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminTrainingListPage;
