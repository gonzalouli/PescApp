/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { getTypeParameterOwner } = require("typescript")


describe("Carga el login adecuadamente", ()=>{

    beforeEach(() =>{
        cy.visit('login')
    })

    it('Carga la pagina login', ()=>{
        cy.contains('ion-title', 'PescApp')
    })

    it('Podemos recuperar contraseña', () => {
        cy.get('.links').get('ion-router-link').contains('Olvidaste la contraseña?')
    });

    it("Podemos ir al registro",()=>{
        cy.get('.links').get('ion-router-link').last().shadow().find('a').click({force: true});
    })

    it('Se puede estableder usuario y password', () => {
        // cy.get('[placeholder="Email"]').type('email@email.com')        
        // cy.get('[placeholder="Contraseña"]').last().type('contraseña')
        //Podemos escribir user y pass
        cy.get('.form').get('.email').type('email@email.com') 
        cy.get('.form').get('.pass').last().type('contraseña')
        //Podemos ver el error (si escribimos mal algun campo)
        cy.get('.form').get('.error').should('contain' ,'Error en el inicio de sesion')
        //los conduce a la siguiente pagina
        cy.get('ion-button').get('.entrar').shadow().find('a').click({force: true});
        
        //se dirige a la pagina home
        cy.location().should((loc)=>expect(loc.pathname).to.eq('/my/home'))
    });

    

})

