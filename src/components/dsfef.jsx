// Importamos useSearchParams
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  // useSearchParams nos da acceso a los parámetros actuales y una función para actualizarlos.
  const [searchParams, setSearchParams] = useSearchParams();

  // Simulamos datos de búsqueda para el ejemplo
  const data = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Vue' },
    { id: 3, name: 'Angular' },
    { id: 4, name: 'Svelte' },
  ];

  // Obtenemos el valor actual del parámetro 'query' de la URL.
  const currentQuery = searchParams.get('query');

  // Función para manejar cambios en el campo de búsqueda y actualizar la URL.
  const handleSearchChange = (newQuery) => {
    // Si el campo de búsqueda está vacío, eliminamos el parámetro 'query'.
    if (newQuery) {
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  };

  // Filtramos los datos basados en el parámetro de búsqueda actual.
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(currentQuery?.toLowerCase() || '')
  );

  return (
    <section>
      <input
        type="text"
        placeholder="Buscar..."
        value={currentQuery || ''}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      {/* Mostramos los resultados de la búsqueda */}
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {filteredData.length === 0 && <p>No se encontraron resultados.</p>}
    </section>
  );
}

export default SearchPage;