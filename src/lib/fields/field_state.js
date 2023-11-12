import {field} from "../field.js";

export class field_state extends field {
    schema;
    data;

    constructor (schema, data) {
        super();

        this.schema = schema;
        this.data = data;
    }

    generate() {
        let html = `
            <label for="${this.schema.COLUMN_NAME.toLowerCase()}">${this.schema.COLUMN_NAME.ucwords()}</label>
            <br>
            <div class="select" required>
                <select name="${this.schema.COLUMN_NAME.toLowerCase()}">
                    <option value="1" ${this.data==1 ? "selected" : ""}>Enabled</option>
                    <option value="0" ${this.data==0 ? "selected" : ""}>Disabled</option>
                </select>
            </div>
        `;
        return html;
    }
}