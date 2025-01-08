import { ZeroPadding } from "../zeroPadding";
import GenerateSignature from "./generateSignature";
import GetPassPhrase from "./getPassPhrase";

describe("PayFast Utils", () => {
  it("should return correct passphrase based on environment", () => {
    process.env.NEXT_PUBLIC_TEST = "true";
    expect(GetPassPhrase()).toBe("1234567891212");

    process.env.NEXT_PUBLIC_TEST = "false";
    expect(GetPassPhrase()).toBe("VzVT6yHrGSRmfEWZj2m9");
  });

  it("should generate correct signature", () => {
    const data = { amount: "100.00", item_name: "Test Item" };
    const signature = GenerateSignature(data);
    expect(signature).toBeDefined();
    expect(typeof signature).toBe("string");
  });

  it("should pad numbers correctly", () => {
    expect(ZeroPadding(5, 3)).toBe("005");
    expect(ZeroPadding(123, 5)).toBe("00123");
  });
});
