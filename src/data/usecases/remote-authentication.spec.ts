import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../test/mock-http-client';

type FixtureTypes = {
	httpPostClient: HttpPostClientSpy;
	remoteAuthentication: RemoteAuthentication;
}

const fixtureAuthentication = (url = 'any'): FixtureTypes => {	
	const httpPostClient = new HttpPostClientSpy();
	const remoteAuthentication = new RemoteAuthentication(url, httpPostClient);

	return {		
		httpPostClient,
		remoteAuthentication
	};
};

describe('RemoteAuthentication', () => {
	test('Deve chamar client HTTP com url correta ', async () => {	
		const url = 'qualquer/url';
		const { httpPostClient, remoteAuthentication } = fixtureAuthentication(url);
		remoteAuthentication.auth();
		expect(httpPostClient.url).toBe(url);
	});
});