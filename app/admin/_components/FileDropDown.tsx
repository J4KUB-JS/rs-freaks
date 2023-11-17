import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { Close } from "@mui/icons-material";

interface FileDropDownProps {
  urls: { preview: string }[];
  isError?: boolean;
  errorMessage?: string;
  onChange: (value: any) => void;
  label?: string;
  onClose?: () => void;
  onUpload?: (e: any) => void;
  asDialog?: boolean;
}

export const FileDropDown = ({
  urls,
  onChange,
  label,
  onUpload,
  onClose,
  asDialog = false,
}: FileDropDownProps) => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    setFiles(urls);
  }, [urls]);

  const onDrop = useCallback((filesDropped: any) => {
    if (filesDropped?.length) {
      setFiles((previousFiles) => {
        const filesToAdd: any[] = filesDropped.map((file: any) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });

        onChange([...previousFiles, ...filesToAdd]);

        return [...previousFiles, ...filesToAdd];
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.file));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => {
      onChange(files.filter((file) => file.name !== name));
      return files.filter((file) => file.name !== name);
    });
  };

  const getFileUpload = () => (
    <div>
      <div
        {...getRootProps({
          className: "p-8 border-2 border-gray-300 rounded-md cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
          <CloudUploadIcon className="w-5 h-5 fill-current" />
          <div>
            Drag and Drop or <span className="underline">click</span> to choose
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-4 gap-5 max-h-[200px] overflow-y-scroll pr-2 ${
          files.length !== 0 ? "mt-6" : ""
        }`}
      >
        {files.map((file, index) => (
          <div
            key={index}
            className="relative rounded-md shadow-lg bg-white rounded-tr-md"
          >
            <Image
              src={file.preview}
              width={100}
              height={100}
              alt=""
              className="rounded-tr-md"
            />
            <button
              type="button"
              className="w-7 h-7 text-gray-50 bg-red-400 hover:text-red-500 hover:bg-red-300 rounded-tr-md rounded-bl-md  flex justify-center items-center absolute top-0 -right-0 transition-colors"
              onClick={() => removeFile(file.name)}
            >
              <CloseIcon
                fontSize="small"
                className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {asDialog ? (
        <div className="absolute w-[100vw] h-[100vh] bg-gray-950 bg-opacity-60 z-10 top-0 left-0 flex justify-center items-center">
          <div className=" max-w-2xl bg-gray-100 p-6 rounded-md">
            <div className="flex justify-between item-center mb-5">
              <div className="text-xl font-bold">Upload File</div>
              <div className="btn btn-sm btn-circle" onClick={onClose}>
                <Close />
              </div>
            </div>
            {getFileUpload()}
            {onUpload && (
              <div className="flex justify-end">
                <button className="btn bg-gray-300 mt-5" onClick={onUpload}>
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>{getFileUpload()}</>
      )}
    </>
  );
};