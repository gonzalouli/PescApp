describe("Se puede establecer un equipo correctamente", () => {
  beforeEach(() => {
    cy.visit("my/home");
    cy.visit("my/NewActivity");
    cy.visit("my/NewActivity/Tackle");
  });

  it("Podemos agregar un equipo", () => {
    cy.get(".addInput").type("Shimano");
    cy.get(".buttonAdd").click();
  });

  it("Se agregar un equipo correctamente", () => {
    cy.get(".addInput").type("Shimano");
    cy.get(".buttonAdd").click();

    cy.get(".labelName").contains("Shimano");
  });

  it("Borramos un equipo correctamente", () => {
    cy.get(".addInput").type("Shimano");
    cy.get(".buttonAdd").click();

    cy.get("svg").click({ multiple: true, force: true });

    cy.get(".labelName").should("not.exist");
  });
});
