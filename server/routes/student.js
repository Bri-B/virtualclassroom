// // /* eslint-disable no-console */
// // const { Router } = require('express');
// // // const sequelize = require('sequelize');
// // const { models } = require('../db/models/index');

// // const {
// //   Announcement,
// //   Announcement_class,
// //   Assignment, Assignment_class,
// //   Assignment_student,
// //   Class,
// //   School,
// //   Student,
// //   Student_class,
// //   Teacher,
// //   sequelize,
// //   Sequelize } = models;
// // const studentRouter = Router();

// // module.exports = {
// //   studentRouter,
// // };

// //



// // Google Places API Route
// truckRouter.get('/api/google', (req, res) => {
//   const { lat, lon } = req.query;
//   axios({
//     method: 'get',
//     url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&rankby=distance&type=restaurant&key=${process.env.GOOGLE_PLACES_API_KEY}&keyword=truck`,
//   })
//     .then((response) => {
//       const { data } = response;
//       const { results } = data;
//       console.log(results);
//       res.send(results);
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// });

// // Google Geocode Lat/Lon for Addresses API Route
// truckRouter.get('/api/geocode', (req, res) => {
//   const { vicinity, truck } = req.query;
//   const truckWithLocation = truck;
//   axios({
//     method: 'get',
//     url: `https://maps.google.com/maps/api/geocode/json?address=${vicinity}&key=${process.env.GOOGLE_PLACES_API_KEY}`,
//   })
//     .then((response) => {
//       const { data } = response;
//       const { results } = data;
//       if (results[0] !== undefined) {
//         truckWithLocation.location = results[0].geometry.location;
//         res.send(truckWithLocation);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// });


// // route to get a specific truck
// truckRouter.get('/:truckId', (req, res) => {
//   const { truckId } = req.params;
//   Truck.findOne({
//     where: {
//       id: truckId,
//     },
//   })
//     .then((foundTruck) => {
//       if (foundTruck) {
//         console.log(foundTruck);
//         res.send(foundTruck);
//       } else {
//         res.status(404).send('truck not found');
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // get all truck photos for specific truck
// truckRouter.get('/photo/:truckId', (req, res) => {
//   const { truckId } = req.params;
//   Photo.findAll({
//     where: {
//       id_truck: truckId,
//     },
//   })
//     .then((photos) => {
//       console.log(photos);
//       res.send(photos);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // find all reviews by specific truck
// truckRouter.get('/review/:truckId', (req, res) => {
//   const { truckId } = req.params;
//   Review.findAll({
//     where: {
//       id_truck: truckId,
//     },
//   })
//     .then((truckReview) => {
//       console.log(truckReview);
//       res.send(truckReview);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to get all truck posts
// truckRouter.get('/truckpost/:truckId', (req, res) => {
//   const { truckId } = req.params;
//   Post.findAll({
//     where: {
//       id_truck: truckId,
//     },
//   })
//     .then((truckPosts) => {
//       console.log(truckPosts);
//       res.send(truckPosts);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to get truck by google id for login
// truckRouter.get('/login/:googleId', (req, res) => {
//   const { googleId } = req.params;
//   Truck.findOne({
//     where: {
//       google_id: googleId,
//     },
//   })
//     .then((foundTruck) => {
//       if (foundTruck) {
//         res.send(foundTruck);
//       } else {
//         res.status(404).send('truck not found');
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to register new truck with google id
// truckRouter.post('/register', (req, res) => {
//   const { googleId } = req.body;
//   Truck.findOrCreate({
//     where: {
//       google_id: googleId,
//     },
//   })
//     .then((registeredTruck) => {
//       console.log(registeredTruck);
//       res.status(201).send(registeredTruck);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to create new truck
// truckRouter.put('/create/:googleId', (req, res) => {
//   const { googleId } = req.params;
//   console.log('create truck', req.params);
//   const {
//     fullName,
//     phoneNumber,
//     logo,
//     foodGenre,
//     blurb,
//     openTime,
//     closeTime,
//     latitude,
//     longitude,
//   } = req.body;

//   Truck.update(
//     {
//       full_name: fullName,
//       phone_number: phoneNumber,
//       logo,
//       food_genre: foodGenre,
//       blurb,
//       open_time: openTime,
//       close_time: closeTime,
//       latitude,
//       longitude,
//     }, {
//       where: {
//         google_id: googleId,
//       },
//     },
//   )
//     .then((newTruck) => {
//       res.status(201).send(newTruck);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // TODO: need routes for updating stars and numberOfReviews
// // star_average: starRating || 0,
// // number_of_reviews: numberOfReviews || 0,

// // route for truck to make a new post
// truckRouter.post('/truckpost/new/:truckId', (req, res) => {
//   const { truckId } = req.params;
//   const { title, message, photo } = req.body;
//   Post.findOrCreate({
//     where: {
//       id_truck: truckId,
//       title,
//       message,
//       photo,
//     },
//   })
//     .then((newTruckPost) => {
//       console.log(newTruckPost);
//       res.status(201).send(newTruckPost);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to create new truck photo
// truckRouter.post('/post/photo/:truckId', (req, res) => {
//   const { truckId } = req.params;
//   const { url } = req.body;
//   Photo.findOrCreate({
//     where: {
//       id_truck: truckId,
//       url,
//     },
//   })
//     .then((newPhoto) => {
//       console.log(newPhoto);
//       res.status(201).send(newPhoto);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // update truck profile settings by specific id
// truckRouter.put('/update/:truckId', (req, res) => {
//   const { truckId } = req.params;

//   const {
//     fullName,
//     phoneNumber,
//     logo,
//     foodGenre,
//     blurb,
//     openTime,
//     closeTime,
//     latitude,
//     longitude,
//     openStatus,
//   } = req.body;

//   Truck.update(
//     {
//       full_name: fullName,
//       phone_number: phoneNumber,
//       logo,
//       foode_genre: foodGenre,
//       blurb,
//       open_time: openTime,
//       close_time: closeTime,
//       latitude,
//       longitude,
//       open_status: openStatus,
//     },
//     {
//       where: {
//         id: truckId,
//       },
//     },
//   )
//     .then((updatedTruck) => {
//       if (updatedTruck) {
//         console.log('truck updated successfully');
//         res.status(204).send('truck updated successfully');
//         return;
//       }
//       res.status(404).send('truck not found');
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('there was an error processing request', err);
//     });
// });

// // delete specific photo from specific truck
// truckRouter.delete('/delete/photo/:truckId/:photoId', (req, res) => {
//   const { photoId, truckId } = req.params;
//   Photo.destroy({
//     where: {
//       id: photoId,
//       id_truck: truckId,
//     },
//   })
//     .then((removedTruck) => {
//       if (removedTruck) {
//         console.log(removedTruck);
//         res.send('photo was deleted');
//         return;
//       }
//       res.status(404).send('photo not found');
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err, 'there was an error processing request');
//     });
// });

// // delete truck account
// truckRouter.delete('/delete/:truckId', (req, res) => {
//   const { truckId } = req.params;
//   Truck.destroy({
//     where: {
//       id: truckId,
//     },
//   })
//     .then((deletedTruck) => {
//       if (deletedTruck) {
//         console.log(deletedTruck);
//         res.send('truck was deleted');
//         return;
//       }
//       res.status(404).send('truck not found');
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send('there was an error processing request', err);
//     });
// });

// module.exports = {
//   truckRouter,
// };


// // get user basic info with googleId from async storage
// userRouter.get('/googleId/:googleId', (req, res) => {
//   console.log('Login Route');
//   const { googleId } = req.params;
//   User.findAll({
//     where: {
//       google_id: googleId,
//     },
//   })
//     .then((data) => {
//       console.log(data);
//       res.send(data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });



// // get all of a user's reviews
// userRouter.get('/review/:userId', (req, res) => {
//   const { userId } = req.params;
//   Review.findAll({
//     where: {
//       id_user: userId,
//     },
//   })
//     .then((foundUserReviews) => {
//       console.log(foundUserReviews);
//       res.send(foundUserReviews);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // get all user's favorite trucks
// userRouter.get('/favorites/:userId', (req, res) => {
//   const { userId } = req.params;
//   Favorite.findAll({
//     where: {
//       id_user: userId,
//       favorite: true,
//     },
//     include: [
//       {
//         model: Truck,
//         required: true,
//       },
//     ],
//   })
//     .then((favoriteTrucks) => {
//       res.send(favoriteTrucks);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// // get all user's visits for badge status
// userRouter.get('/get/visits/:userId', (req, res) => {
//   const { userId } = req.params;
//   Visit.findAll({
//     where: {
//       id_user: userId,
//     },
//   })
//     .then((allVisits) => {
//       console.log(allVisits);
//       res.send(allVisits);
//     })
//     .catch((err) => console.err(err));
// });
// // create a new user
// userRouter.post('/new', (req, res) => {
//   const { fullName, googleId, profilePhotoUrl } = req.body;
//   // console.log(req.body);
//   User.findOrCreate({
//     where: {
//       google_id: googleId,
//     },
//     defaults: {
//       full_name: fullName,
//       profile_photo_url: profilePhotoUrl,
//     },
//   })
//     .then((newUser) => {
//       res.status(201).send(newUser);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to add new truck review
// userRouter.post('/review/new/:truckId/:userId', (req, res) => {
//   const { truckId, userId } = req.params;

//   const {
//     reviewTitle,
//     reviewDescription,
//     reviewStar,
//     reviewPhoto,
//     upvotes,
//   } = req.body;

//   Review.findOrCreate({
//     where: {
//       id_user: userId,
//       id_truck: truckId,
//       review_title: reviewTitle,
//       review_description: reviewDescription,
//       review_star: reviewStar,
//       review_photo: reviewPhoto,
//       upvotes,
//     },
//   })
//     .then((newReview) => {
//       res.status(201).send(newReview);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // create user truck favorite creation on load
// userRouter.post('/update/favoritetruck/add/:userId/:truckId', (req, res) => {
//   const { userId, truckId } = req.params;
//   Favorite.findOrCreate({
//     where: {
//       id_user: userId,
//       id_truck: truckId,
//     },
//     defaults: {
//       favorite: false,
//     },
//   })
//     .then((newFavorited) => {
//       console.log(newFavorited);
//       res.status(201).send('favorite added');
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// // update route to favorite a user's favorite truck
// userRouter.put('/update/favoritetruck/favorite/:userId/:truckId', (req, res) => {
//   const { userId, truckId } = req.params;
//   Favorite.update(
//     {
//       favorite: true,
//     },
//     {
//       where: {
//         id_user: userId,
//         id_truck: truckId,
//       },
//     },
//   )
//     .then(() => {
//       res.status(201).send('favorite was added');
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// // update route to remove/ a user's favorite truck
// userRouter.put('/update/favoritetruck/remove/:userId/:truckId', (req, res) => {
//   const { userId, truckId } = req.params;
//   Favorite.update(
//     {
//       favorite: false,
//     },
//     {
//       where: {
//         id_user: userId,
//         id_truck: truckId,
//       },
//     },
//   )
//     .then(() => {
//       res.status(201).send('favorite was removed');
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// // route to update user photo
// userRouter.post('/update/photo', (req, res) => {
//   const { profilePhotoUrl, userId } = req.body;
//   console.log('PHOTO URL', req.body);
//   User.update(
//     {
//       profile_photo_url: profilePhotoUrl,
//     },
//     {
//       where: {
//         id: userId,
//       },
//     },
//   )
//     .then(() => {
//       res.status(201).send('successfully uploaded photo');
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to update user
// userRouter.put('/update/:userId', (req, res) => {
//   const { userId } = req.params;
//   const { fullName, profilePhotoUrl } = req.body;
//   User.update(
//     {
//       id_user: userId,
//       full_name: fullName,
//       profile_photo_url: profilePhotoUrl,
//     },
//     {
//       where: {
//         id: userId,
//       },
//     },
//   )
//     .then(() => {
//       res.status(201).send('successfully updated user');
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // add truck visits for specific user
// userRouter.put('/update/visits/:userId/:truckId', (req, res) => {
//   const { userId, truckId } = req.params;
//   Visit.create({
//     id_user: userId,
//     id_truck: truckId,
//   })
//     .then((visitEntered) => {
//       console.log(visitEntered);
//       res.status(201).send('visit was recorded');
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // route to update badges
// userRouter.put('/update/badge/:userId', (req, res) => {
//   const { userId } = req.params;
//   const { body } = req;

//   User.update(
//     {
//       badge: body,
//     },
//     {
//       where: {
//         id: userId,
//       },
//     },
//   )
//     .then(() => {
//       res.status(201).send('successfully updated user badge');
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// // upvote route, same user cant vote twice, user can't vote for own review
// userRouter.put('/update/upvote/:userId/:reviewId', (req, res) => {
//   const { userId, reviewId } = req.params;

//   Upvote.findOrCreate({
//     where: {
//       id_user: userId,
//       id_review: reviewId,
//     },
//   })
//     .then((success) => {
//       if (success[1] === false) {
//         res.status(404).send('user has already voted');
//       } else {
//         Review.findOne({ where: { id: reviewId } })
//           .then((foundReview) => {
//             if (parseInt(foundReview.id_user, 10) === parseInt(userId, 10)) {
//               res
//                 .status(404)
//                 .send('user attempted to vote for their own review');
//             } else {
//               Review.update(
//                 {
//                   upvotes: sequelize.literal('upvotes +1'),
//                 },
//                 {
//                   where: { id_user: userId },
//                 },
//               )
//                 .then(() => {
//                   res.status(201).send('upvote has been received');
//                 })
//                 .catch((err) => {
//                   console.error(err);
//                   res.status(500).send(err);
//                 });
//             }
//           })
//           .catch((err) => {
//             console.error(err);
//             res.status(500).send(err);
//           });
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// module.exports = {
//   userRouter,
// };
