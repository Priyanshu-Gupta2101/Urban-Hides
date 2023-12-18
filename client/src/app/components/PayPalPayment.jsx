import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import axiosInstance from "../hooks/axiosinstance";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import { useCart } from "../context/cart";

const PayPalPayment = ({ custom, token, products, total, phone, address }) => {
  const router = useRouter();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const discount = 20;
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  // const fetchProfile = async () => {
  //   if (auth.token) {
  //     const { data } = await axiosInstance.get(`/api/v1/auth/profile/`, {
  //       headers: {
  //         Authorization: `Bearer ${auth.token}`,
  //       },
  //     });
  //     setUser(data);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, [auth]);

  const createOrder = async (data) => {
    // Order is created on the server and the order id is returned
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}api/v1/auth/send-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          products: products,
          user: auth.user,
          total: total,
          phone: phone,
          address: address,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        // return data.id;
        const uniqueKey = Date.now().toString();
        const res = await validateTransactionAndCaptureOrder(uniqueKey);
        if (!(res.status === 200)) {
          return { success: false, message: "Validation failed" };
        } else {
          return { id: data.id, meta_id: uniqueKey };
        }
      });
  };

  const validateTransactionAndCaptureOrder = async (trackingId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}api/v1/auth/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON({
            "trackingId": trackingId,
          }),
        }
      );

      return response.json;
    } catch (error) {
      console.error("Error validating transaction:", error);
      return { success: false, message: "Error validating transaction" };
    }
  };

  const onApprove = async ({ id, meta_id }) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}api/v1/auth/orders/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderID: id.toString(),
          meta_id: meta_id.toString(),
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "COMPLETED") {
          placeOrder(data.id);
        }
      });
  };

  const placeOrder = async (id) => {
    try {
      if (!products) {
        setFlash({
          message: "Product is required. Please fill it in.",
          bg: "bg-red-500",
        });
        showFlash();
        return;
      }

      if (!custom) {
        const res = await axiosInstance.post(
          `/api/v1/auth/place-order`,
          {
            orderID: id,
            products: products,
            user: auth.user,
            total: total,
            address: address,
            phone: phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setFlash({
            message: "Order Placed",
            bg: "bg-green-500",
          });
          clearCart();
        }
      } else {
        const res = await axiosInstance.post(
          `/api/v1/product/custom`,
          {
            orderID: id,
            product: products,
            user: auth.user,
            total: total,
            address: address,
            phone: phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setFlash({
            message: "Order Placed",
            bg: "bg-green-500",
          });
        }
      }

      router.push("/cart");
    } catch (error) {
      console.log(error);
      setFlash({
        message: "Error! Order couldn't be placed",
        bg: "bg-red-500",
      });
    }
    showFlash();
  };

  const clearCart = async () => {
    try {
      setCart([]);
      localStorage.setItem("cart", []);
      const { data } = await axiosInstance.delete(
        `/api/v1/product/clear-cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      location.reload();
    }
  };

  return (
    <div>
      <Flash flash={flash} />
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  );
};

export default PayPalPayment;

//   const createOrder = async (data) => {
//     // Order is created on the server and the order id is returned
//     return await fetch(
//       `${process.env.NEXT_PUBLIC_API_PATH}api/v1/auth/send-order`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },

//         body: JSON.stringify({
//           products: products,
//           user: user,
//           total: total,
//         }),
//       }
//     )
//       .then((response) => {
//         console.log("HEREEE");
//         return response.json();
//       })
//       .then((data) => {
//         console.log("HERE");
//         const res = validateTransactionAndCaptureOrder(
//           data.id,
//           process.env.NEXT_PUBLIC_PAYPAL_CLIENT
//         );

//         console.log(res);

//         if (!(res.status === 200)) {
//           return { success: false, message: "Validation failed" };
//         } else {
//           return data.id;
//         }
//       });
//   };

//   const validateTransactionAndCaptureOrder = async (merchantId, trackingId) => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_PATH}v1/risk/transaction-contexts/${merchantId}/${trackingId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return response.json;
//     } catch (error) {
//       console.error("Error validating transaction:", error);
//       return { success: false, message: "Error validating transaction" };
//     }
//   };
