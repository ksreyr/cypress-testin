describe("Read Pets", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/petclinic");
  });
  it("read pets", function () {
    cy.get(":nth-child(2) > .dropdown-toggle").click();
    cy.get(".open > .dropdown-menu > :nth-child(1) > a").click();
    cy.get(":nth-child(1) > .ownerFullName > a").click();
    cy.get(".container > :nth-child(9)").should("have.text", "Pets and Visits");
    cy.get(".dl-horizontal > :nth-child(2)").should("have.text", "Leo");
    cy.get(".dl-horizontal > :nth-child(6)").should("have.text", "cat");
  });
});

describe("Create and Delete Pets", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/petclinic");
  });
  it("Create and Delete pets", function () {
    cy.get(":nth-child(2) > .dropdown-toggle").click();
    cy.get(
      ".open > .dropdown-menu > :nth-child(1) > a > :nth-child(2)"
    ).click();
    cy.get(":nth-child(1) > .ownerFullName > a").click();
    cy.get(".container > :nth-child(5)").should("have.text", "Add New Pet");
    cy.get(".container > :nth-child(5)").click();
    cy.get("#name").clear("P");
    cy.get("#name").type("Pet");
    cy.get(".mat-mdc-button-touch-target").click();
    cy.get(
      ':nth-child(1) > [data-mat-col="0"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content'
    ).click();

    cy.get(".cdk-overlay-backdrop").click();
    cy.get("#type").select("0: Object");
    cy.get('[type="submit"]').click();
    cy.get(
      ':nth-child(2) > .table-striped > tr[_ngcontent-ng-c1922041988=""] > :nth-child(1) > .dl-horizontal > :nth-child(2)'
    ).should("have.text", "Pet");
    cy.get(
      ':nth-child(2) > .table-striped > tr[_ngcontent-ng-c1922041988=""] > :nth-child(1) > .dl-horizontal > .ng-star-inserted'
    ).should("have.text", "cat");
    cy.get(
      ':nth-child(2) > .table-striped > tr[_ngcontent-ng-c1922041988=""] > :nth-child(1) > .dl-horizontal > :nth-child(8)'
    ).should("have.text", "Delete Pet");
    cy.get(
      ':nth-child(2) > .table-striped > tr[_ngcontent-ng-c1922041988=""] > :nth-child(1) > .dl-horizontal > :nth-child(8)'
    ).click();
  });
});
