describe("Veterinarios - Crear", () => {
  it("Crear un nuevo veterinario", () => {
    cy.request("POST", "http://localhost:9966/petclinic/api/vets", {
      firstName: "John",
      lastName: "Doe",
      specialties: [{ name: "radiology" }],
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
    });
  });
});

describe("Veterinarios - Leer", () => {
  it("Obtener detalles de un veterinario específico", () => {
    const vetId = 1;
    cy.request("GET", `http://localhost:9966/petclinic/api/vets/${vetId}`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("firstName");
        expect(response.body).to.have.property("lastName");
        expect(response.body).to.have.property("specialties");
      }
    );
  });
});

describe("Veterinarios - Actualizar", () => {
  it("Actualizar un veterinario existente", () => {
    const vetId = 1;
    cy.request("PUT", `http://localhost:9966/petclinic/api/vets/${vetId}`, {
      firstName: "Jamess",
      lastName: "Carter",
      specialties: [{ name: "radiology" }],
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
    cy.request("GET", `http://localhost:9966/petclinic/api/vets/${vetId}`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("firstName");
        expect(response.body).to.have.property("lastName");
        expect(response.body).to.have.property("specialties");
        expect(response.body.firstName).to.eq("Jamess");
      }
    );
  });
});

describe("Veterinarios - Delete", () => {
  it("Actualizar un veterinario existente", () => {
    const vetId = 1;
    // cy.request("DELETE", `http://localhost:9966/petclinic/api/vets/${vetId}`).then((response) => {
    //   expect(response.status).to.eq(204);
    // });
  });
});
