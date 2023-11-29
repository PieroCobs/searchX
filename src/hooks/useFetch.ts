/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {initRecords} from '../redux/appSlice';
import {useAppDispatch} from './redux';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const importRecords = async () => {
    setIsLoading(true);

    try {
      let result = '';
      if (Platform.OS === 'ios') {
        const path = RNFS.MainBundlePath + '/users-info.json';
        result = await RNFS.readFile(path, 'utf8');
      }
      if (Platform.OS === 'android') {
        result = await RNFS.readFileAssets('custom/users-info.json', 'ut8');
      }
      console.log('Data acquired');
      const data = JSON.parse(result);
      dispatch(initRecords(data));
    } catch (e) {
      console.error('Error:', e);
      setError(e as any);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    importRecords();
  }, []);

  const refetch = () => {
    importRecords();
  };

  return {isLoading, error, refetch};
};

export default useFetch;
