describe("Se puede establecer una actividad correctamente", () => {
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
    cy.on("uncaught:exception", (err, runnable) => {
      cy.xpath(
        '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[3]'
      ).click();

      cy.location().should((loc) =>
        expect(loc.pathname).to.eq("/my/NewActivity/Catch")
      );
    });
  });

  it("Fechas path", () => {
    //Fechas
    cy.on("uncaught:exception", (err, runnable) => {
      cy.xpath(
        '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[4]'
      ).click();

      cy.location().should((loc) =>
        expect(loc.pathname).to.eq("/my/NewActivity/Date")
      );
    });
  });
});
