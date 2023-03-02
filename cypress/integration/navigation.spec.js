/* eslint-disable */
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.get("li").contains("[data-testid=day]", "Tuesday").click();
    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgba(0, 0, 0, 0)");
  });
});

