import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import useDebounce from "../useDebounce";

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  max-width: 550px;
`;

const Label = styled.label`
  color: gray;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  align-self: flex-start;
`;

const Input = styled.input`
  width: 250px;
  border: 1px solid gray;
  align-self: flex-start;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  padding-top: 20px;
  border-top: 1px solid gray;
  height: 381px;
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 20px;
  font-family: monospace;
  font-size: 14px;
  color: cornflowerblue;
`;

const UserList = () => {
  const [value, setValue] = useState("");
  const searchValue = useDebounce(value, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async (source) => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios(
          "https://jsonplaceholder.typicode.com/users"
        );
        const filteredData = response?.data?.filter((user) => {
          const userKey = user.name.toLowerCase();
          const search = searchValue.toLowerCase();

          return userKey.includes(search);
        });

        setUsers(filteredData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, [searchValue]);

  return (
    <Container>
      <Label>Search User: {searchValue}</Label>
      <Input onChange={(e) => setValue(e.target.value)} />
      {isLoading && <h2>Loading Users...</h2>}
      {error ? (
        <h2>Woops! Something went wrong...</h2>
      ) : (
        <List>
          {users.map((user) => (
            <ListItem>{user.name}</ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default UserList;
