import { LCUDataI } from './types/LCUConnector';

export const LCUFetch = async (URL:string, LCUData:LCUDataI) => {
  const res = await fetch(`https://127.0.0.1:${LCUData.port}${URL}`, { headers: LCUData.headers });
  if (!res.ok) {
    throw new Error('ERR');
  }
  const returnData = await res.json();
  return returnData;
};

export default LCUFetch;
