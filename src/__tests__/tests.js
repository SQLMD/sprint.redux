//const chai = require("chai");
const { expect } = require("chai");
const projects = require("../projects");

describe("Projects", () => {
  describe("actions", () => {
    let newProject;
    let newProjectId;
    before(() => {
      newProject = {
        name: "vscode",
        url: "git@github.com:Microsoft/vscode.git",
        buildCommand: "yarn && yarn test",
        language: "JavaScript",
      };
      newProjectId = "5";
    });
    describe("ADD_PROJECT", () => {
      it("should add a project to the state's projects", () => {
        const previousState = projects.store.getState();
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
  });
  describe("reducers", () => {});
});
