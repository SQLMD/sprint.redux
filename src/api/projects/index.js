const router = require("express").Router();
const builds = require("./builds");
const { store, addProject } = require("../../projects");
const shortid = require("shortid");

router.get("/", (req, res) => {
  res.status(200).json(store.getState());
});

//TODO change to post
router.put("/", (req, res) => {
  const { project } = req.body;
  const newId = shortid.generate();
  store.dispatch(addProject(newId, project));
  const newProject = store.getState().projects[newId];
  res.status(201).json(newProject);
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO retrieve and send project with given id
  res.status(418).json({ message: "Not Implemented" });
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(418).json({ message: "Not Implemented" });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO delete project, return status 200 with no body on success
  res.status(418).json({ message: "Not Implemented" });
});

router.use("/:projectId/builds", builds);

module.exports = router;
