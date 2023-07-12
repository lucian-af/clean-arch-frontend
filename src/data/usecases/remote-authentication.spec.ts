import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../test/mock-http-client';

describe('RemoteAuthentication', () => {
	test('Deve chamar client HTTP com url correta ', async () => {	
		const url = 'qualquer/url';
		const httpPostClient = new HttpPostClientSpy();
		const remoteAuthentication = new RemoteAuthentication(url, httpPostClient);
		remoteAuthentication.auth();
		expect(httpPostClient.url).toBe(url);
	});
});