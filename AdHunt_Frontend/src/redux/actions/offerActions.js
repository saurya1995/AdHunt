import OfferService from "../../services/OfferService";

export const myOffers = () => {
  function onRequest() {
    return {
        type: "GETMYOFFERS_REQUEST" };
}
  function onSuccess(offers) {
    return { type: "GETMYOFFERS_SUCCESS", offers: offers };
  }
  function onFailure(error) {
    console.log("failed to load offers", error);
    return { type: "GETMYOFFERS_FAILURE"};

  }

  return async (dispatch, getState) => {
    dispatch(onRequest());
    try {
      let offers = await OfferService.getMyOffers();
      dispatch(onSuccess(offers));
    } catch (e) {
      onFailure(e);
    }
  };
};
export const getOffers = () => {
    function onSuccess(offers) {
      return { type: "GETALLOFFER_SUCCESS", offers: offers };
    }
    function onFailure(error) {
      console.log("failed to load offers", error);
      return { type: "GETALLOFFER_FAILURE"};

    }
  
    return async (dispatch, getState) => {
      try {
        let offers = await OfferService.getOffers();
        dispatch(onSuccess(offers));
      } catch (e) {
        onFailure(e);
      }
    };
  };

  export const getUserOffers = (profile) => {
    function onSuccess(offers) {
      return { type: "GETUSEROFFERS_SUCCESS", offers: offers };
    }
    function onFailure(error) {
      console.log("failed to load analytics", error);
    }
  
    return async (dispatch, getState) => {
      try {
        let offers = await OfferService.getUserOffers(profile);
        dispatch(onSuccess(offers));
      } catch (e) {
        onFailure(e);
      }
    };
  };
  
  export const getCreatorOffers = () => {
    function onSuccess(ccoffers) {
      return { type: "GETCCOFFER_SUCCESS", ccoffers: ccoffers };
    }
    function onFailure(error) {
      console.log("failed to load analytics", error);
    }
  
    return async (dispatch, getState) => {
      try {
        let ccoffers = await OfferService.getCreatorOffers();
        dispatch(onSuccess(ccoffers));
      } catch (e) {
        onFailure(e);
      }
    };
  };
  
  
  export const getBusinessOffers = () => {
    function onSuccess(businessoffers) {
      return { type: "GETBUSINESSOFFER_SUCCESS", businessoffers: businessoffers };
    }
    function onFailure(error) {
      console.log("failed to load business offers", error);
    }
  
    return async (dispatch, getState) => {
      try {
        let businessoffers = await OfferService.getBusinessOffers();
        dispatch(onSuccess(businessoffers));
      } catch (e) {
        onFailure(e);
      }
    };
  };
  
  
  
  
  
  
  
  