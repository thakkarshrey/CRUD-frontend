import React, { useEffect, useMemo, useState } from 'react'
import {Tbody,LoadingContainer, HeaderContainer, Header, Table, Td, Th, TableContainer, Button, MainContainer,  PaginationContainer, SearchInput, TotalRecordsContainer } from './UserList.styled'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import axios from 'axios';
import AppConstConfig from '../../assets/config/AppConstConfig';
import Pagination from '../../components/pagination/Pagination';

function UserList(){
    /* for navigating between pages */
  const navigate = useNavigate();
  /* for navigating between pages */

  /* active user session information */
  const { isAuthenticated } = useAppContext();
  const { authenticatedToken } = useAppContext();
  /* active user session information */

  /* table rendering */
  const [resultDataSet,setResultDataSet] = useState([])
  const [pageNo, setPageNo] = useState(AppConstConfig.DEFAULT_TABLE_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(AppConstConfig.DEFAULT_TABLE_PAGE_SIZE);
  const [searchStr, setSearchStr] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState(AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC);
  const [sortOrder, setSortOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  /* table rendering */

    useEffect(()=>{
        loadTableData()  
    },[pageNo,searchStr])

    const loadTableData = () => {
            setLoading(true)
          const skip = (pageNo - 1) * pageSize;
          const API_USER_LIST_URL = `http://dummyjson.com/users/search?q=${searchStr}&skip=${skip}&limit=${pageSize}`
          axios.get(API_USER_LIST_URL).then((apiRes) => {
      
            const res = apiRes;
            setTotalResults(res.data.total)
            setResultDataSet(res.data.users)
            setLoading(false)
            
        }).catch((err) => {
            setLoading(false)
          });
    }

 

    useEffect(()=>{
        const tempTableColumns = [
            {
                id:'id',
                name:'ID'
            },
            {
                id:'firstName',
                name:'Name'
            },
            {
                id:'address',
                name:'Address'
            },
            {
                id:'phone',
                name:'Phone'
            },
            {
                id:'email',
                name:'Email'
            },
        ]

        setTableColumns(tempTableColumns)

        /* table sorting config */
        const DEFAULT_MAT_TABLE_SORT_COLUMN_INDEX = 0;
        const consSortBy = tempTableColumns[DEFAULT_MAT_TABLE_SORT_COLUMN_INDEX].id;   
        const defaultSortOrder = AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC;
        setSortOrder(defaultSortOrder);
        setSortBy(consSortBy);
        /* table sorting config */
    },[])

    const handleSort = (col) => {
        
        if(sortOrder === AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC){
            const sortedData = [...resultDataSet].sort((a,b)=>{
                if(typeof a[col] === 'string'){
                    if(col === 'address') {
                        return a[col].city.toLowerCase() > b[col].city.toLowerCase() ? 1 : -1 
                    }
                    else{
                        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
                    }
                }
                else{
                    return a[col] > b[col] ? 1 : -1
                }
            })
            setSortOrder(AppConstConfig.DEFAULT_TABLE_SORT_ORDER_DESC)
            setResultDataSet(sortedData)
        }
        else if(sortOrder === AppConstConfig.DEFAULT_TABLE_SORT_ORDER_DESC){
            const sortedData = [...resultDataSet].sort((a,b)=>{
                if(typeof a[col] === 'string'){
                    if(col ==='address'){
                        return a[col].city.toLowerCase() < b[col].city.toLowerCase() ? 1 : -1
                    }
                    else{
                        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
                    }
                }
                else{
                    return a[col] < b[col] ? 1 : -1
                }
            })
            setSortOrder(AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC)
            setResultDataSet(sortedData)
        }

    }
    
    return (
        <MainContainer>
            <HeaderContainer>
                <Header>Users</Header>
                <SearchInput 
                type="text" 
                placeholder='Search users...' 
                onChange={(e)=>{setSearchStr(e.target.value);setPageNo(0)}}/> 
            </HeaderContainer>

        <TotalRecordsContainer>
            <b>{totalResults} Users</b> Show {pageSize} entries 
        </TotalRecordsContainer>

                    {
            loading === false &&
        <TableContainer>
        <Table>
            <thead>
                <tr>
                    {
                        tableColumns?.map((col,index)=>{       
                            return (
                            <React.Fragment key={col.id}>
                            <Th onClick={(e)=>handleSort(col.id)}>{col.name}{ sortOrder === AppConstConfig.DEFAULT_TABLE_SORT_ORDER_DESC ? '↑' : sortOrder === AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC ? '↓' : ""} </Th>
                            </React.Fragment>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    resultDataSet.map((row)=>(
                        <tr key={row.id}>
                            <Td>{row.id}</Td>
                            <Td>{row.firstName}</Td>
                            <Td>{row.address.city}</Td>
                            <Td>{row.phone}</Td>
                            <Td>{row.email}</Td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </TableContainer>
            }
        {
            loading &&
            <LoadingContainer> Loading...</LoadingContainer>
        }
        
        <Pagination 
        currentPage={pageNo} 
        total={totalResults} 
        limit={pageSize} 
        onPageChange={(page)=>setPageNo(page)}/>
        
        </MainContainer>
    )
}

export default UserList