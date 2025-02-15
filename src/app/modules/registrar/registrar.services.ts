import QueryBuilder from '../../buildre/QueryBuildre';
import { Registrar } from './registrar.model';

const getAllRegistrarFromDB = async (query: Record<string, unknown>) => {
  const registrarQuery = new QueryBuilder(Registrar.find(), query)
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await registrarQuery.queryModel;
  return data;
};

const getSingleRegistrarFromDB = async (registrarId: string) => {
  const data = await Registrar.findOne({id: registrarId});
  return data;
};

export const RegistrarServices = {
  getAllRegistrarFromDB,
  getSingleRegistrarFromDB
};
