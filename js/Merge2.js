function nrgsValidator(inputType, input) {
    switch (inputType) {
        case "registerMoney-v1":
            //...
            return;
        case "personalSettings-v1":
            //...
            return;
    }
}
var nrgsValidator;
(function (nrgsValidator) {
    function personalSettingsV1(input) {
        //...
    }
    nrgsValidator.personalSettingsV1 = personalSettingsV1;
    function registerMoneyV1(input) {
        //...
    }
    nrgsValidator.registerMoneyV1 = registerMoneyV1;
})(nrgsValidator || (nrgsValidator = {}));
//# sourceMappingURL=Merge2.js.map