import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './title'
import BillTo from './billTo'
import InvoiceNo from './invoiceNo'
import InvoiceItemsTable from './itemsTable'
import InvoiceThankYouMsg from './thankYouMsg'
import WorkHallImage from "../../assets/logo.png";


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  const Invoice = ({invoice}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={WorkHallImage} />
                    <InvoiceTitle title='Invoice'/>
                    <InvoiceNo invoice={invoice}/>
                    <BillTo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );
  
  export default Invoice;