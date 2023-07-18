import { RemoteAuthentication } from '@data/usecases/remote-authentication';
import { faker } from '@faker-js/faker';
import { mockAuthentication } from '@domain/test/mock-authentication';
import { HttpPostClientSpy } from '@tests/data/mocks/mock-http-client';
import { HttpStatusCode } from '@data/protocols/http/http-response';
import { InvalidCredentialsError } from '@domain/errors/invalid-credentials-error';

type FixtureTypes = {
	httpPostClient: HttpPostClientSpy;
	remoteAuthentication: RemoteAuthentication;
}

const fixtureAuthentication = (url: string = faker.internet.url()): FixtureTypes => {	
	const httpPostClient = new HttpPostClientSpy();
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
	
	test('Deve retornar "InvalidCredentialError" se HttpPostClient retornar statusCode 401 ', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		httpPostClient.response = {
			statusCode: HttpStatusCode.unauthorized
		};
		const params = mockAuthentication();
		const request = remoteAuthentication.auth(params);
		await expect(request).rejects.toThrow(new InvalidCredentialsError());
		await expect(request).rejects.toThrow('Credenciais inválidas.');
	});
});