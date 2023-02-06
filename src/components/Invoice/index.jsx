import { Page, Document, Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import WorkHallImage from '../../assets/logo.png';

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
        height: 74,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

const Invoice = ({ data }) => (
    <Document>
        <Page size='A4' style={styles.page}>
            <Image style={styles.logo} src={WorkHallImage} />
        </Page>
    </Document>
);

export const InvoicePdf = ({ invoice }) => (
    <PDFViewer width={1000} height={600}>
        {invoice}
    </PDFViewer>
);

export default Invoice;