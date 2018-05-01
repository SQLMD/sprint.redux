//const chai = require("chai");
const { expect } = require("chai");
const projects = require("../redux/reducers/projects");

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
    const action = projects.initialize();
    projects.store.dispatch(action);
    previousState = projects.store.getState();
  });

  describe("Projects", () => {
    describe("ADD_PROJECT", () => {
      it("should add a project to the state's projects", () => {
        const previousNumProjects = Object.keys(previousState.projects).length;
        const action = projects.addProject(projectId, project);
        projects.store.dispatch(action);
        const currentState = projects.store.getState();
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
        let action = projects.addProject(projectId, project);
        projects.store.dispatch(action);
        const changes = {
          name: "vim",
        };
        action = projects.editProject(projectId, changes);
        projects.store.dispatch(action);
        const currentState = projects.store.getState();
        expect(currentState.projects[projectId]).to.deep.equal({
          ...project,
          ...changes,
          id: projectId,
        });
      });
    });
    describe("DELETE_PROJECT", () => {
      it("should remove a project with the given id", () => {
        const action = projects.addProject(projectId, project);
        projects.store.dispatch(action);
        const oldState = projects.store.getState();
        const oldNumProjects = Object.keys(oldState.projects).length;
        projects.store.dispatch(projects.deleteProject(projectId));
        const newState = projects.store.getState();
        const newNumProjects = Object.keys(newState.projects).length;
        expect(newNumProjects).to.equal(oldNumProjects - 1);
        expect(newState.projects[projectId]).to.be.undefined;
      });
    });
  });
  describe("Builds", () => {
    describe("ADD_BUILD", () => {
      it("should add a build to a project", () => {
        let action = projects.addProject(projectId, project);
        projects.store.dispatch(action);
        const oldState = projects.store.getState();
        const oldProject = oldState.projects[projectId];
        const oldNumBuilds = oldProject.builds.length;
        const build = {
          buildNumber: oldNumBuilds,
          status: "Running",
        };
        action = projects.addBuild(projectId, oldNumBuilds, build);
        projects.store.dispatch(action);
        const newProject = projects.store.getState().projects[projectId];
        const newNumBuilds = newProject.builds.length;
        expect(newNumBuilds).to.equal(oldNumBuilds + 1);
      });
    });
    describe("EDIT_BUILD", () => {
      it("should modify the status of a build", () => {
        let action = projects.addProject(projectId, project);
        projects.store.dispatch(action);
        const oldState = projects.store.getState();
        const oldProject = oldState.projects[projectId];
        const oldNumBuilds = oldProject.builds.length;
        const build = {
          buildNumber: oldNumBuilds,
          status: "Running",
        };
        action = projects.addBuild(projectId, oldNumBuilds, build);
        projects.store.dispatch(action);
        projects.store.dispatch(
          projects.editBuild(projectId, oldNumBuilds, { status: "Success" })
        );
        const newNewState = projects.store.getState();
        const newNewProject = newNewState.projects[projectId];
        const newStatus = newNewProject.builds[oldNumBuilds].status;
        expect(newStatus).to.equal("Success");
      });
    });
  });
});
