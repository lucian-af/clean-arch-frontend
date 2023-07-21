module.exports = {
    root: true,
    settings: {
        "react": {
            "version": "detect",
        }
    },
    env: {
        'browser': true,
        'es2020': true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    ignorePatterns: [
        'dist', '**/*.js', '**/*.css'
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'react-refresh'
    ],
    rules: {
        'indent': [
            'error',
            'tab'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        'react-refresh/only-export-components': [
            'warn',
            {
                'allowConstantExport': true
            }
        ]
    }
};