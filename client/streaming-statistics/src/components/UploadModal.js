import React, { useState } from "react";
import { Button } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { TimezonePicker } from "baseui/timezonepicker";
import { Input } from "baseui/input";
import { Modal, ModalHeader, ModalBody, SIZE } from "baseui/modal";
import { Banner, HIERARCHY, KIND } from "baseui/banner";
import { useStyletron } from "styletron-react";
const axios = require("axios");

const UploadModal = ({ getResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(false);
  const [timezone, setTimezone] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [css, theme] = useStyletron();

  const close = () => {
    setIsOpen(false);
    setData(false);
    setErrorMessage(null);
  };

  const validateFile = (acceptedFile, rejectedFile) => {
    const [file] = acceptedFile.target.files;
    if (errorMessage) setErrorMessage("");

    if (file.type !== "text/csv") {
      setErrorMessage({
        title: "Invalid file type",
        msg: "Only .csv files allowed.",
      });
      return;
    }
    if (errorMessage) setErrorMessage(null);
    setData(!data);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append("csv", e.target[0].files[0]);
    formData.append("timezone", timezone);

    try {
      const response = await axios.post(`/api/upload/csv/netflix`, formData);
      setIsOpen(false);
      getResponse(response);
    } catch (error) {
      setErrorMessage({
        title: "Required columns missing",
        msg: error.response.data.msg,
      });
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Upload File</Button>
      <Modal onClose={close} isOpen={isOpen} size={SIZE.default}>
        {errorMessage ? (
          <Banner
            title={errorMessage.title}
            kind={KIND.negative}
            hierarchy={HIERARCHY.high}
            overrides={{
              Root: { style: { width: "85%" } },
            }}
          >
            {errorMessage.msg}
          </Banner>
        ) : (
          <></>
        )}
        <ModalHeader>Select CSV File</ModalHeader>
        <ModalBody>
          <form
            action=""
            encType="multipart/form-data"
            name="csv"
            onSubmit={onSubmit}
          >
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
                onChange={({ id }) => setTimezone(id)}
              />
            </React.Fragment>
            <div
              className={css({
                margin: "2rem auto",
                display: "flex",
                justifyContent: "center",
              })}
            >
              <Button disabled={data ? false : true} isLoading={isLoading}>
                Submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default UploadModal;
