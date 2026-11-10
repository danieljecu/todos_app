describe("Sentry", () => {
  const original = process.env.SENTRY_DSN;

  afterAll(() => {
    if (original === undefined) {
      delete process.env.SENTRY_DSN;
    } else {
      process.env.SENTRY_DSN = original;
    }
    jest.resetModules();
  });

  it("does nothing and does not throw when SENTRY_DSN is missing", () => {
    delete process.env.SENTRY_DSN;
    jest.resetModules();

    expect(() => {
      jest.requireActual("../instrument");
    }).not.toThrow();
  });
});
