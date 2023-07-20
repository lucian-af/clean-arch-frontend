import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from '@infra/http/axios-http-client';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
	test('Deve executar axios com URL correta', () => {
		const httpClient = new AxiosHttpClient();
		const url = faker.internet.url();
		httpClient.post({url, body: ''});
		expect(mockAxios).toHaveBeenCalledWith(url);
	});
});