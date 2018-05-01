const router = require("express").Router({ mergeParams: true });
const { store } = require("../../../projects");
const { triggerBuild } = require("../../../util/build");

router.get("/", (req, res) => {
  const { projectId } = req.params;
  const builds = store.getState().projects[projectId].builds;
  res.status(200).json(builds);
});

router.post("/", (req, res) => {
  const { projectId } = req.params;
  triggerBuild(projectId);
  res.status(200).end();
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  const builds = store.getState().projects[projectId].builds;
  res.status(200).json(builds.pop());
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  const builds = store.getState().projects[projectId].builds;
  res.status(200).json(builds[buildId]);
});

module.exports = router;
