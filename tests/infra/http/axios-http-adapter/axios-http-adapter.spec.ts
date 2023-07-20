import { AxiosHttpAdapter } from '@infra/http/axios-http-adapter';
import axios from 'axios';
import { mockAxios } from '@tests/infra/mocks/mock-axios';
import { mockPostRequest } from '@tests/infra/mocks/mock-http';

jest.mock('axios');

type MockHttpClientTypes = {
	httpAdapter: AxiosHttpAdapter,
	mockAxios: jest.Mocked<typeof axios>
}

const mockHttpClient = (): MockHttpClientTypes => {
	const httpAdapter = new AxiosHttpAdapter();
	const mockedAxios = mockAxios();

	return {
		httpAdapter,
		mockAxios: mockedAxios
	};
};

describe('AxiosHttpAdapter', () => {
	test('Deve executar http post com axios e URL e body corretos', async () => {
		const {httpAdapter, mockAxios} = mockHttpClient();		
		const request = mockPostRequest();
		await httpAdapter.post(request);
		expect(mockAxios.post).toHaveBeenCalledWith(request.url, request.body);
	});	
	
	test('Deve retornar body e statusCode de sucesso', async () => {
		const {httpAdapter, mockAxios} = mockHttpClient();		
		const promiseResponse = httpAdapter.post(mockPostRequest());
		const promiseResponseResult = mockAxios.post.mock.results[0].value;
		expect(promiseResponse).toEqual(promiseResponseResult);
	});	
});