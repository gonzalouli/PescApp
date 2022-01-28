describe("Se puede establecer acciones de capturas", () => {
  beforeEach(() => {
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
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-grid/ion-row/ion-col[2]/ion-item/ion-button'
    ).click();
  });
});
