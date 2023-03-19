import React, { useEffect, useMemo, useState } from "react";
import {
  Tbody,
  LoadingContainer,
  HeaderContainer,
  Header,
  Table,
  Td,
  Th,
  TableContainer,
  Button,
  MainContainer,
  PaginationContainer,
  SearchInput,
  TotalRecordsContainer,
  Select
} from "./UserList.styled";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import AppConstConfig from "../../assets/config/AppConstConfig";
import Pagination from "../../components/pagination/Pagination";
import AppApiConfig from "../../assets/config/AppApiConfig";
import UserSessionService from "../../common/UserSessionService";

function UserList() {
  /* for navigating between pages */
  const navigate = useNavigate();
  /* for navigating between pages */

  /* active user session information */
  const { isAuthenticated } = useAppContext();
  const { authenticatedToken } = useAppContext();
  /* active user session information */

  /* table rendering */
  const [resultDataSet, setResultDataSet] = useState([]);
  const [pageNo, setPageNo] = useState(
    AppConstConfig.DEFAULT_TABLE_PAGE_NUMBER
  );
  const [pageSize, setPageSize] = useState(
    AppConstConfig.DEFAULT_TABLE_PAGE_SIZE
  );
  const [searchStr, setSearchStr] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState(
    AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC
  );
  const [sortOrder, setSortOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  /* table rendering */

  useEffect(() => {
    loadTableData();
  }, [pageNo, searchStr, sortBy, sortOrder, pageSize]);

  const loadTableData = () => {
    setLoading(true);
    //   const skip = (pageNo - 1) * pageSize;
    //   const API_USER_LIST_URL = `http://dummyjson.com/users/search?q=${searchStr}&skip=${skip}&limit=${pageSize}`
    var compHeaderConfig;
    const axiosHeaderConfig =
      UserSessionService.compileSessionHeaderForAxiosCall();
    if (
      axiosHeaderConfig &&
      axiosHeaderConfig !== "" &&
      axiosHeaderConfig !== null &&
      axiosHeaderConfig !== undefined
    ) {
      compHeaderConfig = axiosHeaderConfig;
    }

    const dataToBeSent = {
      page: pageNo,
      length: pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder,
      searchStr,
    };
    axios
      .post(AppApiConfig.API_USER_LIST_URL, dataToBeSent, compHeaderConfig)
      .then((apiRes) => {
        const res = apiRes;
        setTotalResults(res.data.recordsFiltered);
        setResultDataSet(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const tempTableColumns = [
      {
        id: "col1",
        name: "Name",
      },
      {
        id: "col2",
        name: "Email",
      },
      {
        id: "col3",
        name: "Role",
      },
    ];

    setTableColumns(tempTableColumns);

    /* table sorting config */
    const DEFAULT_MAT_TABLE_SORT_COLUMN_INDEX = 0;
    const consSortBy = tempTableColumns[DEFAULT_MAT_TABLE_SORT_COLUMN_INDEX].id;
    const defaultSortOrder = AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC;
    setSortOrder(defaultSortOrder);
    setSortBy(consSortBy);
    /* table sorting config */
  }, []);

  /* Custom sort function */
//   const handleSort = (col) => {
//     if (sortOrder === AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC) {
//       const sortedData = [...resultDataSet].sort((a, b) => {
//         if (typeof a[col] === "string") {
//           if (col === "address") {
//             return a[col].city.toLowerCase() > b[col].city.toLowerCase()
//               ? 1
//               : -1;
//           } else {
//             return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
//           }
//         } else {
//           return a[col] > b[col] ? 1 : -1;
//         }
//       });
//       setSortOrder(AppConstConfig.DEFAULT_TABLE_SORT_ORDER_DESC);
//       setResultDataSet(sortedData);
//     } else if (sortOrder === AppConstConfig.DEFAULT_TABLE_SORT_ORDER_DESC) {
//       const sortedData = [...resultDataSet].sort((a, b) => {
//         if (typeof a[col] === "string") {
//           if (col === "address") {
//             return a[col].city.toLowerCase() < b[col].city.toLowerCase()
//               ? 1
//               : -1;
//           } else {
//             return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
//           }
//         } else {
//           return a[col] < b[col] ? 1 : -1;
//         }
//       });
//       setSortOrder(AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC);
//       setResultDataSet(sortedData);
//     }
//   };

  return (
    <MainContainer>
      <HeaderContainer>
        <Header>Users</Header>
        <SearchInput
          type="text"
          placeholder="Search users..."
          onChange={(e) => {
            setSearchStr(e.target.value);
          }}
        />
      </HeaderContainer>

      <TotalRecordsContainer>
        <b>{totalResults} Users</b> Show {pageSize} entries
        <div style={{marginLeft:'10px',display:'inline'}}>
        <Select onChange={(e)=>setPageSize(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </Select>
        </div>
      </TotalRecordsContainer>

      {loading === false && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                {tableColumns?.map((col, index) => {
                  return (
                    <React.Fragment key={col.id}>
                      <Th
                        onClick={(e) => {
                          setSortOrder((prevValue) =>
                            prevValue === "asc" ? "desc" : "asc"
                          );
                          setSortBy(col.id);
                        }}
                      >
                        {col.name}
                        {sortOrder ===
                        AppConstConfig.DEFAULT_TABLE_SORT_ORDER_DESC
                          ? "↓"
                          : sortOrder ===
                            AppConstConfig.DEFAULT_TABLE_SORT_ORDER_ASC
                          ? "↑"
                          : ""}{" "}
                      </Th>
                    </React.Fragment>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {resultDataSet?.map((row) => (
                <tr key={row._id}>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.role}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      {(loading === false && resultDataSet.length === 0) && <p style={{textAlign:'center'}}>There are no records to display</p>}
      {loading && <LoadingContainer> Loading...</LoadingContainer>}

      <Pagination
        currentPage={pageNo}
        total={totalResults}
        limit={pageSize}
        onPageChange={(page) => setPageNo(page)}
      />
    </MainContainer>
  );
}

export default UserList;
