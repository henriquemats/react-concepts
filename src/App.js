import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(...repositories, response.data);
    });
    // eslint-disable-next-line
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: "Added repository",
      url: "http://www.github.com/repo",
      techs: ["AngularJS", "ViewJS", "ReactJs"],
    };
    api.post("/repositories", repository).then((response) => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    function handleRemoveStateRepository() {
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    }

    api.delete(`/repositories/${id}`).then(() => {
      handleRemoveStateRepository();
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
