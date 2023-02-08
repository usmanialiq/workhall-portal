import {
    Page,
    Document,
    Image,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import WorkHallImage from "../../assets/logo.png";

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: "column",
    },
    logo: {
        width: 74,
        height: 74,
        marginLeft: "auto",
        marginRight: "auto",
    },
});

// This component is not being used... I have replaced it with invoice.jsx 

function Invoice({ data }) {
    <Document>
        <Page style={styles.page}>
            <Image style={styles.logo} src={WorkHallImage} />
            <View style={styles.container}>
                <Text>{JSON.stringify(data)}</Text>
            </View>
        </Page>
    </Document>
}
export default Invoice;
