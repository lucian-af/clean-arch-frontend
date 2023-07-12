import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../test/mock-http-client';
import { faker } from '@faker-js/faker';

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
	test('Deve chamar client HTTP com url correta ', async () => {	
		const url = faker.internet.url();
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication(url);
		remoteAuthentication.auth();
		expect(httpPostClient.url).toBe(url);
	});
});