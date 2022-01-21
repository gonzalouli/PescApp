describe("Carga el home adecuadamente", () => {
  beforeEach(() => {
    cy.visit("my/home");
  });

  it("Estan todas las opciones", () => {
    cy.get(".container-home").get(".main-button").contains("Nueva Actividad");
    cy.get(".container-home").get(".main-button").contains("Mis Actividades");
    cy.get(".container-home").get(".main-button").contains("Meteorología");
    cy.get(".container-home").get(".main-button").contains("Especies");
    cy.get(".container-home").get(".main-button").contains("Documentación");
    cy.get(".container-home").get(".main-button").contains("Notificaciones");

    cy.get(".miperfilbutton").contains("Mi Perfil");
    cy.get(".logoutbutton");
  });

  it("Mi perfil path", () => {
    //MiPerfil
    cy.on("uncaught:exception", (err, runnable) => {
      cy.get(".miperfilbutton").click({ multiple: true });
      // cy.location().should((loc) => expect(loc.pathname).to.eq("/my/profile"));
    });
  });

  it("Logout path", () => {
    //LogOut
    cy.xpath('//*[@id="root"]/ion-app/div/div/ion-header/ion-button[2]').click({
      force: true,
    });

    cy.location().should((loc) => expect(loc.pathname).to.eq("/login"));
  });

  it("Pathing features", () => {
    //Nueva actividad
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[1]'
    ).click({
      force: true,
    });

    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/NewActivity")
    );

    //Mis actividades
    cy.visit("my/home");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[2]'
    ).click({
      force: true,
    });
    //cy.location().should((loc) => expect(loc.pathname).to.eq("/my/Activities"));

    //Meteorologia
    cy.visit("my/home");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[3]'
    ).click({
      force: true,
    });
    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/Meteorology")
    );

    //Meteorologia
    cy.visit("my/home");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[4]'
    ).click({
      force: true,
    });
    // cy.location().should((loc) =>
    //   expect(loc.pathname).to.eq("/my/Especies")
    // );

    //Meteorologia
    cy.visit("my/home");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[5]'
    ).click({
      force: true,
    });
    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/Documentation")
    );

    //Notificaciones
    cy.visit("my/home");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[6]'
    ).click({
      force: true,
    });
    // cy.location().should((loc) =>
    //   expect(loc.pathname).to.eq("/my/Notifications")
    // );
  });
});
