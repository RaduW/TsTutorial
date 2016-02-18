function nrgsValidator(inputType: string, input: string): void {
    switch (inputType) {
        case "registerMoney-v1":
            //...
            return;
        case "personalSettings-v1":
            //...
            return;
    }
}

module nrgsValidator {
    export function personalSettingsV1(input: string): void {
        //...
    }
    export function registerMoneyV1(input: string): void {
        //...
    }
}
