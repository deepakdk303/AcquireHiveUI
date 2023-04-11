import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@material-ui/core";
import EmailIcon from "@mui/icons-material/Email";
import { postSendEmail } from "../../Service/EmployerService";
import useNotification from "../../Hooks/useNotification";

const Candidate = ({ candidateList, onHandleStatusChange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sendNotification] = useNotification();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event, index) => {
    // const newRows = [...rows];
    // newRows[index].status = event.target.value;
    // console.log("newRows", newRows);
    // setRows(newRows);
    onHandleStatusChange(event, index);
  };

  const handleSendEmail = async (i) => {
    console.log("rows[i].status", candidateList[i]);
    const formData = {
      fullName: candidateList[i].full_name,
      email: candidateList[i].email,
      status: candidateList[i].status,
    };
    const responseData = await postSendEmail(formData);
    if (responseData.status === 200) {
      sendNotification({
        message: "Email sent successfully..",
        variant: "success",
      });
      // setJobList(responseData?.data?.data);
      // getJobList();
      // sendNotification({ message: "Added Success fully", variant: "success" });
      // setDescription("");
    }
  };

  return (
    <>
      <Box mt={2}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Relevant Experience</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Experience</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidateList.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.full_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.relavant_experiance}</TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell>
                      {/* {JSON.parse(row.skills)} */}
                      {row.skills
                        .replace(/\{/g, "")
                        .replace(/}/g, "")
                        .replace(/"/g, "")}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={row.status}
                          label="Status"
                          onChange={(e) => handleStatusChange(e, i)}
                          // disabled={row.status === "enrolled"}
                        >
                          <MenuItem selected value={"enrolled"}>
                            Enrolled
                          </MenuItem>
                          <MenuItem value={"next_level"}>Second Level</MenuItem>
                          <MenuItem value={"give_offer"}>
                            Offer Interview Letter
                          </MenuItem>
                          <MenuItem value={"unsuccessfull"}>
                            Unsuccessfull application Letter
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>{row.total_experiance}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        component="label"
                        onClick={() => handleSendEmail(i)}
                      >
                        <EmailIcon />
                      </IconButton>
                      {/* <EmailIcon /> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={candidateList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Candidate;
