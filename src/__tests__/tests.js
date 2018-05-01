//const chai = require("chai");
const { expect } = require("chai");
const projects = require("../projects");

describe("Projects", () => {
  describe("actions", () => {
    const newProject = {
      name: "vscode",
      url: "git@github.com:Microsoft/vscode.git",
      buildCommand: "yarn && yarn test",
      language: "JavaScript",
      builds: [],
    };
    const newProjectId = "5";
    let previousState;

    beforeEach(() => {
      const action = projects.initialize();
      projects.store.dispatch(action);
      previousState = projects.store.getState();
    });

    describe("ADD_PROJECT", () => {
      it("should add a project to the state's projects", () => {
        const previousNumProjects = Object.keys(previousState.projects).length;
        const action = projects.addProject(newProjectId, newProject);
        projects.store.dispatch(action);
        const currentState = projects.store.getState();
        const currentNumProjects = Object.keys(currentState.projects).length;
        expect(currentNumProjects).to.equal(previousNumProjects + 1);
        expect(currentState.projects[newProjectId]).to.deep.equal({
          ...newProject,
          id: newProjectId,
        });
      });
    });
    describe("EDIT_PROJECT", () => {
      it("should edit a project with changes", () => {
        let action = projects.addProject(newProjectId, newProject);
        projects.store.dispatch(action);
        const changes = {
          name: "vim",
        };
        action = projects.editProject(newProjectId, changes);
        projects.store.dispatch(action);
        const currentState = projects.store.getState();
        expect(currentState.projects[newProjectId]).to.deep.equal({
          ...newProject,
          ...changes,
          id: newProjectId,
        });
      });
    });
    describe("DELETE_PROJECT", () => {
      it("should remove a project with the given id", () => {
        const action = projects.addProject(newProjectId, newProject);
        projects.store.dispatch(action);
        const oldState = projects.store.getState();
        const oldNumProjects = Object.keys(oldState.projects).length;
        projects.store.dispatch(projects.deleteProject(newProjectId));
        const newState = projects.store.getState();
        const newNumProjects = Object.keys(newState.projects).length;
        expect(newNumProjects).to.equal(oldNumProjects - 1);
        expect(newState.projects[newProjectId]).to.be.undefined;
      });
    });
    describe("ADD_BUILD", () => {
      it("should add a build to a project", () => {
        let action = projects.addProject(newProjectId, newProject);
        projects.store.dispatch(action);
        const oldState = projects.store.getState();
        const oldProject = oldState.projects[newProjectId];
        const oldNumBuilds = oldProject.builds.length;
        const build = {
          buildNumber: oldNumBuilds,
          status: "Running",
        };
        action = projects.addBuild(newProjectId, oldNumBuilds, build);
        projects.store.dispatch(action);
        const currentProject = projects.store.getState().projects[newProjectId];
        const newNumBuilds = currentProject.builds.length;
        expect(newNumBuilds).to.equal(oldNumBuilds + 1);
      });
    });
    describe("EDIT_BUILD", () => {});
  });
  describe("reducers", () => {});
});
