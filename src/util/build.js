const Promise = require("bluebird");
const Queue = require("queue");
const { store, addBuild, editBuild } = require("../projects");

const queue = Queue();
queue.autostart = true;
queue.concurrency = 1;

const buildProject = async (projectId, buildNumber) => {
  await Promise.delay(3000); // Please leave this in to simulate load

  const build = {
    buildNumber,
    status: "Running",
  };
  // TODO Set build status to "Running" in app state!
  store.dispatch(addBuild(projectId, buildNumber, build));
  // super complex build logic following, check out project, run yarn test etc etc
  await Promise.delay(3000); // Do not modify this timing
  const status = Math.random() > 0.5 ? "Failed" : "Success";
  const output = "Donezo!";
  store.dispatch(editBuild(projectId, buildNumber, { status, output }));
  // TODO Set build status and output in app state!
};

const triggerBuild = async (projectId) => {
  // TODO add this new build to application state!
  // You also have to get the new build number assigned to it here.
  const project = store.getState().projects[projectId];
  const buildNumber = project.builds.length;
  queue.push(() => buildProject(projectId, buildNumber));
};

module.exports = {
  triggerBuild,
};
