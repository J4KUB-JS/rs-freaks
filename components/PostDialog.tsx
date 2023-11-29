import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { PostType } from "@/app/types";
import { FileDropDown } from "./FileDropDown";
import { TextEditor } from "./TextEditor";

interface PostDialogProps {
  item: PostType;
  onChange: (key: string, value: any) => void;
  onClose: () => void;
  onConfirm: (e: any) => Promise<void>;
}

export default function PostDialog({
  item,
  onChange,
  onConfirm,
  onClose,
}: PostDialogProps) {
  return (
    <div className="absolute w-[100%] h-[100vh] bg-gray-950 bg-opacity-60 z-10 top-0 left-0 flex justify-center items-center">
      <div className="max-w-3xl bg-gray-100 p-6 rounded-md h-[750px]">
        <div className="flex justify-between item-center mb-5">
          <div className="text-xl font-bold">{item.id ? "Edit" : "Add"} Blog Post</div>
          <div className="btn btn-sm btn-circle" onClick={onClose}>
            <Close />
          </div>
        </div>

        <div className="h-[650px]">
          <form className="grid grid-cols-2 gap-4 overflow-auto h-[550px] px-2 pb-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={item.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="meat up at..."
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Sub Title</span>
              </label>
              <input
                value={item.subtitle}
                onChange={(e) => onChange("subtitle", e.target.value)}
                className="input input-bordered w-full"
                placeholder="catchy phrase"
              />
            </div>

            <div className="form-control w-full col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <TextEditor
                value={item.description}
                onChange={(value) => onChange("description", value)}
                placeholder="what will we do?"
              />
            </div>

            <div className="form-control w-full col-span-1">
              <label className="label">
                <span className="label-text">Files</span>
              </label>
              <FileDropDown
                onChange={(value) => onChange("files", value)}
                urls={item.files || []}
              />
            </div>
          </form>
          <div className="flex justify-end items-center col-span-2 mt-10 gap-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Highlight</span>
              </label>
              <input
                type="checkbox"
                checked={item.highlight}
                className="toggle input input-bordered"
                onChange={(e) => onChange("highlight", !item.highlight)}
              />
            </div>
            <button
              onClick={onConfirm}
              className="btn max-w-xs bg-gray-900 text-gray-50"
              type="submit"
            >
              <AddIcon />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
