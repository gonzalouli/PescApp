/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { getTypeParameterOwner } = require("typescript");

describe("Carga el registro adecuadamente", () => {
  beforeEach(() => {
    cy.visit("register");
  });

  it("Carga la pagina login", () => {
    cy.contains("ion-title", "Nuevo usuario");
  });

  it("Funcion atras funciona", () => {
    cy.get(".backButton").click();
    cy.location().should((loc) => expect(loc.pathname).to.eq("/login"));
  });

  it("El formulario es correcto", () => {
    cy.get("ion-item").shadow().get("ion-label").contains("Nombre");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[1]/ion-col/ion-item/ion-input/input'
    ).type("NombreUsuario");

    cy.get("ion-item").shadow().get("ion-label").contains("Apellidos");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[2]/ion-col/ion-item/ion-input/input'
    ).type("ApellidoUsuario");

    cy.get("ion-item").shadow().get("ion-label").contains("Email de registro");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[3]/ion-col/ion-item/ion-input/input'
    ).type("email@email.com");
  });

  it("Podemos escribir, ver y ocultar contraseñas", () => {
    cy.get("ion-item").shadow().get("ion-label").contains("Contraseña");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[4]/ion-col/ion-item/ion-input/input'
    ).type("password");

    cy.get("ion-item").shadow().get("ion-label").contains("Repetir contraseña");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[5]/ion-col/ion-item/ion-input/input'
    ).type("password");

    //Se muestran las contraseñas
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[4]/button'
    ).click();

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[5]/button'
    ).click();

    cy.wait(3000);

    //se ocultan
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[4]/button'
    ).click();

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-grid/ion-row[5]/button'
    ).click();
  });
});
