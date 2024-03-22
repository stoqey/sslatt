import { useApolloClient } from '@apollo/client';
import type { MediaDataType } from '@stoqey/client-graphql';
import {
  AlignContent,
  Button,
  ButtonSize,
  ButtonType,
  Display,
  FlexDirection,
  Icon,
  JustifyContent,
  Layout,
  LoadingButton,
  LoadingStatus,
  Modal,
  ModalHeader,
  ModalSize,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import type { ReactChild } from 'react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { cdnPath } from '@/lib/utils/api.utils';

import styles from './style';
import { uploadFilesApiRest } from './Upload.api';
import type { IFileSpec } from './Upload.interfaces';

const {
  thumbButton,
  thumbsContainer,
  thumb,
  thumbInner,
  img,
  dropZoneStyle,
}: any = styles;

interface Props {
  defaultFiles?: IFileSpec[];
  accepts?: string;
  onChangeFiles?: (files: IFileSpec[]) => any;
  multi?: boolean;
  Placeholder?: ReactChild;
  Preview?: (props: IFileSpec) => JSX.Element;
}

interface State {
  show: boolean;
  loading: boolean;
}

export function DropAreaModal(props: Partial<Props>) {
  const {
    accepts = 'image/*',
    multi = true,
    onChangeFiles = () => {},
    Placeholder,
    defaultFiles = [],
    Preview,
  } = props;
  const client = useApolloClient();

  const [state, setState] = React.useState<State>({
    show: false,
    loading: false,
  });

  const [files, setFiles] = useState<IFileSpec[]>(defaultFiles);
  const [filesBlobs, setFileBlobs] = useState<File[]>([]);

  const { show, loading } = state;

  const hide = () => setState({ ...state, show: !show });
  const setShow = (sh: boolean) => setState({ ...state, show: sh });
  const setLoading = (load: boolean) => setState({ ...state, loading: load });

  const { getRootProps, getInputProps } = useDropzone({
    multiple: multi,
    accept: accepts,
    onDrop: (acceptedFiles) => {
      const currentFiles = files;
      const newFiles: IFileSpec[] = acceptedFiles.map((file) => ({
        filename: file.name,
        preview: URL.createObjectURL(file),
        uploaded: false,
      }));

      if (multi) {
        setFiles([...currentFiles, ...newFiles]);
        setFileBlobs([...filesBlobs, ...acceptedFiles]);
      } else {
        setFiles(newFiles);
        setFileBlobs(acceptedFiles);
      }
    },
  });

  const removeFile = (filePreview) => {
    const newFiles = files.filter((file) => file.preview !== filePreview);
    setFiles(newFiles);
    onChangeFiles(newFiles);
  };

  // const editImage = (image, done) => {
  //     const imageFile = image;
  //     const imageState = {};
  //     create({
  //         // recreate previous state
  //         ...imageState,

  //         // load original image file
  //         src: imageFile,
  //         outputData: true,

  //         onconfirm: ({ file, data }) => {
  //             Object.assign(file, {
  //                 doka: { file: imageFile, data }
  //             });
  //             done(file);
  //         }
  //     });
  // };

  const thumbs = (selectedFiles: IFileSpec[]) =>
    selectedFiles &&
    selectedFiles.map((file) => {
      if (!file) return undefined;
      if (Preview)
        return (
          <Layout key={file.preview} onClick={() => setShow(true)}>
            <Preview {...file} />
          </Layout>
        );
      return (
        <div
          style={{
            ...thumb,
            border: `1px solid ${file.uploaded ? 'green' : 'red'}`,
          }}
          key={file.preview}
        >
          <div style={thumbInner}>
            <img src={file.preview} style={img} />
          </div>
          {/* <Button
                    size="mini"
                    overrides={{
                        BaseButton: {
                            style: () => {
                                return {
                                    ...thumbButton,
                                };
                            },
                        },
                    }}
                    onClick={() => {
                        const fileToEdit = filesBlobs.find(f => f.name === file.filename);

                        editImage(fileToEdit, (output) => {
                            const updatedFiles = [...files];

                            // replace original image with new image
                            // updatedFiles[index] = output;

                            // revoke preview URL for old image
                            // if (file.preview) URL.revokeObjectURL(file.preview);

                            // set new preview URL
                            // Object.assign(output, {
                            //     preview: URL.createObjectURL(output)
                            // });

                            // // update view
                            // setFiles(updatedFiles);
                        })
                    }
                    }
                >
                    edit
                </Button>
                 */}
          <div
            style={{ position: 'absolute' }}
            onClick={() => removeFile(file.preview)}
          >
            <Icon asset={SVGAsset.Close} />
          </div>
        </div>
      );
    });

  const unsavedFiles =
    files && !isEmpty(files)
      ? files.filter((file) => file && !file.uploaded)
      : [];

  const hasUnsavedFiles = !isEmpty(unsavedFiles);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !isEmpty(files) &&
        files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (!isEmpty(defaultFiles)) setFiles(defaultFiles);
    },
    [defaultFiles],
  );

  // upload files api
  const uploadFiles = (selectedFiles: File[]) =>
    uploadFilesApiRest({
      files: selectedFiles,
      error: async () => {
        setLoading(false);
      },
      success: async (dataFiles) => {
        setLoading(false);
        if (!isEmpty(dataFiles)) {
          const newFiles: MediaDataType[] = dataFiles.map((f) => ({
            ...f,
            url: cdnPath(f.path),
            preview: cdnPath(f.path),
            uploaded: true,
          }));

          const combinedFile: IFileSpec[] = files.map((ff) => {
            const contains = newFiles.find((i) => i.filename === ff.filename);
            if (contains) {
              return contains as any;
            }
            return ff;
          });

          onChangeFiles(combinedFile);
          setFiles(combinedFile);
        }
      },
    });

  // upload file
  const onSaveFiles = () => {
    const unsavedFilesNamesIds = (files || [])
      .filter((file) => file && !file.uploaded)
      .map((f) => f.filename);
    const unsavedBlogFilesNamesIds = (filesBlobs || []).map((f) => f.name);

    console.log('unsavedFilesNamesIds', unsavedFilesNamesIds);
    console.log('unsavedBlogFilesNamesIds', unsavedBlogFilesNamesIds);

    const unsavedBlobs: any[] = filesBlobs.filter((file) =>
      unsavedFilesNamesIds.includes(file.name),
    );

    if (!isEmpty(unsavedBlobs)) {
      setLoading(true);
      uploadFiles(unsavedBlobs);
    }
  };

  const renderAddPlaceholder = () => {
    return !isEmpty(Placeholder) ? (
      <div onClick={hide}>{Placeholder}</div>
    ) : (
      <div onClick={hide} style={{ ...dropZoneStyle, width: 200, height: 200 }}>
        <Button
          style={{ width: '100%', height: '100%' }}
          variant={ButtonType.Secondary}
          onClick={hide}
          icon={SVGAsset.MediaImage}
          size={ButtonSize.Large}
        />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Preview selector */}
      <div style={{ padding: '10px', marginBottom: '20px' }}>
        <aside style={thumbsContainer}>
          {thumbs(!isEmpty(files) && files.filter((i) => i && i.uploaded))}

          {/* Placeholder */}
          {isEmpty(files) && renderAddPlaceholder()}

          {!isEmpty(files) && multi && renderAddPlaceholder()}
        </aside>
      </div>

      <Modal
        onRequestClose={() => {
          if (hasUnsavedFiles) {
            return onSaveFiles();
          }
          hide();
        }}
        show={show}
        size={ModalSize.Large}
      >
        <>
          <ModalHeader
            title={`Drag 'n' drop some files here, or click to select files`}
            size={ModalSize.Small}
          />
          {/* Grid of 3X3 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <section
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <div {...getRootProps()} style={dropZoneStyle}>
                <input {...getInputProps()} />
                <aside style={thumbsContainer}>{thumbs(files)}</aside>
              </div>
            </section>
          </div>

          {/* Footer */}
          <Layout
            padding={1}
            display={Display.Flex}
            justifyContent={JustifyContent.Center}
            alignContent={AlignContent.Center}
            alignItems={AlignContent.Center}
            flexDirection={FlexDirection.Column}
          >
            {/* {hasUnsavedFiles && ( */}
            <LoadingButton
              icon={SVGAsset.New}
              onClick={onSaveFiles}
              variant={ButtonType.Primary}
              loadingStatus={
                loading ? LoadingStatus.Loading : LoadingStatus.Default
              }
            >
              Save
            </LoadingButton>
            {/* )} */}

            {/* Saved files status count */}
            {hasUnsavedFiles && <p>{unsavedFiles.length} unsaved</p>}
          </Layout>
        </>
      </Modal>
    </div>
  );
}
