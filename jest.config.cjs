module.exports = {
	roots: ['./src', './tests'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{ts,tsx}'
	],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	transform: {
		'.+\\.(ts|tsx)$': 'ts-jest'
	},
	moduleNameMapper: {
		'^@tests/(.*)$': '<rootDir>/tests/$1',
		'^@data/(.*)$': '<rootDir>/src/data/$1',
		'^@domain/(.*)$': '<rootDir>/src/domain/$1',
		'^@infra/(.*)$': '<rootDir>/src/infra/$1'
	}
};