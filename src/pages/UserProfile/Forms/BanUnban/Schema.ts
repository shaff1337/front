import * as Yup from 'yup';
import { string } from '../../../../utils/schemas';

const Schema = Yup.object().shape({ reason: string(100) });

export default Schema;
