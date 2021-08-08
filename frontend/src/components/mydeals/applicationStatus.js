export const applicationStatus = {
    pending: {
        text: "pending",
        backendStatus: "pending",  
        color: "yellow",
        action: {
            offerer: {
                action: "Accept",
                disabled: false,
            },
            applier: {
                action: "Waiting for Acceptance",
                disabled: true,
            },
        },
        dealStatus: "pending",
        next: "accepted",
    },
    accepted: {
        text: "accepted",
        backendStatus: "accepted",  
        color: "yellow",
        action: {
            offerer: {
                action: "Waiting for Confirmation",
                disabled: true,
            },

            applier: {
                action: "Confirm",
                disabled: false,
            },
        },
        dealStatus: "active",
        next: "confirmed",

    },
    declined: {
        text: "declined",
        backendStatus: "declined",  
        color: "red",
        action: null,
        dealStatus: "past",
        next: "declined",

    },
    confirmed: {
        text: "confirmed",
        backendStatus: "confirmed", 
        color: "yellow",
        action: {
            business: {
                action: "Pay",
                disabled: false,
            },

            contentcreator: {
                action: "Waiting for Payment",
                disabled: true,
            },
        },
        dealStatus: "active",
        next: "paid",

    },
    paid: {
        text: "paid",
        backendStatus: "paid", 
        color: "green" ,
        action: {
            business: {
                action: "Waiting for Content",
                disabled: true,
            },

            contentcreator: {
                action: "Done",
                disabled: false,
            },
        },
        dealStatus: "active",
        next: "review",

    },
    review: {
        text: "review",
        backendStatus: "review", 
        color: "green" ,
        action: {
            offerer: {
                action: "Review the Deal",
                disabled: false,
            },

            applier: {
                action: "Review the Deal",
                disabled: false,
            },
        },
        dealStatus: "active",
        next: "review_1",

    },
    review_1: {
        text: "review",
        backendStatus: "review_1",
        color: "green",
        action: {
            didReview: {
                action: "Waiting for Partner Review",
                disabled: true,
            },
            didNotReview: {
                action: "Review the Deal",
                disabled: false,
            },
        },
        dealStatus: "active",
        next: "done",
    },
    done: {
        text: "done",
        backendStatus: "done", 
        color: "green" ,
        action: null,
        dealStatus: "past",
        next: "done",

    },
    rejected: {
        text: "rejected",
        backendStatus: "rejected",  
        color: "red",
        action: {
            offerer: {
                action: "Content Rejected",
                disabled: false,
            },

            applier: {
                action: "Content Rejected",
                disabled: false,
            },
        },
        dealStatus: "past",
        next: "done",
    },
};

export const roles = {
    offerer: "offerer",
    applier: "applier",

}