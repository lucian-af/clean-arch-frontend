import { RemoteAuthentication } from '@data/usecases/remote-authentication';
import { faker } from '@faker-js/faker';
import { mockAccountModel, mockAuthentication } from '@domain/test/mock-account';
import { HttpPostClientSpy } from '@tests/data/mocks/mock-http-client';
import { HttpStatusCode } from '@data/protocols/http/http-response';
import { InvalidCredentialsError } from '@domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@domain/errors/unexpected-error';
import { AuthenticationParams } from '@domain/usecases/authentication';
import { AccountModel } from '@domain/models/account-model';

type FixtureTypes = {
	httpPostClient: HttpPostClientSpy<AuthenticationParams, AccountModel>;
	remoteAuthentication: RemoteAuthentication;
}

const fixtureAuthentication = (url: string = faker.internet.url()): FixtureTypes => {	
	const httpPostClient = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
	const remoteAuthentication = new RemoteAuthentication(url, httpPostClient);

	return {		
		httpPostClient,
		remoteAuthentication
	};
};

describe('RemoteAuthentication', () => {
	test('Deve chamar HttpPostClient com url correta', async () => {	
		const url = faker.internet.url();
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication(url);
		await remoteAuthentication.auth(mockAuthentication());
		expect(httpPostClient.url).toBe(url);
	});
	
	test('Deve chamar HttpPostClient com body correto', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		const params = mockAuthentication();
		await remoteAuthentication.auth(params);
		expect(httpPostClient.body).toEqual(params);
	});
	
	test('Deve retornar "InvalidCredentialError" se HttpPostClient retornar statusCode 401', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		httpPostClient.response = {
			statusCode: HttpStatusCode.unauthorized
		};
		const params = mockAuthentication();
		const request = remoteAuthentication.auth(params);
		await expect(request).rejects.toThrow(new InvalidCredentialsError());
		await expect(request).rejects.toThrow('Credenciais inválidas.');
	});
	
	test('Deve retornar "UnexpectedError" se HttpPostClient retornar statusCode 400', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		httpPostClient.response = {
			statusCode: HttpStatusCode.badRequest
		};
		const params = mockAuthentication();
		const request = remoteAuthentication.auth(params);
		await expect(request).rejects.toThrow(new UnexpectedError());
		await expect(request).rejects.toThrow('Algo de errado aconteceu. Tente novamente.');
	});
	
	test('Deve retornar "UnexpectedError" se HttpPostClient retornar statusCode 404', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		httpPostClient.response = {
			statusCode: HttpStatusCode.notFound
		};
		const params = mockAuthentication();
		const request = remoteAuthentication.auth(params);
		await expect(request).rejects.toThrow(new UnexpectedError());
		await expect(request).rejects.toThrow('Algo de errado aconteceu. Tente novamente.');
	});
	
	test('Deve retornar "UnexpectedError" se HttpPostClient retornar statusCode 500', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		httpPostClient.response = {
			statusCode: HttpStatusCode.internalServerError
		};
		const params = mockAuthentication();
		const request = remoteAuthentication.auth(params);
		await expect(request).rejects.toThrow(new UnexpectedError());
		await expect(request).rejects.toThrow('Algo de errado aconteceu. Tente novamente.');
	});
	
	test('Deve retornar AccountModel se HttpPostClient retornar statusCode 200', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		const httpResponse: AccountModel = mockAccountModel();
		httpPostClient.response = {
			statusCode: HttpStatusCode.ok,
			body: httpResponse
		};		
		const request = await remoteAuthentication.auth(mockAuthentication());
		expect(request).toEqual(httpResponse);
	});
});