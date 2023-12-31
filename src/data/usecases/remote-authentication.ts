import { HttpStatusCode, IHttpPostClient } from '@data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import { IAuthentication, AuthenticationParams } from '@domain/usecases';

export class RemoteAuthentication implements IAuthentication {
	constructor(private readonly url: string, private readonly httpClient: IHttpPostClient<AuthenticationParams, AccountModel>){}

	async auth(params: AuthenticationParams): Promise<AccountModel>{
		const httpResponse = await this.httpClient.post({
			url: this.url,
			body: params
		});		

		switch (httpResponse.statusCode) {
		case HttpStatusCode.ok:
			return httpResponse.body;
		case HttpStatusCode.unauthorized:
			throw new InvalidCredentialsError();				
		default:
			throw new UnexpectedError();
		}
	}
}