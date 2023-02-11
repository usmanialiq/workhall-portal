import moment from 'moment';

export const diffInMonths = (dateFrom, dateTo) => {
    const dateFr = new Date(dateFrom);
    const dateTill = new Date(dateTo);
    return (
        dateTill.getMonth() -
        dateFr.getMonth() +
        12 * (dateTill.getFullYear() - dateFr.getFullYear())
    );
};

export const diffInDays = (dateFrom, dateTo) =>
    Math.ceil((dateTo - dateFrom) / (1000 * 3600 * 24));

export const diffInHours = (dateFrom, dateTo) => {
    const duration = moment.duration(moment(dateTo).diff(moment(dateFrom)));
    return duration.asHours();
}
