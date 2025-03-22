import { RestDataSource } from "./RestDataSource";
import { PRODUCTS, SUPPLIERS } from "../store/modelSlice";
import { fetchData, storeData, updateData, deleteData } from '../store/asyncActions';

export const GET_DATA = "rest_get_data";

interface GetDataAction {
  type: typeof GET_DATA;
  dataType: string;
}

export const getData = (dataType: string): GetDataAction => {
  return {
    type: GET_DATA,
    dataType: dataType
  };
};

interface DataSources {
  [key: string]: RestDataSource;
}

interface Action {
  type: string;
  payload?: any;
  meta?: any;
  dataType?: string;
}

interface State {
  model: {
    [key: string]: any[];
  };
}

export const createRestMiddleware = (productsURL: string, suppliersURL: string) => {
  const dataSources: DataSources = {
    [PRODUCTS]: new RestDataSource(productsURL, () => {}),
    [SUPPLIERS]: new RestDataSource(suppliersURL, () => {})
  };

  return ({ dispatch, getState }: { dispatch: any, getState: () => State }) =>
    (next: (action: Action) => void) =>
    (action: Action) => {
      if (action.type === GET_DATA && action.dataType) {
        const dataType = action.dataType;
        if (getState().model[dataType]?.length === 0) {
          dataSources[dataType].GetData();
        }
        return next(action);
      }

      // Handle fulfilled actions
      if (action.type?.endsWith('/fulfilled')) {
        if (action.type.startsWith('storeData')) {
          const { dataType, data } = action.payload;
          action.payload.data.id = null;
          dataSources[dataType].Store(data, (responseData: any) => {
            dispatch(storeData.fulfilled({ dataType, data: responseData }, '', { dataType, data }));
          });
        }
        else if (action.type.startsWith('updateData')) {
          const { dataType, data } = action.payload;
          dataSources[dataType].Update(data, (responseData: any) => {
            dispatch(updateData.fulfilled({ dataType, data: responseData }, '', { dataType, data }));
          });
        }
        else if (action.type.startsWith('deleteData')) {
          const { dataType, id } = action.payload;
          dataSources[dataType].Delete({ id }, () => {
            dispatch(deleteData.fulfilled({ dataType, id }, '', { dataType, id }));
          });
        }
      }

      return next(action);
    };
};