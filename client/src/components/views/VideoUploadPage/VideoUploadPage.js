import React from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'

const { Title } = Typography;
const { TextArea } = Input;

//React Hook이 나온 이후로는 퍼포먼스가 좋은 functional component를 쓰는게 일반적
function VideoUploadPage() {
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto', }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop Zone */}
                    <Dropzone 
                        onDrop 
                        multiple
                        maxSize
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
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
                    onChange
                    value
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea 
                    onChange
                    value
                />
                <br />
                <br />
                
                <select onChange>
                    <optiom key value></optiom>
                </select>
                <br />
                <br />
                <select onChange>
                    <optiom key value></optiom>
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
