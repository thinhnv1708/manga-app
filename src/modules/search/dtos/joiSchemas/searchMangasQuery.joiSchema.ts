import * as Joi from 'joi';
import { ISearchMangasQuery } from '../searchMangasQuery.interface';

export const searchMangasQueryJoiSchema = Joi.object<ISearchMangasQuery>({
  txtSearch: Joi.string().trim().min(2).max(255).required(),
});
