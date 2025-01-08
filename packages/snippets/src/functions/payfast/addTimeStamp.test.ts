import AddTimeStamp from "./addTimeStamp";

describe("AddTimeStamp", () => {
  it("should return a formatted timestamp", () => {
    const timestamp = AddTimeStamp();
    expect(timestamp).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );
  });
});
