import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from '@infra/http/axios-http-client';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const mockHttpClient = () => {
	return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
	test('Deve executar http post com axios e URL correta', () => {
		const httpClient = mockHttpClient();
		const url = faker.internet.url();
		httpClient.post({url, body: ''});
		expect(mockAxios.post).toHaveBeenCalledWith(url);
	});
});