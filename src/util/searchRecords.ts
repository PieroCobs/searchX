import FilterCriteria from '../types/filter';
import {Records} from '../types/user';

type Props = {
  records: Records;
  searchTerm: string;
  searchCriteria: FilterCriteria;
};

const searchRecords = ({records, searchTerm, searchCriteria}: Props) => {
  const results: Records = [];
  for (let i = 0; i < records!.length; i++) {
    if (
      records![i][searchCriteria]
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchTerm!.toLowerCase())
    ) {
      results.push(records![i]);
    }
  }
  return results;
};

export default searchRecords;
