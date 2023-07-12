import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../test/mock-http-client';
import { faker } from '@faker-js/faker';
import { mockAuthentication } from '../../domain/test/mock-authentication';

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
		remoteAuthentication.auth(mockAuthentication());
		expect(httpPostClient.url).toBe(url);
	});
	
	test('Deve chamar HttpPostClient com body correto', async () => {			
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication();
		const params = mockAuthentication();
		remoteAuthentication.auth(params);
		expect(httpPostClient.body).toEqual(params);
	});
});