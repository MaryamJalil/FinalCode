import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createAppointment } from '../actions/appointmentActions';
import MessageBox from '../components/MessageBox';
import { APPOINTMENT_CREATE_RESET } from '../constants/appointmentConstants';
import AppointmentCheckoutSteps from '../components/AppointmentCheckoutSteps';

function PlaceAppointmentScreen(props) {
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { success, appointment, error } = appointmentCreate;

  const booking = useSelector((state) => state.booking);
  const { bookingItems, sAddress } = booking;
  // if (!paymentMethod) {
  //   props.history.push('/payment');
  // }
  // const itemsPrice = bookingItems.reduce((a, c) => a + c.price * c.qty, 0);
  // const shippingPrice = itemsPrice > 100 ? 0 : 10;
  // const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  // const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeAppointmentHandler = () => {
    // create an appointment
    dispatch(
      createAppointment({
        appointmentItems: bookingItems,
        sAddress,
        // paymentMethod,
        // itemsPrice,
        // shippingPrice,
        // taxPrice,
        // totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/appointment/${appointment._id}`);
      dispatch({ type: APPOINTMENT_CREATE_RESET });
    }
  }, [success, dispatch, appointment, props.history]);

  return (
    <div>
      <AppointmentCheckoutSteps step1 step2 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            {/* <li className="card card-body">
              <h2>Shipping </h2>
              <p>
                <strong>Address: </strong>
                {booking.address}, {booking.sAddress.city},
                {booking.sAddress.postalCode},{' '}
                {booking.sAddress.country},
              </p>
            </li> */}
            {/* <li className="card card-body">
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong>
                {booking.paymentMethod}
              </p>
            </li> */}
            {/* <li className="card card-body">
              <h2>Appointment Items</h2>
              {bookingItems.length === 0 ? (
                <MessageBox>Cart is empty</MessageBox>
              ) : (
                <ul>
                  {bookingItems.map((item) => (
                    <li key={item.docprofile}>
                      <div className="row">
                        <div>
                          <img
                            className="small"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/docprofile/${item.docprofile}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div md={4} className="text-right">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li> */}
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Appointment Summary</h2>
              </li>
              {/* <li>
                <div className="row">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li> */}
              <li>
                <div className="row">
                  <div>ShippingAddress</div>
                  {/* <div>${shippingPrice}</div> */}
                </div>
              </li>
              {/* <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li> */}
              {/* <li>
                <div className="row">
                  <div>
                    <strong>Appointment Total</strong>
                  </div>
                  <div>
                    <strong>${totalPrice}</strong>
                  </div>
                </div>
              </li> */}
              {error && (
                <li>
                  <MessageBox variant="danger">{error}</MessageBox>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={placeAppointmentHandler}
                  className="block primary"
                 // disabled={bookingItems.length === 0}
                >
                  Place Appointment
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceAppointmentScreen;
