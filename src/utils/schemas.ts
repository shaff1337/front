import * as Yup from 'yup';

const limits = {
	minUsername: 3,
	maxUsername: 12,
	minEmail: 3,
	maxEmail: 100,
	minPassword: 4,
	maxPassword: 30,
	code: 20,
};

const response = {
	required: 'Required.',
	limit: {
		username: `Username should be between ${limits.minUsername} and ${limits.maxUsername}.`,
		email: `Email should be between ${limits.minEmail} and ${limits.maxEmail}.`,
		password: `Password should be between ${limits.minPassword} and ${limits.maxPassword}.`,
	},
	invalid: {
		username: 'Username should not have spaces/special characters.',
		email: 'Invalid email address.',
		inviteCode: 'Invalid invite code.',
		number: 'Entered value is not a number.',
		version: 'Enter a valid version.',
		color: 'Enter a valid color.',
	},
	match: {
		email: 'Emails does not match.',
		password: 'Passwords does not match.',
	},
};

export const bool = Yup.boolean().required().oneOf([true, false], 'Invalid value');
export const string = (max: number) => Yup.string().max(max, `Reason should be not more than ${max}.`);

export const username = Yup.string()
	.required(response.required)
	.min(limits.minUsername, response.limit.username)
	.max(limits.maxUsername, response.limit.username)
	.matches(/^[a-zA-Z0-9]+$/, response.invalid.username);

export const text = Yup.string();

export const version = Yup.string()
	.required(response.required)
	.matches(/\d+(\.\d+){2,}/, response.invalid.version);

export const amount = Yup.number().required(response.required);

export const color = Yup.string()
	.required(response.required)
	.matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, response.invalid.color);

export const email = Yup.string()
	.required(response.required)
	.email(response.invalid.email)
	.min(limits.minEmail, response.limit.username)
	.max(limits.maxEmail, response.limit.username);

export const confirmEmail = Yup.string()
	.required(response.required)
	.oneOf([Yup.ref('email'), null], response.match.email);

export const password = Yup.string()
	.required(response.required)
	.min(limits.minPassword, response.limit.password)
	.max(limits.maxPassword, response.limit.password);

export const confirmPassword = Yup.string()
	.required(response.required)
	.oneOf([Yup.ref('password'), null], response.match.password);

export const inviteCode = Yup.string().required(response.required).length(limits.code, response.invalid.inviteCode);

export const acceptedTos = Yup.boolean().oneOf([true], 'Please accept the terms of service.');

export const role = Yup.string().required(response.required).oneOf(['USER', 'BETA', 'ADMIN'], 'Invalid Role');
