const {
  INITIALIZE,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
} = require("../constants");

const initialize = () => {
  return { type: INITIALIZE };
};

const addProject = (id, project) => {
  const newProject = { ...project };
  newProject.id = id;
  return {
    type: ADD_PROJECT,
    project: newProject,
  };
};

const editProject = (id, changes) => ({
  type: EDIT_PROJECT,
  id,
  changes,
});

const deleteProject = (id) => ({
  type: DELETE_PROJECT,
  id,
});

module.exports = {
  initialize,
  addProject,
  editProject,
  deleteProject,
};
