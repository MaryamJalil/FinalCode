import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/bookingActions'
import AppointmentCheckoutSteps from '../components/AppointmentCheckoutSteps';

function AddressScreen(props) {
  if (!useSelector((state) => state.userSignin).userInfo) {
    props.history.push('/signin');
  }

  const booking = useSelector((state) => state.booking);
  const { sAddress } = booking;
  const [fullName, setFullName] = useState(sAddress.fullName);
  const [lat, setLat] = useState(sAddress.lat);
  const [lng, setLng] = useState(sAddress.lng);
  const [address, setAddress] = useState(sAddress.address);
  const [city, setCity] = useState(sAddress.city);
  const [postalCode, setPostalCode] = useState(sAddress.postalCode);
  const [country, setCountry] = useState(sAddress.country);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push('/placeappointment');
  };

  


  return (
    <div>
      <AppointmentCheckoutSteps step1 step2 step4/>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Enter full name"
            value={fullName}
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
       
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddressScreen;
