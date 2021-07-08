import { useContext } from 'react';
import storesContext from 'src/stores/store';

const useStores = () => useContext(storesContext);
export default useStores;
