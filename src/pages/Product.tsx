import React, { useEffect, useState, useContext } from "react";
import { FaCartPlus, FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Modal, Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import logoo from "../assets/logoo.png";
import {
  useGetProductsQuery,
  usePatchProductMutation,
  usePostProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  Product as ProductType,
} from "../services/apis/product";
import { useCreateOrderMutation } from "../services/apis/order";
import { MyContext } from "../providers/MyProvider";
import { generateUUID } from "../services/uuid.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number } from "yup";

function Product() {
  document.title = "MyShop | Product";

  const context = useContext(MyContext);

  const [showBysetCatBy, setCatBy] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false); // "Update Modal"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [editProduct, setEditProduct] = useState<Partial<ProductType> | null>(
    null
  );
  const [infoProduct, setInfoProduct] = useState<ProductType | null>(null);

  const { data: categoriesData, isError: categoriesError } =
    useGetCategoriesQuery();
  const { data: productsData, refetch: refetchProducts } =
    useGetProductsQuery();
  const [patchProduct, { isLoading: isUpdateProductLoading }] =
    usePatchProductMutation();
  const [postProduct, { isLoading: isPostProductLoading }] =
    usePostProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [createOrder, { isLoading: isCreateOrderLoading }] =
    useCreateOrderMutation();

  useEffect(() => {
    context?.setisHideSidebarAndHeader(false);
  }, [context]);

  useEffect(() => {
    if (categoriesError) {
      toast.error("Something went wrong! Unable to fetch categories.");
    }
  }, [categoriesError]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCatBy(event.target.value);
  };

  const filteredProductsWithCategory = productsData?.data?.products
    ? productsData.data.products.filter((product) => {
        if (!showBysetCatBy) return true;
        return typeof product.category === "string"
          ? product.category === showBysetCatBy
          : product.category.categoryId === showBysetCatBy;
      })
    : [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleEditClick = (product: ProductType) => {
    setEditProduct({ ...product, category: product.category });
    setIsModalOpen(true);
  };

  const handleInfoClick = (product: ProductType) => {
    setInfoProduct(product);
    setIsInfoModalOpen(true);
  };

  const handleDeleteClick = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(productId).unwrap();
        if (res.status >= 200 && res.status < 300) {
          toast.success("Product deleted successfully!");
          refetchProducts();
        } else {
          toast.error(res.message || "Delete product failed.");
        }
      } catch (err: any) {
        toast.error(
          err?.data?.message || "Cannot delete the product, errors occurred."
        );
      }
    }
  };

  const handleCreateOrderClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsCreateOrderModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditProduct(null);
  };

  const handleInfoModalClose = () => {
    setIsInfoModalOpen(false);
    setInfoProduct(null);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleCreateOrderModalClose = () => {
    setIsCreateOrderModalOpen(false);
    setSelectedProductId(null);
  };

  const openImageInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  const orderSchema = object({
    quantity: number()
      .positive("Quantity must be a positive number")
      .required("Quantity is required"),
  });

  const productSchema = object({
    name: string().required("Name is required"),
    category: string().required("Category is required"),
    regular_price: number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    img: string().required("Image URL is required"),
  });

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">Product List</h5>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center flex-wrap">
            <h4 className="mr-2">CATEGORY BY</h4>
            <FormControl
              size="small"
              className="mr-3"
              style={{ minWidth: "150px", margin: "10px" }}
            >
              <Select<string>
                value={showBysetCatBy}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="w-100"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categoriesData?.data?.categories.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={() => setIsAddModalOpen(true)}
              style={{ backgroundColor: "blue", marginLeft: "auto" }}
            >
              Add Product
            </Button>
          </div>
        </div>
        <div className="mb-3">
          <FormControl fullWidth>
            <input
              id="search"
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="Search for products..."
            />
          </FormControl>
        </div>

        {productsData?.data && (
          <div className="table-responsive mt-3">
            <Table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th>NO</th>
                  <th style={{ width: "300px" }}>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>IMAGE</th>
                  <th>PRICE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredProductsWithCategory.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>
                      {typeof product.category === "string"
                        ? product.category
                        : product.category.name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <img
                        src={`/products/${
                          typeof product.category === "string"
                            ? product.category.toLowerCase()
                            : product.category.name.toLowerCase()
                        }/${product.img}`}
                        alt={""}
                        style={{ width: "50px", height: "auto" }}
                      />
                    </td>
                    <td>${product.regular_price}</td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Button
                          color="secondary"
                          onClick={() => handleInfoClick(product)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => handleEditClick(product)}
                        >
                          <FaPencilAlt />
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <MdDelete />
                        </Button>
                        <Button
                          color="success"
                          onClick={() => handleCreateOrderClick(product.id)}
                        >
                          <FaCartPlus />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* Create Order Modal */}
      {isCreateOrderModalOpen && selectedProductId && (
        <Modal
          show={isCreateOrderModalOpen}
          onHide={handleCreateOrderModalClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ productId: selectedProductId, quantity: 1 }}
              validationSchema={orderSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const res = await createOrder(values).unwrap();
                  if (res.status === 200) {
                    toast.success("Order created successfully!");
                    handleCreateOrderModalClose();
                    resetForm();
                  } else {
                    toast.error(res.message || "Failed to create order.");
                  }
                } catch {
                  toast.error("Something went wrong! Unable to create order.");
                }
              }}
            >
              {({ handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Product ID</label>
                    <Field name="productId" className="form-control" readOnly />
                  </div>
                  <div className="form-group mb-3">
                    <label>Quantity</label>
                    <Field
                      name="quantity"
                      type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <Modal.Footer>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCreateOrderModalClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isCreateOrderLoading}
                    >
                      {isCreateOrderLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Create Order"
                      )}
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <Modal show={isModalOpen} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                name: editProduct.name || "",
                category:
                  typeof editProduct.category === "string"
                    ? editProduct.category
                    : editProduct.category?.name || "",
                regular_price: editProduct.regular_price || 0,
                img: editProduct.img || "",
              }}
              validationSchema={productSchema}
              onSubmit={async (values) => {
                const updatedProduct = {
                  ...values,
                  category: values.category,
                };
                try {
                  const res = await patchProduct({
                    productId: editProduct.id!,
                    patchProductRequest: updatedProduct,
                  }).unwrap();
                  if (res.status >= 200 && res.status < 300) {
                    toast.success("Product updated successfully!");
                    refetchProducts();
                    handleModalClose();
                  } else {
                    toast.error(res.message || "Update product failed.");
                  }
                } catch {
                  toast.error(
                    "Something went wrong! Unable to update product."
                  );
                }
              }}
            >
              {({ handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <Field name="name" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <Field as="select" name="category" className="form-control">
                      <option value="">Select a category</option>
                      {categoriesData?.data?.categories.map((category) => (
                        <option key={category.categoryId} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <Field
                      name="regular_price"
                      type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="regular_price"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <Field
                      name="img"
                      className="form-control"
                      placeholder="File URL, see the guide on github link for more information"
                    />
                    <ErrorMessage
                      name="img"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <Modal.Footer>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isUpdateProductLoading}
                    >
                      {isUpdateProductLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      )}

      {/* Product Info Modal */}
      {infoProduct && (
        <Modal show={isInfoModalOpen} onHide={handleInfoModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                name: infoProduct.name || "",
                category:
                  typeof infoProduct.category === "string"
                    ? infoProduct.category
                    : infoProduct.category?.name || "",
                regular_price: infoProduct.regular_price || 0,
                img: infoProduct.img || "",
              }}
              onSubmit={() => {}}
            >
              {() => (
                <Form noValidate>
                  <div className="form-group">
                    <label>Name</label>
                    <Field name="name" className="form-control" readOnly />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <Field name="category" className="form-control" readOnly />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <Field
                      name="regular_price"
                      type="text"
                      className="form-control"
                      readOnly
                      value={`$${infoProduct.regular_price}`}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <img
                      className="d-block w-100"
                      src={
                        infoProduct.img
                          ? `/products/${
                              typeof infoProduct.category === "string"
                                ? infoProduct.category.toLowerCase()
                                : infoProduct.category.name.toLowerCase()
                            }/${infoProduct.img}`
                          : logoo
                      }
                      alt={infoProduct.name}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        openImageInNewTab(
                          `/products/${
                            typeof infoProduct.category === "string"
                              ? infoProduct.category.toLowerCase()
                              : infoProduct.category.name.toLowerCase()
                          }/${infoProduct.img}`
                        )
                      }
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleInfoModalClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Add Product Modal */}
      <Modal show={isAddModalOpen} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              category: "",
              regular_price: 0,
              img: "",
            }}
            validationSchema={productSchema}
            onSubmit={async (values) => {
              const addProductRequest = {
                id: generateUUID(),
                ...values,
              };
              try {
                const res = await postProduct(addProductRequest).unwrap();
                if (res.status >= 200 && res.status < 300) {
                  toast.success("Product added successfully!");
                  refetchProducts();
                  handleAddModalClose();
                } else {
                  toast.error(res.message || "Add product failed.");
                }
              } catch {
                toast.error("Something went wrong! Unable to add product.");
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <Field name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <Field as="select" name="category" className="form-control">
                    <option value="">Select a category</option>
                    {categoriesData?.data?.categories.map((category) => (
                      <option key={category.categoryId} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <Field
                    name="regular_price"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="regular_price"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <Field
                    name="img"
                    className="form-control"
                    placeholder="File URL, see the guide on github link for more information"
                  />
                  <ErrorMessage
                    name="img"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <Modal.Footer>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddModalClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isPostProductLoading}
                  >
                    {isPostProductLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Product;
