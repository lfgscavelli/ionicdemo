import { SQLite, SQLiteObject } from '@ionic-native/sqlite'; 

export class db {

    public database: SQLiteObject;
	public data: any = [];

    constructor( private sqlite: SQLite ) {}

    ionViewDidEnter(){
        console.log('view did enter');
            this.sqlite.create({
                name: "newportal.db", 
                location: "default"}).then((db : SQLiteObject) => {
                    this.database = db;
                    this.createTable();
                }, (error) => {
                    console.log("ERROR: ", error);
            });
    }

    createTable() {
        this.database.executeSql(`CREATE TABLE IF NOT EXISTS articles(
            id INTEGER PRIMARY KEY,
            title TEXT, 
            date TEXT, 
            type TEXT, 
            description TEXT)`, {})
            .then(() => {
                console.log('Table created !');
            })
            .catch(e => console.log(e));
    }

    public insert(n,t){
        this.database.executeSql("INSERT INTO articles (name, description) VALUES (?,?)", [n,t])
            .then((data) => {
                console.log("INSERTED: " + JSON.stringify(data));
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error.err));
        });
    }

    public update(id, txt) {
        var query = "UPDATE articles SET todoItem=?  WHERE id=?";
        this.database.executeSql(query, [txt, id])
            .then(res => {
                console.log('Update Success...', res);
            })
            .catch(error => console.log('Updating Error', error));
    };

    public all() {
        this.database.executeSql("SELECT * FROM articles", [])
        .then((data) => {
			return this.setRow(data);
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    };

    public getById(id) {
        this.database.executeSql('SELECT * FROM people WHERE id = ?', [id])
            .then((data) => {
                return this.setRow(data);
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
        });
    };

    public delete(id) {
        this.database.executeSql('DELETE FROM articles WHERE id=?', [id])
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }

    private setRow(data) {
        this.data = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
                this.data.push({
                    id: data.rows.item(i).id,
                    title: data.rows.item(i).title,
                    date: data.rows.item(i).date,
                    type: data.rows.item(i).type,
                    description: data.rows.item(i).description
                });
            }
        }
    };


}