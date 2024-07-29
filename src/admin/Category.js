import * as React from "react";
import "./Category.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Container,
  FormControl,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MdDelete } from "react-icons/md";
import swal from 'sweetalert';
import AdminNav from "./AdminNav";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];


export default function Category() {
  const [opens, setOpens] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState([]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    // getValues,
  } = useForm({});

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const handleClicks = (data) => {
    axios
      .post("http://localhost:4000/category", data)
      .then(() => {
        getApi();
        console.log(data, "getapi");
        reset();
      })
      .catch((err) => {
        console.log(err);

      });
    setOpens(true);
    setOpen(false);
   
    /* popup  start*/
    swal({
      title: "Thank you!",
      text: "Your Response was sended!",
      icon: "success",
      button: "ok",
    });
    /*popup end */
  };

  const getApi = () => {
    axios
      .get("http://localhost:4000/category")
      .then((result) => {
        setCategory(result.data);
        console.log(result.data, "setdata");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let logoselecetdFile = "";

  const handleFileUpload = (event) => {
    if (event !== null) {
      if (event.target === undefined) {
        logoselecetdFile = event;
      } else {
        logoselecetdFile = event.target.files[0];
      }
      if (logoselecetdFile) {
        var reader = new FileReader();
        var imagetype = logoselecetdFile.type;
        var imagedatatype = imagetype.split("/");
        var img_crt_type = imagedatatype[1];
        if (
          img_crt_type === "jpeg" ||
          img_crt_type === "jpg" ||
          img_crt_type === "png"
        ) {
          var fileValue = logoselecetdFile;
          reader.readAsDataURL(logoselecetdFile);
          reader.onload = () => {
            var logourl1 = reader.result;
            var spl = logourl1.split(",");
            var ImageValue = spl[1];
            var img_name = fileValue.name;
            setValue("imageName", img_name);
            setValue("ImageURL", logourl1);
          };
        }
      }
    }
  };


  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpens(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteItem = (id) => {
    axios.delete(`http://localhost:4000/category/${id}`)
      .then(() => {
        getApi(); 
  
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="category-header">
      <AdminNav />
      {/* <Admin categories={category} /> */}
      <div className="category">
        <div className="category-text">CATEGORY</div>
        <div className="category-button">
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: "#6c7ae0",
              fontSize: "15px",
              "&:hover": { backgroundColor: "#1D3354", transition: "0.5s" },
              textTransform: "none",
              fontSize: "16px",
              padding: "10px 25px 10px 25px",
              fontWeight: "700",
              borderRadius: "10px",
            }}
          >
            Add Category
          </Button>
        </div>
        <Dialog open={open}  maxWidth="md">
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
                <Container maxWidth="lg">
                  <form onSubmit={handleSubmit(handleClicks)}>
                    <TableContainer component={Paper} sx={{overflow:"hidden"}}>
                      <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead sx={{ background: "#00A7E1" }}>
                          <TableRow>
                          
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Category Type
                            </TableCell>
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Category Name
                            </TableCell>
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Category Image
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="right">
                              <FormControl>
                                <Controller
                                  name="categorytype"
                                  control={control}
                                  defaultValue=""
                                  rules={{
                                    required: "Items required",
                                    minLength: {
                                      value: 3,
                                      message: "Max 3 Words",
                                    },
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      size="small"
                                      label="Category-Type"
                                      type="text"
                                    />
                                  )}
                                />
                                <p style={{ color: "red", textAlign: "left" }}>
                                  {errors?.categorytype?.message &&
                                    errors?.categorytype?.message}
                                </p>
                              </FormControl>
                            </TableCell>

                            <TableCell align="right">
                              <FormControl>
                                <Controller
                                  name="categoryname"
                                  control={control}
                                  defaultValue=""
                                  rules={{
                                    required: "Items required",
                                    minLength: {
                                      value: 3,
                                      message: "Max 3 Words",
                                    },
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      {...field}
                                      size="small"
                                      label="Category-Name"
                                      type="text"
                                    />
                                  )}
                                />
                                <p style={{ color: "red", textAlign: "left" }}>
                                  {errors?.categoryname?.message &&
                                    errors?.categoryname?.message}
                                </p>
                              </FormControl>
                            </TableCell>

                            <TableCell align="center">
                              <FormControl>
                                <Controller
                                  name="images"
                                  control={control}
                                  defaultValue=""
                                  render={({ field }) => (
                                    // <TextField
                                    //   size="small"
                                    //   {...field}
                                    //   type="file"
                                    //   onChange={(e) => handleFileUpload(e)}
                                    // />
                                    <FileUploader
                                    handleChange={(e) => handleFileUpload(e)}
                                      // handleChange={handleChange}
                                      name="file"
                                      types={fileTypes}
                                      children={
                                        <img
                                          src="/images/image.png"
                                          height={"45px"}
                                          width={"50px"}
                                        ></img>
                                      }
                                    />
                                  )}
                                />
                                <p style={{ color: "red", textAlign: "left" }}>
                                  {errors?.images?.message &&
                                    errors?.images?.message}
                                </p>
                              </FormControl>
                            </TableCell>

                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="categoryproduct-btn">
                      <Button onClick={handleClose} color="error">Cancel</Button>
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </Container>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
      <Container>
        <TableContainer  component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="center">S.no</TableCell>
                <TableCell align="center">Category Type</TableCell>
                <TableCell align="center">Category Name</TableCell>
                <TableCell align="center">Category Image</TableCell>               
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category &&
                category.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index+1}</TableCell>
                      <TableCell align="center">{item.categorytype}</TableCell>
                      <TableCell align="center">{item.categoryname}</TableCell>
                      <TableCell align="center">
                        <img
                          src={item.ImageURL}
                          alt="img"
                          style={{ width: "100%", maxWidth: "50px" }}
                        />
                      </TableCell>
                      <TableCell align="center"><p onClick={()=>deleteItem(item.id)}><MdDelete className="delete-icon" /></p></TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar open={opens} autoHideDuration={2000} onClose={handleClosed}>
          <Alert
            onClose={handleClosed}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Uploaded Successfully
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

