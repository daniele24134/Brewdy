import { userServiceCreateUser, userServiceFetchLogin, userServiceFetchUser } from './userService';
import { 
  beerServiceAddBeer,
  beerServiceGetBeerByBid,
  beerServiceDecrementCounter,
  beerServiceIncrementCounter,
  beerServiceRemoveBeer,
  beerServiceToggleWish
} from "./beerService";
import { commentServiceCreateComment, commentServiceDeleteComment, commentServiceGetComments} from "./commentService";
import { pubServiceCreatePub, pubServiceDeletePub, pubServiceGetPub, pubServiceGetPubs } from "./pubService";
import { taggingServiceCreateTagging, taggingServiceDeleteTagging } from './taggingService';


// users
export const createUser = userServiceCreateUser;
export const fetchLogin = userServiceFetchLogin;
export const fetchUser = userServiceFetchUser;

// beers
export const addBeer = beerServiceAddBeer;
export const getBeerByBid = beerServiceGetBeerByBid;
export const incrementCounter = beerServiceIncrementCounter;
export const decrementCounter = beerServiceDecrementCounter;
export const removeBeer = beerServiceRemoveBeer;
export const toggleWish = beerServiceToggleWish;

//comments
export const getComments = commentServiceGetComments;
export const createComment = commentServiceCreateComment;
export const deleteComment = commentServiceDeleteComment;

//pubs
export const getPubs = pubServiceGetPubs;
export const getPub = pubServiceGetPub;
export const createPub = pubServiceCreatePub;
export const deletePub = pubServiceDeletePub;

//tagging
export const createTagging = taggingServiceCreateTagging;
export const deleteTagging = taggingServiceDeleteTagging;