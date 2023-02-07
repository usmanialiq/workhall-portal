import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState, Fragment } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import { FiMoreVertical } from 'react-icons/fi';
import { PDFDownloadLink, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import { bookings } from '../../config/api-routes';
import Invoice from '../Invoice/invoice';

const header = ['Customer', 'Start Date', 'End Date', 'Amount', 'Payment Mode', 'Paid', 'Created At'];

const invoiceData = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: "201906-28",
    balance: "$2,283.74",
    company: "MANTRIX",
    email: "susanafuentes@mantrix.com",
    phone: "+1 (872) 588-3809",
    address: "922 Campus Road, Drytown, Wisconsin, 1986",
    trans_date: "2019-09-12",
    due_date: "2019-10-12",
    items: [
        {
            sno: 1,
            desc: "ad sunt culpa occaecat qui",
            qty: 5,
            rate: 405.89,
        },
        {
            sno: 2,
            desc: "cillum quis sunt qui aute",
            qty: 5,
            rate: 373.11,
        },
        {
            sno: 3,
            desc: "ea commodo labore culpa irure",
            qty: 5,
            rate: 458.61,
        },
        {
            sno: 4,
            desc: "nisi consequat et adipisicing dolor",
            qty: 10,
            rate: 725.24,
        },
        {
            sno: 5,
            desc: "proident cillum anim elit esse",
            qty: 4,
            rate: 141.02,
        },
    ],
};

function BookingList() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isPaid, setIsPaid] = useState('0');
    const [paymentMode, setPaymentMode] = useState('');

    const fetchBookings = useCallback(async () => {
        try {
            let url = `${bookings}?page=${pagination.page}&isPaid=${isPaid}&paymentMode=${paymentMode}`;
            if (startDate) {
                url += url + `&startDate=${startDate}`;
            }
            if (endDate) {
                url += url + `endDate=${endDate}`;
            }
            const { data } = await axios.get(url);
            setData(data.bookings);
            setPagination({
                total: data.total,
                page: data.page,
            });
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    }, [pagination.page, startDate, endDate, isPaid, paymentMode]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handlePDF = (id) => {
        const invoice = data.filter((each) => each._id === id)[0];
        console.log("🚀 ~ file: List.jsx:48 ~ handlePDF ~ invoice", invoice);
        return invoice;
    };

    return (
        <div className='users container w-75 m-auto mt-5'>
            <div className='row mb-3'>
                <div className='col-3'>
                    <h2>Bookings</h2>
                </div>
                <div className='col-9'>
                    <div className='row align-items-center'>
                        <div className='col-3'>
                            Date from
                            <input
                                type='date'
                                className='form-control d-inline'
                                onChange={e => { setStartDate(new Date(e.target.value).valueOf()); fetchBookings(); }}
                            />
                        </div>
                        <div className='col-3'>
                            Date to
                            <input
                                type='date'
                                className='form-control d-inline'
                                onChange={e => { setEndDate(new Date(e.target.value).valueOf()); fetchBookings(); }}
                            />
                        </div>
                        <div className='col-4'>
                            Payment Mode
                            <select className='form-select' onChange={e => setPaymentMode(e.target.value)}>
                                <option value=''>All</option>
                                <option value='cash'>Cash</option>
                                <option value='cheque'>Cheque</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                        <div className='col-2'>
                            Paid
                            <select className='form-select' onChange={e => setIsPaid(e.target.value)}>
                                <option value='0'>No</option>
                                <option value='1'>Yes</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {data.length ? (
                <>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead className='table-primary-head'>
                                <tr>
                                    <td>#</td>
                                    {header.map((each, idx) => (
                                        <td key={idx}>{each}</td>
                                    ))}
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((each = {}, idx) => (
                                    <tr key={idx}>
                                        <th scope='row'>{idx + 1}</th>
                                        <td>{each.createdBy.firstName + ' ' + each.createdBy.lastName}</td>
                                        <td>{moment(each.startDate).format('DD-MMM-YYYY')}</td>
                                        <td>{moment(each.endDate).format('DD-MMM-YYYY')}</td>
                                        <td>{each.amount}</td>
                                        <td>{each.paymentMode}</td>
                                        <td>{each.isPaid ? 'Yes' : 'No'}</td>
                                        <td>{moment(each.createdAt).format('DD-MMM-YYYY')}</td>
                                        <td className='text-end'>
                                            <div className="dropdown">
                                                <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FiMoreVertical />
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li><Link to={'/bookings/' + each._id} className="dropdown-item">Manage</Link></li>
                                                    <li><button className="dropdown-item" type="button">Mark as paid</button></li>
                                                    <li>
                                                        <BlobProvider
                                                            document={<Invoice invoice={invoiceData} />}    // invoice data is a hardcoded const declared above which is to be replaced with real Bookings data 
                                                            className="dropdown-item">
                                                            {({ loading, url }) => (<a href={url} target="_blank" type="button" className="dropdown-item">{loading ? 'Loading invoice ...' : 'Open invoice in new tab'}</a>)}
                                                        </BlobProvider>
                                                    </li>
                                                    <li>
                                                        <PDFDownloadLink
                                                            document={<Invoice invoice={invoiceData} />}    // invoice data is a hardcoded const declared above which is to be replaced with real Bookings data 
                                                            className="dropdown-item"
                                                            type="button" >
                                                            {({ loading }) => loading ? "Loading document..." : "Download invoice PDF"}
                                                        </PDFDownloadLink>
                                                    </li>
                                                </ul>
                                            </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav aria-label='Table Pagination'>
                        <ul className='pagination justify-content-end'>
                            <li className='page-item disabled'>
                                <a className='page-link'>Previous</a>
                            </li>
                            <li className='page-item'><a className='page-link' href='#'>1</a></li>
                            <li className='page-item'><a className='page-link' href='#'>2</a></li>
                            <li className='page-item'><a className='page-link' href='#'>3</a></li>
                            <li className='page-item'>
                                <a className='page-link' href='#'>Next</a>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : <p>No bookings found</p>}
        </div>
    );
}

export default BookingList;