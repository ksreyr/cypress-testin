describe("Veterinarios - Crear", () => {
  let id = 0;
  it("Crear un nuevo veterinario", () => {
    cy.request("POST", "http://localhost:9966/petclinic/api/vets", {
      firstName: "John",
      lastName: "Doe",
      specialties: [{ name: "radiology" }],
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      id = response.body.id;
    });
  });
  it("Obtener detalles del veterinario creado", () => {
    cy.request("GET", `http://localhost:9966/petclinic/api/vets/${id}`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body)
          .to.have.property("firstName")
          .and.to.equal("John");
        expect(response.body).to.have.property("lastName").and.to.equal("Doe");
        expect(response.body).to.have.property("specialties");
      }
    );
  });
  it("Elimitar nuevo veterinario creado", () => {
    cy.request("DELETE", `http://localhost:9966/petclinic/api/vets/${id}`).then(
      (response) => {
        expect(response.status).to.eq(204);
      }
    );
  });
  it("comprobar que el veterinario fue eliminado", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:9966/petclinic/api/vets/${id}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
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
  let vetId = 1;
  it("Actualizar un veterinario existente", () => {
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
  it("Validar que el cambio fue hecho", () => {
    cy.request("GET", `http://localhost:9966/petclinic/api/vets/${vetId}`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body)
          .to.have.property("firstName")
          .and.to.equal("Jamess");
        expect(response.body).to.have.property("specialties");
      }
    );
  });
  it("Revertir cambios hechos", () => {
    cy.request("PUT", `http://localhost:9966/petclinic/api/vets/${vetId}`, {
      firstName: "James",
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
        expect(response.body.firstName).to.eq("James");
      }
    );
  });
});
