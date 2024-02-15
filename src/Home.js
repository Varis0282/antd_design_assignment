import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from './components';
import { Pagination as AntdPagination } from 'antd';
import { Card as AntdCard, Image } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setData } from './redux/dataReducer';
import { toast } from 'react-toastify';
import { setLoading } from './redux/loaderReducer';
const { Meta } = AntdCard;

const Home = () => {
    const data = useSelector((state) => state.data);
    const [fetchedData, setFetchedData] = useState(data.data?.results ? data.data.results : []);
    const { loading } = useSelector((state) => state.loaders);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const handlePageChange = async (page) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
            setFetchedData(response.data.results);
            dispatch(setData(response.data));
            toast("Data fetched successfully", { type: "success" });
        } catch (error) {
            console.log(error);
            toast("Error occured", { type: "error" });
        }
        dispatch(setLoading(false));
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        let filteredData = fetchedData.filter((val) => {
            return val.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFetchedData(filteredData);
    }

    useEffect(() => {
        if (search === '') {
            setFetchedData(data.data?.results ? data.data.results : []);
        }
    }, [search, data.data?.results]);

    return (
        <div>
            <Navbar data={data} handleSearchChange={handleSearchChange} search={search} setSearch={setSearch} />
            <div className="p-4 m-4 rounded shadow-none transition-shadow duration-200 hover:shadow-md border flex justify-center items-center">
                <AntdPagination simple defaultCurrent={1} showSizeChanger={false} defaultPageSize={10} total={data.data?.count} onChange={handlePageChange} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} />
            </div>
            {fetchedData.length > 0 ? (
                <div className="flex flex-wrap p-4 justify-evenly">
                    {fetchedData.length > 0 &&
                        fetchedData.map((val, index) => {
                            let hair;
                            if (val.hair_color.includes(',')) {
                                let hairColors = val.hair_color.split(',')
                                hair = hairColors[0];
                            }
                            else {
                                hair = val.hair_color === 'none' ? 'white' : val.hair_color;
                            }
                            return (
                                <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-2">
                                    <AntdCard
                                        hoverable
                                        loading={loading}
                                        className='text-center'
                                        style={{ width: 400, backgroundColor: hair === 'none' ? 'white' : hair, color: hair === 'black' ? 'white' : 'black' }}
                                        title={<span style={{ color: hair === 'black' ? 'white' : 'black' }}>{val.name}</span>}
                                    >
                                        <Image src='https://picsum.photos/200/300.jpg' />
                                        <Meta description={`Hair Color: ${val.hair_color}`} />
                                        <div>
                                            Skin color : {val.skin_color}
                                        </div>
                                        <div>
                                            Gender : {val.gender}
                                        </div>
                                        <div>
                                            Birth Year : {val.birth_year}
                                        </div>
                                        <div>
                                            No. of Vehicles : {val.vehicles.length}
                                        </div>
                                    </AntdCard>
                                </div>
                            )
                        })}
                </div>
            ) : (
                'Sorry, no data found! Try removing the search filter.'
            )}
        </div>
    )
}

export default Home;
