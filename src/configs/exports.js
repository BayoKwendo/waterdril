import React from 'react';

import {
    toast,
    ToastContainer
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// export const baseURL = "http://0.0.0.0:3457/";

// export const baseURL_2 = "http://
// ';'

export const baseURL = "https://afroplaybackend.peakbooks.biz/";


export const ToastTable = () => {

    return ( <
        ToastContainer position = "top-right"
        autoClose = {
            5000
        }
        hideProgressBar = {
            false
        }
        newestOnTop = {
            false
        }
        closeOnClick rtl = {
            false
        }
        theme = "colored"
        pauseOnFocusLoss draggable pauseOnHover /
        >
    )
}




export const errorToast = (statusMessage) => {
    return (
        toast.error(statusMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    )
}


export const terms3 = [{
        label: 'Due on Receipt',
        value: 'Due on Receipt',
    }, {
        label: 'Due in 15 days',
        value: 'Due in 15 days',
    }, {
        label: 'Due in 30 days',
        value: 'Due in 30 days',
    }, {
        label: 'Due in 6 months',
        value: 'Due in 6 months',
    }

]


export const received_sent = [{
    label: 'Sent',
    value: 'sent',
}, {
    label: 'Received',
    value: 'received',
}]


export const delivery_terms_2 = [{
        label: 'Due on Receipt',
        value: 'Due on Receipt',
    }, {
        label: 'Due in 15 days',
        value: 'Due in 15 days',
    }, {
        label: 'Due in 30 days',
        value: 'Due in 30 days',
    }, {
        label: 'Due in 6 months',
        value: 'Due in 6 months',
    }

]




export const mdata = [{
        currency: 'KSH',
        label: 'KSH',
        value: 'KSH'
    }, {
        currency: 'USD',
        label: 'USD',
        value: 'USD'
    }

]


export const BUSINESS_TYPE = 'business'
export const successToast = (statusMessage) => {
    return (
        toast.success(statusMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    )
}


export const logout = () => {
    window.location.href = "/";
    // localStorage.removeItem("token");
}


//isLogged In

// localStorage.setItem("name", response.data.message.name)
// localStorage.setItem("user_role", response.data.message.role_id)
// localStorage.setItem("token", response.data.token)
// localStorage.setItem("role_name", response.data.message.role_name)
export const isLoggedIn = localStorage.getItem('isLoggedIn') ? true : false;
export const TOKEN = localStorage.getItem('token');
export const ROLE = localStorage.getItem('user_role');
export const MSISDN = localStorage.getItem('user_msisdn');
export const NAME = localStorage.getItem('name');
export const ROLE_NAME = localStorage.getItem('role_name');

// header configurations
export const CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
};

//currency
export const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "ABS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount).replaceAll('ABS', "");
};





export const STATE = localStorage.getItem('state');
export const FILE_NAME = localStorage.getItem('file_number_staff');


export const BRANCH_NAME = localStorage.getItem('branch_name');

export const MODULE_NAME = localStorage.getItem('module_name');

export const USER_ID = localStorage.getItem('user_id');


export const USER = localStorage.getItem('user');