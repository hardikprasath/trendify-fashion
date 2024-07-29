import * as React from "react";
import "./AddProductList.css";
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
import { FaEdit } from "react-icons/fa";
import swal from "sweetalert";
import AdminNav from "./AdminNav";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function BasicTable() {
  const [opens, setOpens] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [store, setStore] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({});

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const handleClicks = (data) => {
    axios
      .post("http://localhost:4000/products", data)
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
      .get("http://localhost:4000/products")
      .then((result) => {
        setStore(result.data);
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
    axios
      .delete(`http://localhost:4000/products/${id}`)
      .then(() => {
        getApi();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="admin-header">
      <AdminNav />
      <div className="admin">
        <div className="admin-text">PRODUCTS</div>
        <div className="admin-button">
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
            Add Products
          </Button>
        </div>
        <Dialog open={open} maxWidth="lg">
          <DialogTitle>Products</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
                <Container maxWidth="lg">
                  <form onSubmit={handleSubmit(handleClicks)}>
                    <TableContainer component={Paper} sx={{overflow:'hidden'}}>
                      <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead sx={{ background: "#00A7E1" }}>
                          <TableRow>
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Category
                            </TableCell>
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Product Name
                            </TableCell>
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Product Price
                            </TableCell>
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Offer Price
                            </TableCell>
                            <TableCell align="left" sx={{ color: "#fff" }}>
                              Product Image
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
                              <Controller
                                name="Category"
                                control={control}
                                rules={{
                                  required: "Please select Category",
                                }}
                                render={({ field }) => (
                                  <FormControl
                                    sx={{ maxWidth: "200" }}
                                    size="small"
                                  >
                                    <InputLabel id="category-label">
                                      Category
                                    </InputLabel>
                                    <Select
                                      labelId="category-label"
                                      id="category"
                                      value={field.value}
                                      onChange={(e) =>
                                        field.onChange(e.target.value)
                                      }
                                      label="Category"
                                      sx={{ textAlign: "left" }}
                                    >
                                      {categories.map((category) => (
                                        <MenuItem
                                          key={category.categoryname}
                                          value={category.categoryname}
                                        >
                                          {category.categoryname}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    <p
                                      style={{
                                        color: "red",
                                        textAlign: "left",
                                      }}
                                    >
                                      {errors.Category &&
                                        errors.Category.message}
                                    </p>
                                  </FormControl>
                                )}
                              />
                            </TableCell>

                            <TableCell align="right">
                              <FormControl>
                                <Controller
                                  name="Name"
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
                                      label="Product Name"
                                      type="text"
                                      sx={{ width: "200px" }}
                                    />
                                  )}
                                />
                                <p style={{ color: "red", textAlign: "left" }}>
                                  {errors?.Name?.message &&
                                    errors?.Name?.message}
                                </p>
                              </FormControl>
                            </TableCell>
                            <TableCell align="right">
                              <FormControl>
                                <Controller
                                  name="Price"
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
                                      label="Product Price"
                                      type="text"
                                      sx={{ width: "200px" }}
                                    />
                                  )}
                                />
                                <p style={{ color: "red", textAlign: "left" }}>
                                  {errors?.Price?.message &&
                                    errors?.Price?.message}
                                </p>
                              </FormControl>
                            </TableCell>

                            <TableCell align="right">
                              <FormControl>
                                <Controller
                                  name="offer"
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
                                      label="Offer Price"
                                      type="text"
                                      sx={{ width: "200px" }}
                                    />
                                  )}
                                />
                                <p style={{ color: "red", textAlign: "left" }}>
                                  {errors?.offer?.message &&
                                    errors?.offer?.message}
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
                                    //   sx={{ width: "240px" }}
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
                    <div className="addproduct-btn">
                      <Button onClick={handleClose} color="error">
                        Cancel
                      </Button>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">S.no</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Product Images</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">offer price</TableCell>
                <TableCell align="center">Product price</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store &&
                store.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.Category}</TableCell>
                      <TableCell align="center">
                        <img
                          src={item.ImageURL}
                          alt="img"
                          style={{ width: "100%", maxWidth: "50px" }}
                        />
                      </TableCell>
                      <TableCell align="center">{item.Name}</TableCell>
                      <TableCell align="center">{item.offer}</TableCell>
                      <TableCell align="center">{item.Price}</TableCell>
                      {/* <TableCell align="center">{item.size}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell> */}
                      <TableCell align="center">
                        {/* <div className="icon">
                          <div>
                            <FaEdit className="edit-icon" />
                          </div>
                          <div> */}
                        <MdDelete
                          className="delete-icon"
                          onClick={() => deleteItem(item.id)}
                        />
                        {/* </div>
                        </div> */}
                      </TableCell>
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
