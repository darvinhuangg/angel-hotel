//All endpoints are available without Auth

export const retrieveRoomList = 'room-list';
export const retrieveTransactionDetails = 'transaction-details/'; // + transaction_id
export const retrieveUnpaidTransaction = 'unpaid-transaction';
export const confirmPayment = 'confirm-payment/'; // + transaction_id
export const changeBookingDate = 'change-booking-date';
export const createTransaction = 'create-transaction';
export const retrieveInbox = 'inbox';
export const changeDate = 'change-date';
export const changeEmailStatus = 'change-email-status/'; // + email_id
export const retrieveBookedList = 'booked/'; // + user_id