import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import bin from "../../../public/assets/trashbin.svg";
import eye from "../../../public/assets/eye.svg";
import { useCart } from "react-use-cart";
import html2canvas from 'html2canvas';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CheckoutButton from "../components/CheckoutStripe";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: '20px',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
  },
  product: {
    width: '30%',
    marginRight: '10px',
  },
  price: {
    width: '20%',
    marginRight: '10px',
  },
});

const BoxGrid = () => {
  const { items, isEmpty, cartTotal, removeItem } = useCart();
  const boxGridRef = useRef(null);

  const handleDownload = async (type) => {
    const pageContent = boxGridRef.current;

    if (type === 'image') {
      html2canvas(pageContent).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'page-image.png';
        link.click();
      });
    } else if (type === 'pdf') {
      const pdfContent = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Text>This is your Order Summary</Text>
            </View>
            {items.map((item) => (
              <View style={styles.section} key={item.id}>
                <View style={styles.product}>
                  <Image alt="alt" src={item.imageUrl} width={50} height={50} />
                </View>
                <View style={styles.price}>
                  <Text>{item.name} - ${item.price}</Text>
                </View>
              </View>
            ))}
            <View style={styles.section}>
              <Text>Total: ${cartTotal}</Text>
            </View>
          </Page>
        </Document>
      );

      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${btoa(pdfContent)}`;
      link.download = 'page-document.pdf';
      link.click();
    }
  };

  if (isEmpty) return (
    <div className="w-full h-[70vh] flex flex-col justify-between items-center p-36">
      <h1>Nothing to see here</h1>
      <Link href="/">
        <button className="w-96 text-white rounded-md bg-[#1567E0] p-2">Start Shopping</button>
      </Link>
    </div>
  );

  return (
    <div ref={boxGridRef} className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-12 place-content-center gap-10 m-2 p-3 lg:my-20 lg:px-10">
      <div className="lg:px-5">
        <h1 className="my-3">Order Summary</h1>
        <div className="bg-[#1567E0] p-3 flex justify-between  text-white rounded-tr-lg rounded-tl-lg lg:px-9">
          <h1 className="">Product</h1>
          <h1>Price</h1>
          <h1>Total</h1>
        </div>

        {items.map((item) => (
          <div className="border border-gray-200 rounded-bl-lg border-br-lg">
            <div key={item.id} className="flex justify-between items-center py-3 p-2 lg:px-10">
              <div className="">
                <div className="flex rounded-md  items-center  gap-3 ">
                  <div className="w-2 lg:w-20 shadow-md rounded-md">
                    {item.imageUrl && (
                      <Image alt="alt" src={item.imageUrl} width={20} height={20} className="w-full" />
                    )}
                  </div>
                  <div className="">
                    <h1 className="text-xs lg:text-md text-[#949494] w-20 font-bold">{item.name}</h1>
                  </div>
                </div>
              </div>
              <div className=" flex flex-row items-center justify-center gap-10">
                <h1 className="text-md">${item.price}</h1>
              </div>
              <div className=" flex flex-row items-center justify-center gap-10">
                <h1 className="text-md">${cartTotal}</h1>
              </div>
            </div>
          </div>
        ))}

<button onClick={() => handleDownload('image')} className="bg-blue-500 text-white p-2 rounded-md my-3 ">Download</button>

      </div>

    </div>
  );
};

export default BoxGrid;
