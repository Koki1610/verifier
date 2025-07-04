import { useFileStore, acceptedFileExtensions } from "../lib/useFileStore";
import { useDropzone } from "react-dropzone";
import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { CenteringBox, IconBox, TitleBox, TitleText } from "./Common.styled";
import sourcesDefault from "../assets/sources.svg";
import sourcesVerified from "../assets/verified-bold.svg";
import { AppButton } from "./AppButton";
import upload from "../assets/upload.svg";
import { styled } from "@mui/system";
import { STEPS, usePublishStore } from "../lib/usePublishSteps";
import { useAddressInput } from "../lib/useAddressInput";

const FilesDropzone = styled(CenteringBox)({
  justifyContent: "center",
  backgroundColor: "#F7F9FB",
  textAlign: "center",
  height: 148,
  overflow: "hidden",
  border: "1px dashed #E3E8EA",
  color: "#728A96",
  borderRadius: 20,
  lineHeight: 148,
  cursor: "pointer",
  "&:hover": {
    border: "1px dashed #9da3a5",
  },
});

export function FileUploaderArea() {
  const { addFiles, hasFiles } = useFileStore();
  const { step } = usePublishStore();
  const isExtraSmallScreen = useMediaQuery("(max-width: 450px)");
  const { active } = useAddressInput();

  const onDrop = (acceptedFiles: any) => {
    addFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/plain": acceptedFileExtensions.map((ext) => `.${ext}`) },
    // noClick: true,
  });

  return (
    <>
      <TitleBox mb={1}>
        <CenteringBox
          sx={{
            justifyContent: "space-between",
            width: "100%",
            flexDirection: isExtraSmallScreen ? "column" : "inherit",
          }}>
          <CenteringBox mb={isExtraSmallScreen ? 2 : 0} sx={{ width: "100%" }}>
            <IconBox>
              <img
                src={step === STEPS.PUBLISH ? sourcesVerified : sourcesDefault}
                alt="Block icon"
                width={41}
                height={41}
              />
            </IconBox>
            <TitleText>Add sources</TitleText>
          </CenteringBox>
          {hasFiles() && step !== STEPS.PUBLISH && (
            <div {...getRootProps()}>
              <AppButton
                fontSize={12}
                fontWeight={700}
                hoverBackground="#e3e3e3"
                background="#F8F8F8"
                height={44}
                width={159}>
                <img src={upload} alt="Sources icon" width={19} height={19} />
                Upload source
              </AppButton>
            </div>
          )}
        </CenteringBox>
      </TitleBox>
      <Box sx={{ padding: "15px 30px" }}>
        <Box
          sx={{
            position: "relative",
            zIndex: active ? 0 : 4,
            transition: active ? "" : "1.5s z-index",
          }}>
          {!hasFiles() && (
            <FilesDropzone {...getRootProps()}>
              Drop sources ({acceptedFileExtensions.map((ext) => `.${ext}`).join(", ")}) here
            </FilesDropzone>
          )}
        </Box>

        <input
          {...getInputProps()}
          // onChange={onUploadFiles}
          onClick={(e) => {
            // @ts-ignore
            e.target.value = "";
          }}
          style={{ display: "none" }}
          id="fileUpload"
          type="file"
          multiple
          accept={acceptedFileExtensions.join(",")}
          // ref={inputRef}
          // @ts-ignore
        />
      </Box>
    </>
  );
}
