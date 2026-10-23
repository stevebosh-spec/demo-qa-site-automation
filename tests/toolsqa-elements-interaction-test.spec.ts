import { test, expect } from "@playwright/test";

// Hook created below, because all tests navigate to homepage and then click 'Elements' link
test.beforeEach("test", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await page.getByRole("link", { name: "Elements" }).click();
});

test("Text Box fill in the fields and click Submit", async ({ page }) => {
  await page.getByRole("link", { name: "Text Box" }).click();
  await page
    .getByRole("textbox", { name: "Full Name" })
    .fill("This is the full Name test");
  const textbox = page.getByRole("textbox", { name: "Full Name" });
  await expect(textbox).toHaveValue("This is the full Name test");

  await page
    .getByRole("textbox", { name: "name@example.com" })
    .fill("testers@testing.co.uk");
  const emailTextbox = page.getByRole("textbox", { name: "name@example.com" });
  await expect(emailTextbox).toHaveValue("testers@testing.co.uk");

  await page
    .getByRole("textbox", { name: "Current Address" })
    .fill("45 Nowhere Street, Middle of Nowhere, West nobody, CV4 5NL");
  const currentAddressTextbox = page.getByRole("textbox", {
    name: "Current Address",
  });
  await expect(currentAddressTextbox).toHaveValue(
    "45 Nowhere Street, Middle of Nowhere, West nobody, CV4 5NL",
  );

  await page.locator("#permanentAddress").fill("Perm address TEST");
  const permanentAddressTextbox = page.locator("#permanentAddress");
  await expect(permanentAddressTextbox).toHaveValue("Perm address TEST");

  await page.getByRole("button", { name: "Submit" }).click();
});

test("check boxes", async ({ page }) => {
  await page.getByRole("link", { name: "Check Box" }).click();
  await page.getByRole("checkbox", { name: "Select Home" }).click();
  // Add assertion that selection confirmation message is displayed
  await expect(page.locator(':text-is("You have selected :")')).toHaveText(
    "You have selected :",
  );
  await page.locator(".rc-tree-switcher").click();
  await page
    .locator(".rc-tree-switcher.rc-tree-switcher_close")
    .first()
    .click();
});

test("Radio button selection", async ({ page }) => {
  await page.getByRole("link", { name: "Radio Button" }).click();
  await page.getByRole("radio", { name: "Yes" }).click();
  // Add assertion that 'Yes' radio button has been selected
  await expect(page.getByText("You have selected")).toContainText("Yes");
  await page.getByRole("radio", { name: "Impressive" }).click();
  // Add assertion that 'Impressive' radio button has been selected
  await expect(page.getByText("You have selected")).toContainText("Impressive");
});

test.describe("Web tables automation tests", () => {
  test("Search field results", async ({ page }) => {
    await page.getByRole("link", { name: "Web Tables" }).click();

  });

  test("Buttons testing", async ({ page }) => {
    await page.getByRole("link", { name: "Buttons" }).click();
    await page.getByRole("button", { name: "Double Click Me" }).dblclick();
    // Assert the button has been double clicked by confirming the text on the page
    await expect(page.getByText("You have done a double click")).toBeVisible();
    page.reload();
    await page
      .getByRole("button", { name: "Right Click Me" })
      .click({ button: "right" });
    // Assert the button has been double clicked by confirming the text on the page
    await expect(page.getByText("You have done a right click")).toBeVisible();
    page.reload();
    await page.getByRole("button", { name: "Click Me", exact: true }).click();
    // Assert 'click me' button has been clicked by confirming the text on the page
    await expect(page.getByText("You have done a dynamic click")).toBeVisible();
  });

  // NEW TEST !!! - this wont use the hook above, so go to homepage and then select links
  test("Student Reg' form E2E test - has text fields, radio buttons, checkboxes, date pickers, file uploads and dropdown menus", async ({
    page,
  }) => {
    await page.goto("https://demoqa.com/");
    await page.getByRole("link", { name: "Elements" }).click();
    await page.getByText("Forms").click();
    await page.getByRole("link", { name: "Practice Form" }).click();
    // Assert correct page has loaded by header text -
    await expect(page.getByText("Student Registration Form")).toBeVisible();

    await page
      .getByRole("textbox", { name: "First Name" })
      .fill("FIRST_NAME_TESTING");
    await page
      .getByRole("textbox", { name: "Last Name" })
      .fill("LAST_NAME_TESTING");
    // Assert values have been entered and are displaying
    await expect(page.locator('[id="firstName"]')).toHaveValue(
      "FIRST_NAME_TESTING",
    );
    await expect(page.locator('[id="lastName"]')).toHaveValue(
      "LAST_NAME_TESTING",
    );
    await page
      .getByRole("textbox", { name: "name@example.com" })
      .fill("thisisanemailtest@tester.com");
    // Assert text entered into email field is displaying
    await expect(page.locator('[id="userEmail"]')).toHaveValue(
      "thisisanemailtest@tester.com",
    );
    // radio button selector - ensure all options can be selected...then, pick final one
    await page.getByRole("radio", { name: "Male", exact: true }).click();
    await page.getByRole("radio", { name: "Female", exact: true }).click();
    await page.getByRole("radio", { name: "Other", exact: true }).click();
    await page.getByRole("radio", { name: "Male", exact: true }).click();

    // Mobile Phone Number - fill in with 10 digits !
    await page
      .getByRole("textbox", { name: "Mobile Number" })
      .pressSequentially("01206524111", { delay: 500 });

    // DATE PICKER !!!....used the playwright tool " Record new " to record the clicks !
    await page.locator("#dateOfBirthInput").click();
    await page.getByRole('combobox').nth(1).selectOption('1983');
    await page.getByRole('gridcell', { name: 'Choose Monday, October 10th,' }).click();

    // Subjects - enter some text
    
  });
});
