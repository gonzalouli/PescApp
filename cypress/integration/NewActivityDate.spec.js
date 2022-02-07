describe("Se puede establecer una actividad correctamente", () => {
  const date = new Date();

  const nowDate = date.toISOString();

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
    cy.visit("my/NewActivity/Date");
  });

  it("Agregamos fecha inicio y coincide", () => {
    cy.get(".fechaIni").click();
    cy.get("ion-picker-column").click({ multiple: true });
    cy.xpath('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]/button').click();

    const fecha = `${nowDate.slice(0, 4)} ${nowDate.slice(
      5,
      7
    )} ${nowDate.slice(8, 10)}`;

    cy.get(".fechaIni").shadow().first().should("have.text", fecha);
  });

  it("Agregamos fecha fin y coincide", () => {
    cy.get(".fechaFin").click();
    cy.get("ion-picker-column").click({ multiple: true });
    cy.xpath('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]/button').click();

    const fecha = `${nowDate.slice(0, 4)} ${nowDate.slice(
      5,
      7
    )} ${nowDate.slice(8, 10)}`;

    cy.get(".fechaFin").shadow().first().should("have.text", fecha);
  });

  it("Agregamos hora inicio y coincide", () => {
    cy.get(".horaIni").click();
    cy.get("ion-picker-column").click({ multiple: true });
    cy.xpath('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]/button').click();

    const hora = `${nowDate.slice(11, 14)}`;

    cy.get(".horaIni").shadow().first().should("contains.text", hora);
  });
  it("Agregamos hora fin y coincide", () => {
    cy.get(".horaFin").click();
    cy.get("ion-picker-column").click({ multiple: true });
    cy.xpath('//*[@id="ion-overlay-1"]/div[2]/div[1]/div[2]/button').click();

    const hora = `${nowDate.slice(11, 14)}`;

    cy.get(".horaFin").shadow().first().should("contains.text", hora);
  });
});
