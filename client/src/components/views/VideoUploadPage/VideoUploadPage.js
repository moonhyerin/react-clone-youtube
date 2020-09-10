import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import Axios from 'axios'

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]
const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" }
]

//React Hook이 나온 이후로는 퍼포먼스가 좋은 functional component를 쓰는게 일반적
function VideoUploadPage() {

    //상태를 state로 관리
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)   //private 0 , public 1
    const [Category, setCategory] = useState("Film & Animation")

    //function
    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) => {
        let formData = new FormData;

        //파일을 보낼 때 오류를 막기 위한 헤더 설정
        const config = {
            header: {'content-type':'multipart/form-data'}
        }
        
        formData.append("file", files[0]);

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success) {
                console.log(response.data)
            } else {
                alert('Upload Failed')
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto', }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop Zone */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>

                    {/* Thumbnail */}
                    <div>
                        <img src alt />
                    </div>
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
