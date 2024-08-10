import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServer } from "../../../util";
import axios from "axios";
import { Button, notification } from "antd";
import UploadImages from "../../general/UploadImages";

const AddImages = (props) => {

  let params= useParams();
  let [fileList, setfileList] = useState([]);
  
  const  uploadFile = (e) => {
    const data = new FormData();

    const url = `${getServer()}/api/products/upload/thumbnail?productId=${params.id}`;
    const target = e.target.files[0];
    data.append("file", target);
    axios({
      method: "post",
      url,
      data,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          notification.info({
            message: `Image Upload`,
            description: res.data.msg,
            placement: "topRight",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = ({ fileList }) => setfileList(fileList );

  const uploadImage = (file) => {
    const data = new FormData();
    const url = `${getServer()}/api/products/upload/thumbnail?productId=${params.id}&multiple=true`;
    const target = file.originFileObj;
    data.append("file", target);
    axios({
      method: "post",
      url,
      data,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          notification.info({
            message: `Image Upload`,
            description: res.data.msg,
            placement: "topRight",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImages = async () => {
    const request = fileList.map((file) => uploadImage(file));
    await Promise.all(request);
    setfileList([]);
  };

    return (
      <div>
        <p className="lead">Update your product thumbnail</p>
        <input type="file" name="file" onChange={uploadFile}
        />
        <br />
        <br />
        <div>
          <p className="lead">Upload Images for your product</p>
          <UploadImages
            fileList={fileList}
            handleChange={handleChange}
          />
          <br/>
          <Button
            type="primary"
            onClick={() => uploadImages()}
          >
            Submit Images
          </Button>
         </div> 
      </div>
    );
}

export default AddImages;
