/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe("Carga el login adecuadamente", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("Carga la pagina login", () => {
    cy.contains("ion-title", "PescApp");
  });

  it("Podemos recuperar contraseña", () => {
    cy.get("ion-button").contains("Olvidaste la contraseña?");
  });

  it("Podemos ir a la recuperacion de contraseña", () => {
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[2]/ion-item[1]/ion-button'
    ).click();

    cy.location().should((loc) => expect(loc.pathname).to.eq("/forgotPass"));
  });

  it("Podemos ir al registro", () => {
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[2]/ion-item[2]/ion-button'
    ).click({ force: true });
    cy.location().should((loc) => expect(loc.pathname).to.eq("/register"));
  });

  it("Se puede estableder usuario y password", () => {
    // cy.get('[placeholder="Email"]').type('email@email.com')
    // cy.get('[placeholder="Contraseña"]').last().type('contraseña')
    //Podemos escribir user y pass
    cy.get(".form").get(".email").type("email@email.com");
    cy.get(".form").get(".pass").last().type("contraseña");
    //Podemos ver el error (si escribimos mal algun campo)
    cy.get(".form")
      .get(".error")
      .should("contain", "Error en el inicio de sesion");
    //los conduce a la siguiente pagina
    cy.get("ion-button").get(".entrar").click({ force: true });

    //se dirige a la pagina home
    cy.location().should((loc) => expect(loc.pathname).to.eq("/my/home"));
  });
});
