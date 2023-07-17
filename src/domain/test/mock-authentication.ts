import { faker } from '@faker-js/faker';
import { AuthenticationParams } from '@domain/usecases/authentication';

export const mockAuthentication = (): AuthenticationParams => ({
	email: faker.internet.email(),
	senha: faker.internet.password()
});