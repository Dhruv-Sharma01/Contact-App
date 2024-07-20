import React from "react";
import user from '../images/user.png';
import { Link, useLocation } from "react-router-dom";

const ContactDetail = () => {
    const location = useLocation();
    const { contact } = location.state || {}; // Handle case where location.state might be undefined

    if (!contact) {
        return <div>Contact details not found.</div>;
    }

    const { name, email } = contact;
    
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header"> {name} </div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to='/'><button className="ui button blue center">
                    Back to Contact List
                </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;
