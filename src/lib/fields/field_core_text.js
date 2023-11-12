import {field} from "../field.js";
import '../string.js';

export class field_core_text extends field {
    schema;
    data;

    constructor (schema, data) {
        super();

        this.schema = schema;
        this.data = data;
    }

    generate() {
        //console.log("hii");
        let html = `
            <label for="${this.schema.COLUMN_NAME.toLowerCase()}">${this.schema.COLUMN_NAME.ucwords()}</label>
            <input class="input" type="text" name="${this.schema.COLUMN_NAME.toLowerCase()}" value="${this.data}" required>
        `;
        return html;
    }
}