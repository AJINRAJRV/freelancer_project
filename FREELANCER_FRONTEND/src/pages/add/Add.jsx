import React, { useEffect, useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer.js";
import upload from "../../utils/upload.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser._id && !state.userId) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: { name: "userId", value: currentUser._id },
      });
    }
  }, [state.userId]);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  // const handleUpload = async () => {
  //   if (!singleFile || files.length === 0) {
  //     setUploadMessage("❌ Please select a cover image and at least one additional image.");
  //     return;
  //   }

  //   setUploading(true);
  //   setUploadMessage("📤 Uploading images...");

  //   try {
  //     const cover = await upload(singleFile);
  //     const images = await Promise.all(files.map(async (file) => await upload(file)));

  //     dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
  //     setUploadMessage("✅ Upload successful!");
  //   } catch (err) {
  //     setUploadMessage("❌ Image upload failed. Please try again.");
  //   }

  //   setUploading(false);
  // };

  const handleUpload = async () => {
    if (!singleFile) {
      setUploadMessage("❌ Please select a cover image.");
      return;
    }
    if (files.length === 0) {
      setUploadMessage("❌ Please select at least one additional image.");
      return;
    }
  
    setUploading(true);
    setUploadMessage("📤 Uploading images...");
  
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        Array.from(files).map(async (file) => await upload(file))
      );
  
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      setUploadMessage("✅ Upload successful!");
    } catch (err) {
      setUploadMessage("❌ Image upload failed. Please try again.");
      console.error("Image upload error:", err);
    }
  
    setUploading(false);
  };
  

  const validateForm = () => {
    let errors = {};
    if (!state.title) errors.title = "Title is required";
    if (!state.cat) errors.cat = "Category is required";
    if (!state.desc) errors.desc = "Description is required";
    if (!state.shortTitle) errors.shortTitle = "Service title is required";
    if (!state.shortDesc) errors.shortDesc = "Short description is required";
    if (!state.deliveryTime) errors.deliveryTime = "Delivery time is required";
    if (!state.revisionNumber) errors.revisionNumber = "Revision number is required";
    if (!state.price) errors.price = "Price is required";
    if (!state.cover || state.images.length === 0) errors.images = "Please upload images";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async (gig) => {
      const res = await newRequest.post("/gigs", gig);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("📝 Submitting Gig Data:", state);
  
    if (!validateForm()) {
      console.error("❌ Form validation failed!", formErrors);
      return;
    }
  
    if (!state.userId) {
      console.error("❌ Missing userId in state!", state);
      return;
    }
  
    if (!state.cover || state.images.length === 0) {
      console.error("❌ Cover image or additional images are missing!");
      return;
    }
  
    mutation.mutate(state);
  };
  

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            {/* <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            /> */}
            <input type="text" name="title" onChange={handleChange} placeholder="e.g. I will do something great" />
            {formErrors.title && <p className="error">{formErrors.title}</p>}

            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange} defaultValue="">
              <option value="" disabled>Select a category</option>
              <option value="Design">Design</option>
              <option value="Web">Web Development</option>
              <option value="Animation">Animation</option>
              <option value="Music">Music</option>
              <option value="Writing">Writing & Translation</option>
              <option value="Marketing">Digital Marketing</option>
              <option value="Video">Video Editing</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Programming">Programming & Tech</option>
              <option value="Business">Business & Consulting</option>
              <option value="Finance">Finance & Accounting</option>
              <option value="AI">AI & Machine Learning</option>
              <option value="Voiceover">Voice Over</option>
              <option value="Data">Data Science & Analytics</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Gaming">Game Development</option>
              <option value="Legal">Legal Services</option>
            </select>
            {formErrors.cat && <p className="error">{formErrors.cat}</p>}


            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload} className={uploading ? "uploading" : ""}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
              {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
            </div>
            {formErrors.images && <p className="error">{formErrors.images}</p>}

            <label htmlFor="">Description</label>
            {/* <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea> */}
            <textarea name="desc" onChange={handleChange} placeholder="Describe your service"></textarea>
            {formErrors.desc && <p className="error">{formErrors.desc}</p>}

            <button onClick={handleSubmit}>Create</button>
            {formErrors.submit && <p className="error">{formErrors.submit}</p>}
          </div>
          <div className="details">
          <label>Service Title</label>
            <input type="text" name="shortTitle" onChange={handleChange} placeholder="e.g. One-page web design" />
            {formErrors.shortTitle && <p className="error">{formErrors.shortTitle}</p>}

            <label>Short Description</label>
            <textarea name="shortDesc" onChange={handleChange} placeholder="Short description of your service"></textarea>
            {formErrors.shortDesc && <p className="error">{formErrors.shortDesc}</p>}

            <label>Delivery Time</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            {formErrors.deliveryTime && <p className="error">{formErrors.deliveryTime}</p>}

            <label>Revision Number</label>
            <input type="number" name="revisionNumber" onChange={handleChange} />
            {formErrors.revisionNumber && <p className="error">{formErrors.revisionNumber}</p>}

            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
            {formErrors.price && <p className="error">{formErrors.price}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;