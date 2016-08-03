/// <reference path="../node_modules/@types/lodash/index.d.ts" />

import * as _ from "lodash";

function hello(name: string): string {
    let message = _.padStart("Hello " + name + "!", 25);
    return message;
}

let message = hello("TypeScript");
console.log(message);
