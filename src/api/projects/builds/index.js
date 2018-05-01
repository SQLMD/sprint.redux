const router = require("express").Router({ mergeParams: true });
const { store } = require("../../../projects");

router.get("/", (req, res) => {
  const { projectId } = req.params;
  const builds = store.getState().projects[projectId].builds;
  res.status(200).json(builds);
});

router.post("/", (req, res) => {
  const { projectId } = req.params;
  // TODO Trigger a new build for a project. Return immediately with status 200 (don't wait for build to finish).
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  const builds = store.getState().projects[projectId].builds;
  res.status(200).json(builds.pop());
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  // TODO Retrieve a single build from a project
  res.status(418).json({ message: "Not Implemented" });
});

module.exports = router;
