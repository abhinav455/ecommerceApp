import React, { useEffect,useState, useRef, Fragment } from "react";
import {
  getProfile,
  createProfile,
  deleteAccount,
} from "../../../actions/profileActions";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { decodeUser } from "../../../util";
import { Modal, Button, message, Popconfirm } from "antd";


const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});


const Profile = connect(mapStateToProps, {
  getProfile,
  createProfile,
  deleteAccount,
})((props) => {

  
  const initialState = {
    profile: null,
    visible: false,
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

  let firstUpdate = useRef(true);  
  useEffect(() => {  
    // if(firstUpdate.current){
    //     firstUpdate.current = false;
    //     return;
    // }
    
    //componentdidmount   
     props.getProfile(decodeUser().user.id);
  }, []);


  //component will receive props
  let firstUpdate2 = useRef(0);        
  useEffect(() => {  
    if(firstUpdate2.current<1){ //2
        firstUpdate2.current++;
        return;
    }

    if (
      props &&
      props.profile && props.profile.profile && props.profile.profile.socialMedia
    ) {
      const profile = props.profile.profile;
      setState({
        ...state,
        profile,
        address: profile.address,
        bio: profile.bio,
        website: profile.website,
        facebook: profile.socialMedia.facebook,
        linkedin: profile.socialMedia.linkedin,
        youtube: profile.socialMedia.youtube,
        instagram: profile.socialMedia.instagram,
        twitter: profile.socialMedia.twitter,
      });
    }
  }, [props.profile]);



  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const handleOk = (e) => {
    console.log(e);
    setState({
      ...state,
      visible: false,
    });
  };

  const handleCancel = (e) => {
    setState({
      ...state,
      visible: false,
    });
  };

  const confirm = (e) => {
    e.preventDefault();
    props.deleteAccount(navigate);
  };

  const cancel = (e) => {
    message.error("Nothing has been done to your account");
  };

  const displayProfile = (profile) => {
    return (
      <div className="custom-border">
        <div className="container" style={{ marginTop: "2rem" }}>
          <span>
            <label>
              <h4>Address: </h4>
            </label>
            <h4 className="inline-padding">{profile.address}</h4>
          </span>
          <br />
          <span>
            <label>
              <h4>Bio: </h4>
            </label>
            <h4 className="inline-padding">{profile.bio}</h4>
          </span>
          <br />
          <span>
            <label>
              <h4>Website: </h4>
            </label>
            <h4 className="inline-padding">{profile.website}</h4>
          </span>
          <h4>Below are your Social Media Links</h4>
          <div>
            <ul>
              <li>
                <h5>{profile.socialMedia.facebook}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.instagram}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.twitter}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.youtube}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.linkedin}</h5>
              </li>
            </ul>
          </div>
          <br />
          <button className="btn btn-primary" onClick={showModal}>
            {" "}
            Edit Profile
          </button>
          <Popconfirm
            title="This will delete all your records with eShop. Do you want to proceed?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-primary"> Delete your Record</button>
          </Popconfirm>
        </div>
      </div>
    );
  };

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
    window.location.reload();
  };
  


  return (
    <div className="container">
      <h2>Welcome {props.auth.user.name}</h2>  
      {state.profile ? (
        <Fragment>
          <h4>This is your present profile</h4>
          {displayProfile(state.profile)}
        </Fragment>
      ) : (
        <Fragment>
          <span style={{ paddingRight: "2%" }}>
            You currently dont have a Profile
          </span>
          <Link className="btn btn-primary" to="/dashboard/addProfile">
            {" "}
            Create Profile
          </Link>
        </Fragment>
      )}
      <Modal
        title="Basic Modal"
        open={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>
            Edit Profile
          </Button>,
        ]}
      >
        <form className="form">
          <div className="form-group modal-input">
            <input
              style={{ width: "450px" }}
              type="text"
              name="address"
              value={state.address}
              onChange={onChange}
            />
            <small className="form-text">
              Give us the address of your company
            </small>
          </div>
          <div className="form-group modal-input">
            <input
              style={{ width: "450px" }}
              type="text"
              name="website"
              value={state.website}
              onChange={onChange}
            />
            <small className="form-text">
              Complete if you have a company website
            </small>
          </div>
          <br />
          <div className="form-group">
            <textarea
              style={{ width: "450px" }}
              name="bio"
              value={state.bio}
              onChange={onChange}
            ></textarea>
            <small className="form-text">
              Tell us a little about busines
            </small>
          </div>
          <br />
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="twitter"
              value={state.twitter}
              onChange={onChange}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="facebook"
              value={state.facebook}
              onChange={onChange}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="youtube"
              value={state.youtube}
              onChange={onChange}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="linkedin"
              value={state.linkedin}
              onChange={onChange}
            />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input
              style={{ width: "380px" }}
              type="text"
              name="instagram"
              value={state.instagram}
              onChange={onChange}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
  
});



export default Profile;
