import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../config';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0000007a;
    align-items: center;
    display: flex;
    justify-content: center;
    
`

const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    box-shadow: 0 .125rem .0rem rgba(0,0,0,.075) !important;
`

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: red;
    font-size: 2rem;
 
`

const Title = styled.h1`
    text-align: center;
`

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`
const Desc = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
border: 1px solid ${({ theme }) => theme.soft};
`

const Label = styled.label`
font-size: 14px;
`


export const Upload = ({ setOpen }) => {

    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [imagePercentage, setImagePercentage] = useState(0);
    const [videoPercentage, setVideoPercentage] = useState(0);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    }

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }

    const uploadFile = (file, urlType) => {

        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            urlType === "imgUrl" ? setImagePercentage(Math.round(progress)) : setVideoPercentage(Math.round(progress));
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log('error',error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev) => {
                    return { ...prev, [urlType]: downloadURL };
                  });
            });
          }
        );
      };

      useEffect(() => {
        video && uploadFile(video , "videoUrl");
      }, [video]);
    
      useEffect(() => {
        image && uploadFile(image, "imgUrl");
      }, [image]);
    
      const handleUpload = async ()=>{
        console.log(JSON.stringify(inputs, undefined, 4));

        await axiosInstance.post("/videos", {...inputs, tags}).then((res)=>{
            if(res.status===200){
                navigate(`/video/${res.data._id}`);
                setOpen(false)
            }
         
            console.log(res?.data);
        }).catch((err)=>{
            console.log('upload',err);
        })
     
      }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                {videoPercentage > 0 ? (
                    "Uploading:" + videoPercentage
                ) : (
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                )}
                <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <Desc
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Separate the tags with commas."
                    onChange={handleTags}
                />
                <Label>Image:</Label>
                {imagePercentage > 0 ? (
                    "Uploading:" + imagePercentage + "%"
                ) : (
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                )}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}
