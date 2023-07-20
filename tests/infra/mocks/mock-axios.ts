import axios from 'axios';
import { faker } from '@faker-js/faker';

export const mockAxios = (): jest.Mocked<typeof axios> => {
	const mockAxios = axios as jest.Mocked<typeof axios>;	
	mockAxios.post.mockResolvedValue({
		data: faker.helpers.objectValue({nome: 'teste'}),
		status: faker.number.int({min: 200, max: 299})
	});
	return mockAxios;
};
