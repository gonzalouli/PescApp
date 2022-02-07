describe("Se puede establecer un equipo correctamente", () => {
  beforeEach(() => {
    cy.visit("login");
    cy.visit("/login");
    // cy.get('[placeholder="Email"]').type('email@email.com')
    // cy.get('[placeholder="Contraseña"]').last().type('contraseña')
    //Podemos escribir user y pass
    cy.get(".form").get(".email").type("email@email.com");
    cy.get(".form").get(".pass").last().type("test1234");
    //Podemos ver el error (si escribimos mal algun campo)

    //los conduce a la siguiente pagina
    cy.get("ion-button").get(".entrar").click({ force: true });

    //se dirige a la pagina home
    cy.location().should((loc) => expect(loc.pathname).to.eq("/my/home"));
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
