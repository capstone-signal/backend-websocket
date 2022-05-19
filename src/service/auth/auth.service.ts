import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { verify } from "jsonwebtoken";

@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService
	) {}

	public validateToken(token: string): number {
		const secret = this.configService.get('JWT_SECRET');
		const decoded = verify(token, secret);
		return parseInt(decoded['userId'], 10);
	}
}