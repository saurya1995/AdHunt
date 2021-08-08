import ApplicationService from "../../services/ApplicationService";

export const getOfferApplications = (offerId) => {
    function onSuccess(offerId, applications) {
        return {
            type: "GETOFFERAPPLICATIONS_SUCCESS",
            applications: applications,
            offerId: offerId,
        };
    }
    function onFailure(error) {
        console.log("failed to load applications", error);
        return { type: "GETOFFERAPPLICATIONS_FAILURE", applications: [] };
    }

    return async (dispatch, getState) => {
        try {
            let applications = await ApplicationService.getOfferApplications(
                offerId
            );
            dispatch(onSuccess(offerId, applications));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const myApplications = () => {
    function onRequest() {
        return {
            type: "GETMYAPPLICATIONS_REQUEST" };
    }
    function onSuccess(applications) {
        return {
            type: "GETMYAPPLICATIONS_SUCCESS",
            applications: applications,
        };
    }
    function onFailure(error) {
        console.log("failed to load applications", error);
        return { type: "GETMYAPPLICATIONS_FAILURE" };
    }

    return async (dispatch, getState) => {
        dispatch(onRequest());
        try {
            let applications = await ApplicationService.getMyApplications();
            dispatch(onSuccess(applications));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const apply = (offerId) => {
    function onSuccess(application) {
        return { type: "CREATEAPPLICATION_SUCCESS", application: application };
    }
    function onFailure(error) {
        console.log("failed to create application", error);
    }

    return async (dispatch, getState) => {
        try {
            let application = await ApplicationService.createApplication(
                offerId
            );
            dispatch(onSuccess(application));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateApplication = (application) => {
    function onSuccess(updatedApplication) {
        return {
            type: "UPDATEAPPLICATION_SUCCESS",
            application: updatedApplication,
        };
    }
    function onFailure(error) {
        console.log("failed to create application", error);
        return { type: "UPDATEAPPLICATION_FAILURE" };
    }

    return async (dispatch, getState) => {
        try {
            let updatedApplication = await ApplicationService.updateApplication(
                application
            );
            dispatch(onSuccess(updatedApplication));
        } catch (e) {
            onFailure(e);
        }
    };
};
