import * as Yup from 'yup';
import {
	username, email, password, inviteCode, acceptedTos,
} from '../../../utils/schemas';

const Schema = Yup.object().shape({
	username,
	email,
	password,
	code: inviteCode,
	acceptedTos,
});

export const SchemaNoInvite = Yup.object().shape({
	username,
	email,
	password,
	acceptedTos,
});

export default Schema;
