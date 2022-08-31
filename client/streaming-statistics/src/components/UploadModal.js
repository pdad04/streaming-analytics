import React, { useState } from "react";
import { Button } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { TimezonePicker } from "baseui/timezonepicker";
import { Input } from "baseui/input";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE
} from "baseui/modal";
import { useStyletron  } from "styletron-react";
const axios = require ("axios");

const UploadModal = ({ getResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(false);
  const [timezone, setTimezone] = useState(null);

  const [css, theme] = useStyletron();

  const close = () => {
    setIsOpen(false);
  };

  const validateFile = (acceptedFile, rejectedFile) => {
    const [file] = acceptedFile.target.files;
    if(file.type !== "text/csv") {
      setErrorMessage("Only .csv files allowed. Please upload a .csv file");
      return;
    }
    if(errorMessage) setErrorMessage("");
    setData(!data);
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();
    formData.append("csv", e.target[0].files[0]);
    formData.append("timezone", timezone);
    const response = await axios.post(`api/upload/csv/netflix`, formData);
    getResponse(response);
  }

  return(
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Upload File</Button>
      <Modal onClose={close} isOpen={isOpen} size={SIZE.default}>
        <ModalHeader>Upload CSV File</ModalHeader>
        <ModalBody>
          <form action="" encType="multipart/form-data" name="csv" onSubmit={onSubmit}>
            <Input
                type="file"
                positive={data && !errorMessage ? true : false}
                error={errorMessage ? true : false}
                onChange={validateFile}
            />
            <React.Fragment>
              <ModalHeader>Choose Timezone</ModalHeader>
              <TimezonePicker 
                value={timezone}
                onChange={({id}) => setTimezone(id)}
              />
            </React.Fragment>
            <React.Fragment>
              <Button disabled={data ? false : true}>Submit</Button>
            </React.Fragment>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default UploadModal;