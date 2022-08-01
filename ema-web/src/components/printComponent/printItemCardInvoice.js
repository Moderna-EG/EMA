import React, { useRef } from "react";
import ReactToPrint from "react-to-print"
import ItemCardInvoice from './itemCardInvoice'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'

export default function PrintComponent({ permissions, item }) {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button className="print-btn"><LocalPrintshopIcon style={{ marginRight: '10' }} />اطبع الاذن</button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{ display: "none" }}>
            { /* <ItemCardInvoice ref={(el) => (componentRef = el)} items={items} permission={permission} />*/}
            <ItemCardInvoice ref={(el) => (componentRef = el)} item={item} permissions={permissions} />
        </div>
      </div>
    </>
  );
}