describe("Create and Delete Vet", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/petclinic/vets");
  });

  it("create new and delete vet", () => {
    cy.get(".container > :nth-child(3) > :nth-child(2)").click();
    cy.get("#firstName").clear("t");
    cy.get("#firstName").type("test");
    cy.get("#lastName").clear("l");
    cy.get("#lastName").type("lasttest");
    cy.get("#specialties").select("0: Object");
    cy.get('[type="submit"]').click();

    cy.get(":nth-child(7) > :nth-child(1)").should("be.visible");

    cy.contains("td", "test lasttest")
      .parent("tr")
      .within(() => {
        cy.get("button").contains("Edit Vet").should("exist");
        cy.get("button").contains("Delete Vet").should("exist");
      });
    cy.get(":nth-child(7) > :nth-child(1)").should(
      "have.text",
      " test lasttest "
    );
    cy.get(":nth-child(7) > :nth-child(3) > :nth-child(2)").click();
  });
});

describe("Edit vet", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/petclinic/vets");
  });

  it("edit", () => {
    cy.get(":nth-child(6) > :nth-child(1)").should(
      "have.text",
      " Sharon Jenkins "
    );
    cy.get(":nth-child(6) > :nth-child(3) > :nth-child(1)").click();
    cy.get("#lastName").clear("Jenkinss");
    cy.get("#lastName").type("Jenkinss");
    cy.get("#firstName").clear("Sharonn");
    cy.get("#firstName").type("Sharonn");
    cy.get(".mat-mdc-form-field-infix").click();
    cy.get("#mat-option-1 > .mat-pseudo-checkbox").click();
    cy.get(".cdk-overlay-backdrop").click();
    cy.get('[type="submit"]').click();
    cy.get(":nth-child(6) > :nth-child(1)").should(
      "have.text",
      " Sharonn Jenkinss "
    );
    cy.get(":nth-child(6) > :nth-child(2) > .ng-star-inserted").should(
      "have.text",
      " surgery "
    );
    cy.get(":nth-child(6) > :nth-child(3) > :nth-child(1)").click();
    cy.get("#lastName").clear("Jenkins");
    cy.get("#lastName").type("Jenkins");
    cy.get("#firstName").clear("Sharon");
    cy.get("#firstName").type("Sharon");
    cy.get("#mat-select-value-3").click();
    cy.get("#mat-option-4 > .mat-pseudo-checkbox").click();
    cy.get(".cdk-overlay-backdrop").click();
    cy.get('[type="submit"]').click();
    cy.get(":nth-child(6) > :nth-child(1)").should(
      "have.text",
      " Sharon Jenkins "
    );
  });
});

describe("read Vet", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/petclinic/vets");
  });

  it("readAllVets", function () {
    cy.get(":nth-child(3) > .dropdown-toggle").click();
    cy.get(".open > .dropdown-menu > :nth-child(1) > a").click();
    cy.get("tbody > :nth-child(1) > :nth-child(1)").should(
      "have.text",
      " James Carter "
    );
    cy.get("tbody > :nth-child(2) > :nth-child(1)").should(
      "have.text",
      " Helen Leary "
    );
    cy.get("tbody > :nth-child(3) > :nth-child(1)").should(
      "have.text",
      " Linda Douglas "
    );
    cy.get("tbody > :nth-child(5) > :nth-child(1)").should(
      "have.text",
      " Henry Stevens "
    );

    cy.get("tbody > :nth-child(2) > :nth-child(2) > div").should(
      "have.text",
      " radiology "
    );
    cy.get("tbody > :nth-child(3) > :nth-child(2) > :nth-child(1)").should(
      "have.text",
      " dentistry "
    );
    cy.get(":nth-child(4) > :nth-child(2) > div").should(
      "have.text",
      " surgery "
    );
    cy.get(":nth-child(5) > :nth-child(2) > div").should(
      "have.text",
      " radiology "
    );
    cy.get("tbody > :nth-child(1) > :nth-child(3) > :nth-child(1)").should(
      "have.text",
      "Edit Vet"
    );
    cy.get("tbody > :nth-child(1) > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "Delete Vet"
    );
    cy.get("tbody > :nth-child(2) > :nth-child(3) > :nth-child(1)").should(
      "have.text",
      "Edit Vet"
    );
    cy.get("tbody > :nth-child(2) > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "Delete Vet"
    );
    cy.get(":nth-child(3) > :nth-child(3) > :nth-child(1)").should(
      "have.text",
      "Edit Vet"
    );
    cy.get(":nth-child(3) > :nth-child(3) > :nth-child(2)").should(
      "have.text",
      "Delete Vet"
    );
  });
});
