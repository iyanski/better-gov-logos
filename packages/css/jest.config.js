module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
    testMatch: ['**/__tests__/**/*.test.{js,ts}'],
    collectCoverageFrom: [
        'src/**/*.{js,ts,css}',
        '!src/**/*.d.ts',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};