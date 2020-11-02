import * as bcrypt from 'bcrypt'

export class UserConfig {
    private _password = '123456789';

    private createUser(username: String, password: String, level: Number): Object {
        let hash = bcrypt.hash(password, 10);
        return {
            username,
            password: hash,
            level
        }
    }

    public getData(): any {

        return [
            this.createUser('admin1', '123456789', 1),
            this.createUser('admin2', '123456789', 1),
            this.createUser('thanh', '123456789', 2),
            this.createUser('test', '123456789', 2),
        ]
    }

}