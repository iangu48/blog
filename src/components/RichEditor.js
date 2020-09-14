import React, {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {storage} from "../firebase";

class RichEditor extends Component {
    constructor(props) {
        super(props);

    }

    uploadHandler = (blobInfo, success, failure, progress) => {
        const name = `${Date.now()}-${blobInfo.filename()}`
        const uploadTask = storage.ref(`/images/${name}`).put(blobInfo.blob());
        uploadTask.on("state_changed", progress, failure, () => {
            storage
                .ref("images")
                .child(name)
                .getDownloadURL()
                .then((url) => {
                    success(url);
                });
        });
    }

    handleEditorChange = (e) => {
        console.log(
            'Content was updated:',
            e.target.getContent()
        );
    }

    render() {
        return (
            <Editor
                initialValue={this.props.content}
                apiKey={process.env.REACT_APP_TINYMCE_API}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help | insert image',
                    images_upload_handler: this.uploadHandler,
                    image_uploadtab: true,

                }}
                onEditorChange={this.props.onEditorChange}
            />
        );
    }
}

export default RichEditor;

