// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
// import { db } from '../firebase.config';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import 'swiper/css';
// import Spinner from './Spinner';

// // Initialize Swiper core modules
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// function Slider() {
//   const [loading, setLoading] = useState(true);
//   const [listings, setListings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const listingsRef = collection(db, 'listings');
//         const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
//         const querySnap = await getDocs(q);

//         const fetchedListings = querySnap.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }));

//         setListings(fetchedListings);
//       } catch (error) {
//         console.error('Error fetching listings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   if (loading) {
//     return <Spinner />;
//   }

//   if (listings.length === 0) {
//     return null; // No listings found, render nothing
//   }

//   return (
//     <>
//       <p className='exploreHeading'>Recommended</p>
//       <Swiper slidesPerView={1} pagination={{ clickable: true }}>
//         {listings.map(({ data, id }) => (
//           <SwiperSlide
//             key={id}
//             onClick={() => navigate(`/category/${data.type}/${id}`)}
//           >
//             <div
//               style={{
//                 background: `url(${data.imgUrls[0]}) center no-repeat`,
//                 backgroundSize: 'cover',
//               }}
//               className='swiperSlideDiv'
//             >
//               <p className='swiperSlideText'>{data.name}</p>
//               <p className='swiperSlidePrice'>
//                 ${data.discountedPrice ?? data.regularPrice}{' '}
//                 {data.type === 'rent' ? '/ month' : ''}
//               </p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }

// export default Slider;
