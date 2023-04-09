import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import ListItemText from "@material-ui/core/ListItemText";
// import Button from "@material-ui/core/Button";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {
  postProcessCandidate,
  postUploadFileResume,
} from "../../Service/EmployerService";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    // position: "absolute",
    // width: 400,
    // backgroundColor: theme.palette.background.paper,
    // // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    // top: "50%",
    // left: "50%",
    // borderRadius: "8px",
    // transform: "translate(-50%, -50%)",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Express",
];

const ResumeDetailModal = ({ isOpen, onClose, candidateDetail, jobId }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    fullName: candidateDetail?.fullName,
    email: candidateDetail?.email,
    skills: candidateDetail?.skills,
    phone: candidateDetail?.mobile,
  });

  console.log("jobI==========>", jobId);

  console.log("candidateDetail", candidateDetail);

  const [personName, setPersonName] = React.useState(
    candidateDetail?.skills ? candidateDetail?.skills : []
  );

  const handleMultiChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSkillChange = (event) => {
    setFormData({ ...formData, skills: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    let bodyData = {
      fullName: formData.fullName,
      mobile: formData.phone,
      email: formData.email,
      score: formData.score,
      status: formData.status,
      skills: formData.skills,
      total_years_of_experiance: formData.total_years_of_experiance,
      relavant_experiance: formData.relavant_experiance,
      job_id: jobId,
    };
    const responseData = await postProcessCandidate(bodyData);
    console.log("responseData", responseData);
    // setCandidateDetail(responseData?.data?.data)

    if (responseData.status === 200) {
      // setCandidateList(responseData?.data?.data);
      // setCandidateDetail(responseData?.data?.data);
      // handleOpenForm();
    }
  };

  console.log("formData", formData);

  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={isOpen}
        onClose={onClose}
        onOpen={onClose}
        sx={{ width: "400px" }}
      >
        <Box sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h2">
              Enter your information
            </Typography>
            <ClearOutlinedIcon
              sx={{ cursor: "pointer" }}
              aria-label="close"
              onClick={onClose}
            />
          </Box>
          <Box>
            {/* <h2 id="simple-modal-title">Enter your information</h2> */}
            <form onSubmit={handleSubmit}>
              <TextField
                id="fullName"
                label="Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                disabled
              />
              <br />
              <TextField
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                disabled
              />
              <br />
              {/* <Select
          variant="outlined"
          labelId="skills-label"
          id="skills"
          multiple
          name="skills"
          value={formData.skills}
          onChange={handleSkillChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {skills.map((skill) => (
            <MenuItem key={skill} value={skill}>
              <Checkbox checked={formData.skills.indexOf(skill) > -1} />
              <ListItemText primary={skill} />
            </MenuItem>
          ))}
        </Select> */}

              <FormControl sx={{ mt: 2, maxWidth: 300 }} fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Skill</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Skill" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  disabled
                >
                  {skills.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <TextField
                id="phone"
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                disabled
              />
              <br />
              <TextField
                id="total_years_of_experiance"
                label="total_years_of_experiance"
                name="total_years_of_experiance"
                value={formData.total_years_of_experiance}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <br />
              <TextField
                id="relavant_experiance"
                label="relavant_experiance"
                name="relavant_experiance"
                value={formData.relavant_experiance}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default ResumeDetailModal;
