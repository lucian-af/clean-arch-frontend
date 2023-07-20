import { HttpPostParams } from '@data/protocols/http';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from '@infra/http/axios-http-client';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const mockHttpClient = () => {
	return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
	url: faker.internet.url(),
	body: faker.helpers.objectValue({nome: 'teste'})
});

describe('AxiosHttpClient', () => {
	test('Deve executar http post com axios e URL e body corretos', () => {
		const httpClient = mockHttpClient();		
		const request = mockPostRequest();
		httpClient.post(request);
		expect(mockAxios.post).toHaveBeenCalledWith(request.url, request.body);
	});	
});