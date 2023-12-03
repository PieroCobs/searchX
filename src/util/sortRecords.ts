import FilterCriteria from '../types/filter';
import {Records} from '../types/user';

type Props = {
  data: Records;
  sortCriteria: FilterCriteria;
};

const sortRecords = ({data, sortCriteria}: Props): Records => {
  if (data.length <= 1) {
    return data;
  }
  if (sortCriteria === 'age') {
    return sortNumeric(data);
  } else {
    return sortAlphaNumeric(data, sortCriteria);
  }
};

const sortNumeric = (data: Records): Records => {
  return data.sort((a, b) => a.age - b.age);
};

const sortAlphaNumeric = (
  data: Records,
  sortCriteria: FilterCriteria,
): Records => {
  return data.sort((a, b) => {
    let x = a[sortCriteria].toString().toLowerCase();
    let y = b[sortCriteria].toString().toLowerCase();
    return x.localeCompare(y);
  });
};

export default sortRecords;
