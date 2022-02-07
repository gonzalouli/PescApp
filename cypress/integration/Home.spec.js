describe("Carga el home adecuadamente", () => {
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
  });

  it("Estan todas las opciones", () => {
    cy.get(".container-home").get(".main-button").contains("Nueva Actividad");
    cy.get(".container-home").get(".main-button").contains("Mis Actividades");
    cy.get(".container-home").get(".main-button").contains("Tiempo y Mareas");
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
      expect(loc.pathname).to.eq("/my/MeteorologyOrTide")
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
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[3]'
    ).click({
      force: true,
    });
    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/MeteorologyOrTide")
    );

    //Notificaciones
    cy.visit("my/home");
    cy.xpath(
      '//*[@id="root"]/ion-app/div/ion-content/ion-list/ion-button[5]'
    ).click({
      force: true,
    });
    cy.location().should((loc) =>
      expect(loc.pathname).to.eq("/my/Notifications")
    );
  });
});
