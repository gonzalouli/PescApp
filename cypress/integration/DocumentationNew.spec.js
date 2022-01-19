describe("Se puede establecer acciones de nuwva documentacion", () => {
  beforeEach(() => {
    cy.visit("my/home");
    cy.visit("my/Documentation");
    cy.visit("my/Documentation/NewDocumentation");
  });

  it("Agregamos imagen", () => {
    cy.get(".image").shadow().get("img").click();
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[1]/ion-input/input'
    ).type("Nombre");

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[3]/ion-textarea/div/textarea'
    ).type("Descripcion de imagen");
    cy.get(".saveAndNew").click();
  });

  it("Borramos imagen", () => {
    cy.get(".image").shadow().get("img").click();
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[1]/ion-input/input'
    ).type("Nombre");

    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list[1]/ion-item[3]/ion-textarea/div/textarea'
    ).type("Descripcion de imagen");
    cy.get(".saveAndNew").click();

    cy.get(".delete").click();
  });
});
