import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setData } from './redux/dataReducer';
import { toast } from 'react-toastify';
import { setLoading } from './redux/loaderReducer';
import { Table, Image, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const Home = () => {
    const data = useSelector((state) => state.data);
    console.log("vaaaaa", data);
    const [fetchedData, setFetchedData] = useState(data.data?.results ? data.data.results : []);
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

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: () => { return <Image src={'https://picsum.photos/1200/1200.jpg'} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filterDropdown: ({ confirm }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search Name"
                        value={search}
                        onChange={(e) => handleSearchChange(e)}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            onClick={() => confirm()}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => setSearch('')} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Birth Year',
            dataIndex: 'birth_year',
            key: 'birth_year',
        },
        {
            title: 'Hair Color',
            dataIndex: 'hair_color',
            key: 'hair_color',
            render: (hair_color) => {
                return hair_color.charAt(0).toUpperCase() + hair_color.slice(1);
            },
        },
        {
            title: 'Skin Color',
            dataIndex: 'skin_color',
            key: 'skin_color',
            render: (skin_color) => {
                return skin_color.charAt(0).toUpperCase() + skin_color.slice(1);
            },
        },
        {
            title: 'Eye Color',
            dataIndex: 'eye_color',
            key: 'eye_color',
            render: (eye_color) => {
                return eye_color.charAt(0).toUpperCase() + eye_color.slice(1);
            },
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => {
                return gender.charAt(0).toUpperCase() + gender.slice(1);
            },
            filters: [
                {
                    text: 'Male',
                    value: 'male'
                },
                {
                    text: 'Female',
                    value: 'female'
                }
            ],
            onFilter: (value, record) => record.gender.indexOf(value) === 0
        },
        {
            title: 'Height',
            dataIndex: 'height',
            key: 'height',
            sorter: (a, b) => {
                if (isNaN(a.height) && isNaN(b.height)) {
                    return 0;
                } else if (isNaN(a.height)) {
                    return -1;
                } else if (isNaN(b.height)) {
                    return 1;
                } else {
                    return parseInt(a.height, 10) - parseInt(b.height, 10);
                }
            },
            render: (height) => {
                return isNaN(height) ? 0 : parseInt(height, 10);
            }
        },
        {
            title: 'Mass',
            dataIndex: 'mass',
            key: 'mass',
            sorter: (a, b) => {
                if (isNaN(a.mass) && isNaN(b.mass)) {
                    return 0;
                } else if (isNaN(a.mass)) {
                    return -1;
                } else if (isNaN(b.mass)) {
                    return 1;
                } else {
                    return parseInt(a.mass, 10) - parseInt(b.mass, 10);
                }
            },
            render: (mass) => {
                return isNaN(mass) ? 0 : parseInt(mass, 10);
            }
        },
        {
            title: 'Vehicles',
            dataIndex: 'vehicles',
            key: 'vehicles',
            render: (vehicles) => vehicles.length,
            filters: [
                {
                    text: '0',
                    value: 0
                },
                {
                    text: '1',
                    value: 1
                },
                {
                    text: '2',
                    value: 2
                },
                {
                    text: '3',
                    value: 3
                }
            ],
            onFilter: (value, record) => record.vehicles.length === value,
            sorter: (a, b) => a.vehicles.length - b.vehicles.length
        }
    ]

    const paginationConfig = {
        pageSize: 10,
        total: data?.data?.count,
        showSizeChanger: false,
        simple: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        onChange: handlePageChange
    };


    return (
        <div>
            <div className='flex w-full justify-center bg-black min-h-[70px] items-center'>
                <p className='text-2xl font-bold text-white justify-center items-center'>Scizers Technologies LLP Front-End Developer project</p>
            </div>
            <Table dataSource={fetchedData.length > 0 ? fetchedData : ''} columns={columns} pagination={paginationConfig} />
        </div>
    )
}

export default Home;
