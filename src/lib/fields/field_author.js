import {field} from "../field.js";
import '../string.js';

export class field_author extends field {
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
            <input type="hidden" name="${this.schema.COLUMN_NAME.toLowerCase()}" value="${this.data}" required>
        `;
        return html;
    }
}