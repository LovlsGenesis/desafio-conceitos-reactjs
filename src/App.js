import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data)
    });
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      // id: "123",
      title: "Desafio",
      url: "https://github.com/josepholiveirqsdqda",
      techs: ["Node.js"],
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const projectIndex = projects.findIndex(project => project.id === id);
    
    projects.splice(projectIndex, 1);

    setProjects([...projects])
  }

  return (
    <div>
    <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {projects.map(project => 
        <li key={project.id}> 
          {project.title}
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
      </ul>

    </div>
  );
}

export default App;
