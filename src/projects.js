const redux = require("redux");

// Step 1: Design the shape of our state.
const initialState = {
  projects: {},
};

// Step 2: Design the Actions/ActionCreators.
// Step 2.1: Store your type constants!
// Replace the whole state.

const INITIALIZE = "INITIALIZE";
const ADD_PROJECT = "ADD_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const ADD_BUILD = "ADD_BUILD";
const EDIT_BUILD = "EDIT_BUILD";

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

const projectsReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT: {
      const newState = { ...previousState };
      const newId = action.project.id;
      newState.projects[newId] = { ...action.project, builds: [] };
      return newState;
    }
    case EDIT_PROJECT: {
      const newState = { ...previousState };
      const projectToChange = newState.projects[action.id];
      const updatedProject = { ...projectToChange, ...action.changes };
      newState.projects[action.id] = updatedProject;
      return newState;
    }

    case DELETE_PROJECT: {
      const newState = { ...previousState };
      delete newState.projects[action.id];
      return newState;
    }

    case ADD_BUILD: {
      const newState = { ...previousState };
      const project = newState.projects[action.projectId];
      const newBuild = { ...action.build, buildNumber: action.buildId };
      project.builds.push(newBuild);
      return newState;
    }

    case EDIT_BUILD: {
      const newState = { ...previousState };
      const project = newState.projects[action.projectId];
      const editedBuild = {
        ...project.builds[action.buildId],
        ...action.changes,
      };
      project.builds[action.buildId] = editedBuild;

      return newState;
    }

    default:
      return previousState;
  }
};

const store = redux.createStore(projectsReducer);

module.exports = {
  store,
  initialize,
  addProject,
  editProject,
  deleteProject,
  addBuild,
  editBuild,
};
