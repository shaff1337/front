import * as Yup from 'yup';
import { text, version } from '../../../utils/schemas';

const Schema = Yup.object().shape({ text, version });

export default Schema;
