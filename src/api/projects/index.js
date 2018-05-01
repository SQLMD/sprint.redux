const router = require("express").Router();
const builds = require("./builds");
const {
  store,
  addProject,
  editProject,
  deleteProject,
} = require("../../projects");
const shortid = require("shortid");

const validateProject = (project) => {
  const validKeys = new Set(["name", "url", "buildCommand", "language", "id"]);
  // eslint-disable-next-line prefer-const
  for (let key in project) {
    if (!validKeys.has(key)) {
      throw new Error(`${key} is not valid`);
    }
  }
};

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
  res.status(200).json(store.getState().projects[projectId]);
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { changes } = req.body;
  try {
    validateProject(changes);
    store.dispatch(editProject(projectId, changes));
    res.status(200).json(store.getState().projects[projectId]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  store.dispatch(deleteProject(projectId));
  res.status(200).end();
});

router.use("/:projectId/builds", builds);

module.exports = router;
