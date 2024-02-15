import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from './redux/loaderReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { setData } from './redux/dataReducer';
import Home from './Home';
import { Loader } from './components';

function App() {
  const { loading } = useSelector((state) => state.loaders);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get('https://swapi.dev/api/people');
        dispatch(setData(response.data));
        dispatch(setLoading(false));
        toast("Data fetched successfully", { type: "success" });
      } catch (error) {
        console.log(error);
        toast("Error occured", { type: "error" });
        dispatch(setLoading(false));
      }
    };
    getData();
  }, [dispatch]);
  return (
    <div className="App">
      {loading && <Loader />}
      <Home />
    </div>
  );
}

export default App;
