import {db} from './db.js';

export class User {
    id;

    constructor(id) {
        this.id = id;

        //this exists to bypass the async nature of the constructor
        return (async () => {
            let userInfo = await db.query('SELECT u.*, uf.*, ug.id as groupid, ug.name as groupname FROM auth_user u JOIN user_fields uf ON u.id=uf.id JOIN user_groups ug ON ug.id=uf.group WHERE u.id = ?', [this.id]);
            //console.log(userInfo);
            this.displayName = userInfo[0]?.display_name;
            this.group = {
                "id": userInfo[0]?.groupid,
                "name": userInfo[0]?.groupname,
            }
            this.state = userInfo[0]?.state ?? -1;
            
            return this;
        })();
    }

}