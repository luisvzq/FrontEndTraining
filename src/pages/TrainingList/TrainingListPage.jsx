import { useContext, useState } from "react";
import Next from "../../assets/Next.svg";
import Prev from "../../assets/Prev.svg";
import Loading from "../../components/Loading/Loading.jsx";
import Add from "../../assets/Add.svg";
import { Link, useSearchParams } from "react-router-dom";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import { authContext } from "../../context/AuthContext.jsx";
import Training from "../../components/Training/Training.jsx";
import "./TrainingListPage.scss"

const TrainingListPage = () => {
  const [context] = useContext(authContext);
  const [filter, setFilter] = useState();
  const { hookGetFetch } = useFetchHooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (field, value) => {
    searchParams.set(field, value);
    setSearchParams(new URLSearchParams(searchParams));
  };

  const pageSize = 10;
  const queryParams = searchParams.toString();

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery(
    [`training?${queryParams}`, currentPage],
    () =>
      hookGetFetch(`training?${queryParams}`, { page: currentPage, pageSize }),
    {
      onSuccess: (data) => {
        setFilter(data);
        console.log("k pon aki: ", data);
      },
    }
  );
  const renderizar = () => {
    refetch();
  };

  return (
    <div className="training-list">
      {context.role === "admin" && (
        <Link to="/admin/crear" className="linkList">
          <button className="buttonAdd">
            <img src={Add} alt="Añadir" className="add" />
          </button>
        </Link>
      )}
      <form className="order-training-form">
        <div className="search-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={searchParams.get("name") || ""}
            onChange={(e) => {
              handleChange("name", e.target.value);
            }}
          />
        </div>
        <div className="search-group">
          <label htmlFor="typology">Tipologia</label>
          <input
            type="text"
            id="typology"
            value={searchParams.get("typology") || ""}
            onChange={(e) => {
              handleChange("typology", e.target.value);
            }}
          />
        </div>

        <div className="search-group">
          <label htmlFor="muscleGroup">Grupo Muscular</label>
          <input
            type="text"
            id="muscleGroup"
            value={searchParams.get("muscle_group") || ""}
            onChange={(e) => {
              handleChange("muscle_group", e.target.value);
            }}
          />
        </div>
        <div className="order-group">
          <label htmlFor="order"></label>
          <select
            value={searchParams.get("order_by") || ""}
            name="order"
            id="order"
            onChange={(e) => {
              handleChange("order_by", e.target.value);
            }}
          >
            <option value="">Ordenar por</option>
            <option value="name">Nombre</option>
            <option value="date">Fecha</option>
            <option value="likes">Likes</option>
          </select>
        </div>
      </form>

      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess && <Training data={filter} renderizar={renderizar} />}

      {isSuccess && data && (
        <div>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
            className="button"
          >
            <img src={Prev} alt="Anterior" className="prev" />
          </button>
          <span className="pages">Página {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={filter.length < pageSize}
            className="button"
          >
            <img src={Next} alt="Siguiente" className="next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TrainingListPage;
