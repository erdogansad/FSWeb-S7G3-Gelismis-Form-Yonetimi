
describe('Form Testi', () => { 
    beforeEach(() => cy.visit("/"))

    it("İsim girdisi hata kontrolü", () => {
        cy.get("[data-test-id=isim]")
            .type("John")
            .should("have.value", "John")
            .clear()
            .should("have.value", "")
            .siblings(".invalid-feedback").should("be.visible")
    })

    it("Soyisim girdisi hata kontrolü", () => {
        cy.get("[data-test-id=soyisim]")
            .type("Doe")
            .should("have.value", "Doe")
            .clear()
            .should("have.value", "")
            .siblings(".invalid-feedback").should("be.visible")
    })

    it("E-posta girdisi hata kontrolü", () => {
        cy.get("[data-test-id=eposta]")
            .type("john.doe@mail.com")
            .should("have.value", "john.doe@mail.com")
            .clear()
            .should("have.value", "")
            .siblings(".invalid-feedback").should("be.visible")
    })

    it("Şifre girdisi hata kontrolü", () => {
        cy.get("[data-test-id=sifre]")
            .type("johNdOe")
            .should("have.value", "johNdOe")
            .clear()
            .should("have.value", "")
            .siblings(".invalid-feedback").should("be.visible")
    })
    it("Kullanım koşulları girdisi hata kontrolü", () => {
        cy.get("[data-test-id=tos]")
            .check()
            .should("be.checked")
            .uncheck()
            .siblings(".invalid-feedback").should("be.visible")
    })
    it("Kayıt düğmesi kontrolü & Form gönderimi", () => {
        cy.get("[data-test-id=isim]")
            .type("John")
            .should("have.value", "John")

        cy.get("[data-test-id=eposta]")
            .type("john.doe@mail.com")
            .should("have.value", "john.doe@mail.com")

        cy.get("[data-test-id=sifre]")
            .type("johNdOe")
            .should("have.value", "johNdOe")

        cy.get("[data-test-id=tos]")
            .check()
            .should("be.checked")  

        cy.get("[type=submit]")
            .should("be.disabled");

        cy.get("[data-test-id=soyisim]")
            .type("Doe")
            .should("have.value", "Doe");
        
        cy.get("[type=submit]")
            .should("not.be.disabled")
            .click()
            .get("[data-test-id=successText]")
            .should("be.visible");
    })
 })