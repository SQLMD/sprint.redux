const redux = require("redux");

// Step 1: Design the shape of our state.
const initialState = {
  projects: {},
};

// Step 2: Design the Actions/ActionCreators.
// Step 2.1: Store your type constants!
// Replace the whole state.
// const ADD_TODO = "ADD_TODO";
// const SET_TODO = "SET_TODO";
// const EDIT_TODO = "EDIT_TODO";
// const DELETE_TODO = "DELETE_TODO";

const ADD_PROJECT = "ADD_PROJECT";

const addProject = (id, project) => {
  const newProject = { ...project };
  newProject.id = id;
  return {
    type: ADD_PROJECT,
    project: newProject,
  };
};
// const addTodo = (todo) => ({
//   type: ADD_TODO,
//   todo,
// });

// const setTodo = (id, todo) => ({
//   type: SET_TODO,
//   id,
//   todo,
// });

// const editTodo = (id, changes) => ({
//   type: EDIT_TODO,
//   id,
//   changes,
// });

// const deleteTodo = (id) => ({
//   type: DELETE_TODO,
//   id,
// });

// Step 3: Design the TodoReducer.

const projectsReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT: {
      const newState = { ...previousState };
      const newId = action.project.id;
      newState.projects[newId] = action.project;
      return newState;
    }
    // case ADD_TODO: {
    //   const newState = { ...previousState };
    //   newState.todos.push(action.todo);
    //   return newState;
    // }
    // case SET_TODO: {
    //   const newState = { ...previousState };
    //   newState.todos[action.id] = action.todo;
    //   return newState;
    // }

    // case EDIT_TODO: {
    //   const newState = { ...previousState };
    //   newState.todos[action.id] = {
    //     ...newState.todos[action.id],
    //     ...action.changes,
    //   };
    //   return newState;
    // }
    // case DELETE_TODO: {
    //   const newState = { ...previousState };
    //   delete newState.todos[action.id];
    //   return newState;
    // }

    default:
      return previousState;
  }
};

const store = redux.createStore(projectsReducer);

module.exports = { store, addProject };
