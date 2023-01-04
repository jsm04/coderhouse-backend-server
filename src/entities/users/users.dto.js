export class UserPostDTO {
	constructor(payload) {
		this.name = payload.name;
		this.lastname = payload.lastname;
		this.username = payload.username;
		this.email = payload.email;
		this.password = payload.password;
	}
}
