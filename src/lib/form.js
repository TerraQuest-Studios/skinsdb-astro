/* import.meta.glob('./fields/*.js'); */

export class form {
    schema;
    data;
    endPoint;

    constructor (schema, data, endPoint) {
        this.schema = schema;
        this.data = data;
        this.endPoint = endPoint;
    }

    async generate () {
        let html = `
            <form action="${this.endPoint}" method="POST">
        `;
        for(const item of this.schema){
            //maybe there is a better way of doing this? not sure
            try {
                let field = await import(`./fields/field_${item.COLUMN_NAME}.js`);
                let fieldInstance = new field[`field_${item.COLUMN_NAME}`](item, this.data[item.COLUMN_NAME]);
                html += await fieldInstance.generate();
                html += "<br><br>";
            } catch(e) {
                //console.log(e);
                console.log(`failed to load ${item.COLUMN_NAME}`);
            }
        }
        html += `
            <input class="button is-primary" type="submit" value="Submit">
            </form>
        `;
        return html;
    }
}