import { IHttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
	test('Deve chamar client HTTP com url correta ', async () => {
		class HttpPostClientSpy implements IHttpPostClient {
			url?:string;

			async post(url: string): Promise<void> {
				this.url = url;
				return Promise.resolve();
			}

		}

		const url = 'qualquer/url';
		const httpPostClient = new HttpPostClientSpy();
		const remoteAuthentication = new RemoteAuthentication(url, httpPostClient);
		remoteAuthentication.auth();
		expect(httpPostClient.url).toBe(url);
	});
});