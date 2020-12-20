import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { listDocprofiles } from '../actions/docprofileActions';

import { listLostpets } from '../actions/lostpetActions';
import Lostpet from '../components/Lostpet'
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listTopSellers } from '../actions/userActions';
import Docprofile from '../components/Docprofile';


function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const lostpetList = useSelector((state) => state.lostpetList);
  const docprofileList = useSelector((state) => state.docprofileList);


  const { products, loading, error } = productList;
  const { lostpets } = lostpetList;
  const { docprofiles } = docprofileList;


  
  const userTopSellers = useSelector((state) => state.userTopSellers);
  const {
    sellers,
    loading: loadingSellers,
    error: errorSellers,
  } = userTopSellers;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listLostpets({ feaured: true }));

    dispatch(listProducts({ feaured: true }));
    dispatch(listDocprofiles({ feaured: true }));

    dispatch(listTopSellers());

    return () => {
      //
    };
  }, [dispatch]);
  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox />
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((user) => (
              <div key={user._id}>
                <Link to={`/seller/${user._id}`}>
                  <img src={user.seller.logo} alt={user.seller.name} />
                  <p className="legend">{user.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
    <h2>Lostpets</h2>

{loading ? (
  <LoadingBox />
) : error ? (
  <MessageBox variant="danger">{error}</MessageBox>
) : (
  <>
    {lostpets.length === 0 && <MessageBox>No lostpet Found</MessageBox>}
    <div className="row center">
      {lostpets.map((lostpet) => (
        <Lostpet key={lostpet._id} lostpet={lostpet} />
      ))}
    </div>
  </>
)}
  <h2>Doctor Profiles</h2>

{loading ? (
  <LoadingBox />
) : error ? (
  <MessageBox variant="danger">{error}</MessageBox>
) : (
  <>
    {docprofiles.length === 0 && <MessageBox>No Doctor profile Found</MessageBox>}
    <div className="row center">
      {docprofiles.map((docprofile) => (
        <Docprofile key={docprofile._id} docprofile={docprofile} />
      ))}
    </div>
  </>
)}
      <h2>Featured Products</h2>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>

  );
}
export default HomeScreen;
