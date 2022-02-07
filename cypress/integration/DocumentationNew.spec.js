const { verify } = require("crypto");

describe("Se puede establecer acciones de nueva documentacion", () => {
  beforeEach(() => {
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
    cy.visit("my/Documentation");
    cy.visit("my/Documentation/NewDocumentation");
  });

  it("Agregamos imagen", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      cy.get(".image").shadow().get("img").click();
      cy.xpath(
        '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[1]/ion-input/input'
      ).type("Nombre");

      cy.xpath(
        '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[3]/ion-select'
      ).click();
      cy.xpath('//*[@id="alert-input-1-0"]').click();

      cy.xpath('//*[@id="ion-overlay-1"]/div[2]/div[4]/button[2]').click();

      cy.get(".save").click({ multiple: true });
    });
  });
});
