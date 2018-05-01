const redux = require("redux");
const {
  INITIALIZE,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  ADD_BUILD,
  EDIT_BUILD,
} = require("../constants");
const {
  initialize,
  addProject,
  editProject,
  deleteProject,
  addBuild,
  editBuild,
} = require("../actions/projects");

const initialState = {
  projects: {},
};

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
};
