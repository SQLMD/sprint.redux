const { ADD_BUILD, EDIT_BUILD } = require("../constants");

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
  addBuild,
  editBuild,
};
