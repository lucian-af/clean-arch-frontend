import { HttpPostParams } from '@data/protocols/http';
import { AxiosHttpAdapter } from '@infra/http/axios-http-adapter';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
const mockAxiosResult = {
	data: faker.helpers.objectValue({nome: 'teste'}),
	status: faker.number.int({min: 200, max: 299})
};
mockAxios.post.mockResolvedValue(mockAxiosResult);

const mockHttpClient = () => {
	return new AxiosHttpAdapter();
};

const mockPostRequest = (): HttpPostParams<any> => ({
	url: faker.internet.url(),
	body: faker.helpers.objectValue({nome: 'teste'})
});

describe('AxiosHttpAdapter', () => {
	test('Deve executar http post com axios e URL e body corretos', async () => {
		const httpClient = mockHttpClient();		
		const request = mockPostRequest();
		await httpClient.post(request);
		expect(mockAxios.post).toHaveBeenCalledWith(request.url, request.body);
	});	
	
	test('Deve retornar body e statusCode de sucesso', async () => {
		const httpClient = mockHttpClient();		
		const httpResponse = await httpClient.post(mockPostRequest());
		expect(httpResponse).toEqual({
			statusCode: mockAxiosResult.status,
			body: mockAxiosResult.data
		});
	});	
});