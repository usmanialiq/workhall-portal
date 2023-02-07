import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './tableHeader'
import InvoiceTableRow from './tableRow'
import InvoiceTableBlankSpace from './emptyRow'
import InvoiceTableFooter from './tableFooter'

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.items} />
        <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} />
        <InvoiceTableFooter items={invoice.items} />
    </View>
  );
  
  export default InvoiceItemsTable