import { test, expect } from "@playwright/test";

test.describe("CBU UNSCH - Navegación y Páginas", () => {
  test("Página de Inicio carga correctamente con las 4 tarjetas", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CBU UNSCH/);

    // Navbar
    await expect(page.getByRole("link", { name: "Oportunidades", exact: true })).toBeVisible();

    // 4ta card
    await expect(page.getByText(/SERVICIO & COMUNIDAD/i)).toBeVisible();
    await expect(page.getByText("Suma experiencia pedagógica real en aula con impacto social.")).toBeVisible();
    await expect(page.getByRole("link", { name: /VER CONVOCATORIA/i })).toBeVisible();
  });

  test("Página Sobre Nosotros carga con textos humanizados", async ({ page }) => {
    await page.goto("/sobre-nosotros");
    await expect(page.getByRole("heading", { name: /Estudiantes de fe/i })).toBeVisible();
    await expect(page.getByText("Un remanente dispuesto al servicio")).not.toBeVisible();
    await expect(page.getByRole("heading", { name: /Bases de nuestra/i })).toBeVisible();
  });

  test("Página Vida Universitaria carga con tres áreas de servicio", async ({ page }) => {
    await page.goto("/vida-universitaria");
    await expect(page.getByText("Tres áreas de servicio")).toBeVisible();
    await expect(page.getByText("Tres frentes de acción")).not.toBeVisible();
  });

  test("Página Oportunidades carga con convocatoria, banner y beneficios", async ({ page }) => {
    await page.goto("/oportunidades");
    await expect(page.getByRole("heading", { name: /Programas de Voluntariado Universitario/i })).toBeAttached();
    const bannerImg = page.getByAltText(/Programas de Voluntariado/i);
    await expect(bannerImg).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "C:/Users/JACK FRANKLIN/.gemini/antigravity/brain/d61124c1-9588-47d6-bfda-24b1df23079a/hero-desktop-full.png",
      clip: { x: 0, y: 0, width: 1280, height: 1100 },
    });

    // Mobile viewport (iPhone 12/13/14: 390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "C:/Users/JACK FRANKLIN/.gemini/antigravity/brain/d61124c1-9588-47d6-bfda-24b1df23079a/hero-mobile-full.png",
      clip: { x: 0, y: 0, width: 390, height: 600 },
    });

    await expect(page.getByText("Comunidad Bíblica Universitaria (CBU UNSCH)")).toBeVisible();
    await expect(page.getByText("Programa de Acompañamiento Pedagógico")).toBeVisible();
    await expect(page.getByText("Convocatoria Abierta • 4 Vacantes")).toBeVisible();
    await expect(page.getByRole("link", { name: /Ver Convocatoria y Postular/i })).toBeVisible();
    await expect(page.getByText("Acción Comunitaria y Seguridad Alimentaria")).toBeVisible();
    await expect(page.getByText("Bolsa de Prácticas Preprofesionales")).toBeVisible();
  });

  test("Página Pide Oración carga correctamente", async ({ page }) => {
    await page.goto("/pide-oracion");
    await expect(page.getByRole("heading", { name: /Comparte tu carga/i })).toBeVisible();
  });
});
