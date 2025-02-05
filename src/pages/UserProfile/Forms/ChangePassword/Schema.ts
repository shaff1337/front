import * as Yup from 'yup';
import { password } from '../../../../utils/schemas';

const Schema = Yup.object().shape({ password });

export default Schema;
