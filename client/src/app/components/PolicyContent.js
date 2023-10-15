import React from "react";

const PolicyContent = () => {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold">Site Content</h2>
      </div>
      <section className="container mx-auto p-4" id="policy">
        <div className="container py-4">
          {" "}
          {/* Added py-4 class */}
          <h4 className="text-lg font-semibold">Refund Policy</h4>
          <h5 className="text-md font-semibold">
            Refund / Exchange Policy on Standard US / UK Sizes
          </h5>
          <p>A refund is applicable in either of the two scenarios:</p>
          <ul className="list-disc ml-6">
            <li>Wrong Product</li>
            <li>Wrong Size</li>
          </ul>
          <p>
            In case you receive a wrong product, Urbanhides will take ownership
            of re-shipping the correct one bearing all additional shipping
            charges. We offer a refund or exchange in such a case. Kindly note,
            a refund is processed only after we receive the product back from
            the customer in stated condition.
          </p>
          <p>
            If a customer receives the wrong size apparel, we will alter it to
            his or her specific size with no additional cost. One may even opt
            to have it altered by their local tailor. For it, an alteration
            credit of $50 for a leather jacket and $25 for leather pants can be
            provided. To avail such an alteration credit, you would need to send
            us photographic evidence for us to review the same.
          </p>
        </div>
        <div className="container py-4">
          {" "}
          {/* Added py-4 class */}
          <h4 className="text-lg font-semibold">Shipping Policy</h4>
          <h5 className="text-md font-semibold">Domestic Shipping</h5>
          <p>Customers get free shipping on orders of any amount.</p>
          <p>
            The order may be shipped via UPS, USPS, or FedEx. In some cases, UPS
            orders may reach you via Postal Service. Note that all orders
            shipped to FP/APO, Hawaii, and Alaska may take around 2-3 weeks to
            deliver, as we usually ship orders to these addresses via registered
            post.
          </p>
          <p>
            You will receive a notification mail regarding your shipment’s
            details as soon as we ship out the order. The notification mail
            includes details such as the shipping carrier (shipping number,
            tracking number, etc.) and estimated delivery date.
          </p>
          <p>
            For any other Shipment Queries, please feel free to contact at our
            Toll-free number +1 323 284 6307 or drop us a mail at{" "}
            <a href="#">info@www.urbanhides.com</a>.
          </p>
        </div>
        <div className="container pt-4">
          {" "}
          {/* Added py-4 class */}
          <h4 className="text-lg font-semibold">Order And Payment Process</h4>
          <h5 className="text-md font-semibold">Payment Procedure</h5>
          <p>
            As part of the payment process, we authorize the order amount on
            your card. Kindly note, the term "authorize" implies that the amount
            equaling to your billing amount is temporarily frozen. This means
            that the due amount is not debited from your card and neither it is
            credited into our account. Only after confirmation, we charge the
            card. For this, you shall receive a call or email from our customer
            support team. In case you do not confirm the order, it stands
            cancelled. We accept all major credit cards like American Express,
            Visa, Master Card, Diners Club, Discover, and JCB.
          </p>
          <h5 className="text-md font-semibold">Order Process</h5>
          <p>At Urbanhides, your order is processed in 4 progressive steps:</p>
          <ul className="list-decimal ml-6">
            <li>Order Placement: (2-3 business days)</li>
            <li>Cutting, Stitching & Quality Check: (4-5 business days)</li>
            <li>Delivery: (7-10 business days)</li>
          </ul>
          <p>Finally, your order is delivered to your doorstep.</p>
        </div>
      </section>
    </>
  );
};

export default PolicyContent;
