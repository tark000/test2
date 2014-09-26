describe("CreditCard", function() {
    it("cleans the number by removing spaces and dashes", function(Advert) {
        expect(Advert.get(417)).toEqual("12345");
    });
});