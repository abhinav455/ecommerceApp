import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProfile } from "../../../actions/profileActions";
import { connect } from "react-redux";
import { message } from "antd";


const mapStateToProps = (state) => ({
  profile: state.profile,
});


const addProfile = connect(mapStateToProps, { createProfile })(
  (props) => {
 
  

  const initialState = {
    address: "",
    bio: "",
    website: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    twitter: "",
  };

  let [state, setState] = useState(initialState);
  let navigate = useNavigate();
  

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (state.address.length <= 0) {
      return message.error("Your Address field is required");
    }
    if (state.bio.length <= 0) {
      return message.error("Your Bio field is required");
    }

    props.createProfile(state, navigate);
  };


  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* is a required field</small>
        <form className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={state.address}
              onChange={onChange}
            />
            <small className="form-text">
              Give us the address of your company
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={state.website}
              onChange={onChange}
            />
            <small className="form-text">
              Complete if you have a company website
            </small>
          </div>

          <div className="form-group">
            <textarea
              placeholder="A short description of your business"
              name="bio"
              value={state.bio}
              onChange={onChange}
            ></textarea>
            <small className="form-text">
              Tell us a little about busines
            </small>
          </div>

          <div className="my-2">
            <button type="button" className="btn btn-light">
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              type="text"
              placeholder="Twitter Link"
              name="twitter"
              value={state.twitter}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input
              type="text"
              placeholder="Facebook Link"
              name="facebook"
              value={state.facebook}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input
              type="text"
              placeholder="YouTube Link"
              name="youtube"
              value={state.youtube}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input
              type="text"
              placeholder="Linkedin Link"
              name="linkedin"
              value={state.linkedin}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input
              type="text"
              placeholder="Instagram Link"
              name="instagram"
              value={state.instagram}
              onChange={onChange}
            />
          </div>
          <button className="btn btn-primary my-1" onClick={onSubmit}>
            {" "}
            Submit
          </button>
          <Link className="btn btn-light my-1" to="/dashboard/profile">
            <i className="fas fa-undo-alt"></i>Go Back
          </Link>
        </form>
      </section>
    </div>
  );
  
});



export default addProfile;
