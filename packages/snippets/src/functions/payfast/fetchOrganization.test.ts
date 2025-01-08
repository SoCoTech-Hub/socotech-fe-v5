import { FetchOrganization } from "./fetchOrganization";

jest.mock("../../graphql", () => ({
  runQuery: jest.fn(() =>
    Promise.resolve({
      organization: {
        name: "Test Org",
        primaryColor: "#000000",
        logo: { url: "http://logo.png" },
        logoDark: { url: "http://logo-dark.png" },
        orgName: "Test Organization",
        orgEmail: "org@test.com",
        orgVat: "123456",
        orgUrl: "http://test.com",
        merchantId: "test123",
      },
    }),
  ),
}));

describe("FetchOrganization", () => {
  it("should fetch organization details", async () => {
    const orgDetails = await FetchOrganization("test-id");
    expect(orgDetails.organization.name).toBe("Test Org");
    expect(orgDetails.organization.orgEmail).toBe("org@test.com");
  });
});
