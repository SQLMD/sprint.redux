//const chai = require("chai");
const { expect } = require("chai");
const reducers = require("../redux/reducers/projects");
const actions = require("../redux/actions/projects");

describe("Redux Actions", () => {
  const project = {
    name: "vscode",
    url: "git@github.com:Microsoft/vscode.git",
    buildCommand: "yarn && yarn test",
    language: "JavaScript",
    builds: [],
  };
  const projectId = "5";
  let previousState;

  beforeEach(() => {
    const action = actions.initialize();
    reducers.store.dispatch(action);
    previousState = reducers.store.getState();
  });

  describe("Projects", () => {
    describe("ADD_PROJECT", () => {
      it("should add a project to the state's projects", () => {
        const previousNumProjects = Object.keys(previousState.projects).length;
        const action = actions.addProject(projectId, project);
        reducers.store.dispatch(action);
        const currentState = reducers.store.getState();
        const currentNumProjects = Object.keys(currentState.projects).length;
        expect(currentNumProjects).to.equal(previousNumProjects + 1);
        expect(currentState.projects[projectId]).to.deep.equal({
          ...project,
          id: projectId,
        });
      });
    });
    describe("EDIT_PROJECT", () => {
      it("should edit a project with changes", () => {
        let action = actions.addProject(projectId, project);
        reducers.store.dispatch(action);
        const changes = {
          name: "vim",
        };
        action = actions.editProject(projectId, changes);
        reducers.store.dispatch(action);
        const currentState = reducers.store.getState();
        expect(currentState.projects[projectId]).to.deep.equal({
          ...project,
          ...changes,
          id: projectId,
        });
      });
    });
    describe("DELETE_PROJECT", () => {
      it("should remove a project with the given id", () => {
        const action = actions.addProject(projectId, project);
        reducers.store.dispatch(action);
        const oldState = reducers.store.getState();
        const oldNumProjects = Object.keys(oldState.projects).length;
        reducers.store.dispatch(actions.deleteProject(projectId));
        const newState = reducers.store.getState();
        const newNumProjects = Object.keys(newState.projects).length;
        expect(newNumProjects).to.equal(oldNumProjects - 1);
        expect(newState.projects[projectId]).to.be.undefined;
      });
    });
  });
  describe("Builds", () => {
    describe("ADD_BUILD", () => {
      it("should add a build to a project", () => {
        let action = actions.addProject(projectId, project);
        reducers.store.dispatch(action);
        const oldState = reducers.store.getState();
        const oldProject = oldState.projects[projectId];
        const oldNumBuilds = oldProject.builds.length;
        const build = {
          buildNumber: oldNumBuilds,
          status: "Running",
        };
        action = actions.addBuild(projectId, oldNumBuilds, build);
        reducers.store.dispatch(action);
        const newProject = reducers.store.getState().projects[projectId];
        const newNumBuilds = newProject.builds.length;
        expect(newNumBuilds).to.equal(oldNumBuilds + 1);
      });
    });
    describe("EDIT_BUILD", () => {
      it("should modify the status of a build", () => {
        let action = actions.addProject(projectId, project);
        reducers.store.dispatch(action);
        const oldState = reducers.store.getState();
        const oldProject = oldState.projects[projectId];
        const oldNumBuilds = oldProject.builds.length;
        const build = {
          buildNumber: oldNumBuilds,
          status: "Running",
        };
        action = actions.addBuild(projectId, oldNumBuilds, build);
        reducers.store.dispatch(action);
        reducers.store.dispatch(
          actions.editBuild(projectId, oldNumBuilds, { status: "Success" })
        );
        const newNewState = reducers.store.getState();
        const newNewProject = newNewState.projects[projectId];
        const newStatus = newNewProject.builds[oldNumBuilds].status;
        expect(newStatus).to.equal("Success");
      });
    });
  });
});
