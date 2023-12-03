import {RecordMap, Records} from '../types/user';

export const convertMapToArray = (item: RecordMap): Records => {
  const data = Array.from(item.values());
  const flattenedData = data.flat();
  return flattenedData;
};
