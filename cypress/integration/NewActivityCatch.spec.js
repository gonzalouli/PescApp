describe("Se puede establecer acciones de capturas", () => {
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
    cy.visit("my/NewActivity");
    cy.visit("my/NewActivity/Catch");
  });

  it("Agregamos imagen", () => {
    cy.get(".image").shadow().get("img").click();
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[1]/ion-input/input'
    ).type("Nombre");

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[3]/ion-textarea/div/textarea'
    ).type("Descripcion de imagen");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-grid/ion-row/ion-col/ion-item/ion-button'
    ).click();
  });
});
