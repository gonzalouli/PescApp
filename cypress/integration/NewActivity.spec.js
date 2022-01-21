describe("Se puede establecer una actividad correctamente", () => {
  beforeEach(() => {
    cy.visit("login");
    cy.visit("my/home");

    cy.visit("my/NewActivity");
  });

  it("Se define el nombre", () => {
    cy.get(".native-input").focus().type("NombreEjemplo");
  });

  it("Localization path", () => {
    //LOCALIZACION

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[1]'
    ).click();

    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/NewActivity/Localization")
    );
  });

  it("Equipo path", () => {
    //Equipo
    cy.on("uncaught:exception", (err, runnable) => {
      cy.xpath(
        '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[2]'
      ).click();

      cy.location().should((loc) =>
        expect(loc.pathname).to.eq("/my/NewActivity/Tackle")
      );
    });
  });

  it("Capturas path", () => {
    //Capturas

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[3]'
    ).click();

    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/NewActivity/Catch")
    );
  });

  it("Fechas path", () => {
    //Fechas

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[4]'
    ).click();

    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/NewActivity/Date")
    );
  });
});
