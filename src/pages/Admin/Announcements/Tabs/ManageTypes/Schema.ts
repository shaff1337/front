import * as Yup from 'yup';
import { text, color } from '../../../../../utils/schemas';

const Schema = Yup.object().shape({ text, color });

export default Schema;
