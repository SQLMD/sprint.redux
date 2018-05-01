const {
  INITIALIZE,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_BUILD,
  EDIT_BUILD,
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

const addBuild = (projectId, buildId, build) => ({
  type: ADD_BUILD,
  projectId,
  buildId,
  build,
});

const editBuild = (projectId, buildId, changes) => ({
  type: EDIT_BUILD,
  projectId,
  buildId,
  changes,
});

module.exports = {
  initialize,
  addProject,
  editProject,
  deleteProject,
  addBuild,
  editBuild,
};
