//const chai = require("chai");
const { expect } = require("chai");
const projects = require("../projects");

describe("Projects", () => {
  describe("actions", () => {
    describe("ADD_PROJECT", () => {
      it("should add a project to the state's projects", () => {
        const previousState = projects.store.getState();
        const previousNumProjects = Object.keys(previousState.projects).length;
        //add a project
        const projectToAdd = {
          name: "vscode",
          url: "git@github.com:Microsoft/vscode.git",
          buildCommand: "yarn && yarn test",
          language: "JavaScript",
        };
        const newId = "5";
        const action = projects.addProject(newId, projectToAdd);
        projects.store.dispatch(action);
        //size = size plus one
        const currentState = projects.store.getState();
        const currentNumProjects = Object.keys(currentState.projects).length;
        expect(currentNumProjects).to.equal(previousNumProjects + 1);
        //includes recently added project
        expect(currentState.projects[newId]).to.deep.equal({
          ...projectToAdd,
          id: newId,
        });
      });
    });
  });
  describe("reducers", () => {});
});
