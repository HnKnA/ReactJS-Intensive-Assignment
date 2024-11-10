import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import { Modal, Table } from "react-bootstrap";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { MyContext } from "../providers/MyProvider";
import {
  useGetOrderQuery,
  useCompleteOrderMutation,
} from "../services/apis/order";
import { Order as OrderType } from "../services/apis/order";

function Order() {
  document.title = "MyShop | Orders";

  const context = useContext(MyContext);
  const location = useLocation();
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const { data: orderData, isError: orderError, refetch } = useGetOrderQuery();
  const [completeOrder] = useCompleteOrderMutation();

  useEffect(() => {
    context?.setisHideSidebarAndHeader(false);
  }, [context]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  useEffect(() => {
    if (orderError) {
      toast.error("Unable to fetch orders data");
    }
  }, [orderError]);

  const handleInfoClick = (order: OrderType) => {
    setSelectedOrder(order);
    setIsInfoModalOpen(true);
  };

  const handleInfoModalClose = () => {
    setIsInfoModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCompleteOrder = async (orderNumber: string) => {
    if (window.confirm("Are you sure you want to complete this order?")) {
      try {
        const response = await completeOrder({ orderNumber }).unwrap();
        if (response.status === 200) {
          toast.success("Order marked as completed");
          refetch();
        } else {
          toast.error(response.message || "Failed to complete the order");
        }
      } catch (error) {
        toast.error("Error completing the order");
      }
    }
  };

  const calculateQuantity = (
    amount: number,
    sale_price?: number,
    regular_price?: number
  ) => {
    const price = sale_price ?? regular_price ?? 1;
    return amount / price;
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">Order List</h5>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <Table className="table table-bordered table-striped v-align">
          <thead className="thead-dark">
            <tr>
              <th>ORDER NUMBER</th>
              <th>STATUS</th>
              <th>AMOUNT</th>
              <th>CUSTOMER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.data?.orders.map((order: OrderType, index: number) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{order.status}</td>
                <td>${order.payment.amount}</td>
                <td>{order.customer}</td>
                <td>
                  <div className="actions d-flex align-items-center">
                    <Button
                      color="secondary"
                      onClick={() => handleInfoClick(order)}
                    >
                      <FaEye />
                    </Button>
                    {order.status !== "completed" && (
                      <Button
                        color="success"
                        onClick={() => handleCompleteOrder(order.orderNumber)}
                      >
                        <FaCheckCircle />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Order Info Modal */}
      {selectedOrder && (
        <Modal show={isInfoModalOpen} onHide={handleInfoModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Product Name:</strong> {selectedOrder.product.name}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(selectedOrder.created).toLocaleString()}
            </p>
            <p>
              <strong>Quantity:</strong>{" "}
              {calculateQuantity(
                selectedOrder.payment.amount,
                selectedOrder.product.sale_price,
                selectedOrder.product.regular_price
              )}
            </p>
            <p>
              <strong>SKU:</strong> {selectedOrder.sku}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
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
    </div>
  );
}

export default Order;
