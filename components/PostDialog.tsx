import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { PostType } from "@/app/types";
import { FileDropDown } from "./FileDropDown";

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
      <div className=" max-w-3xl bg-gray-100 p-6 rounded-md">
        <div className="flex justify-between item-center mb-5">
          <div className="text-xl font-bold">Add / Edit Event</div>
          <div className="btn btn-sm btn-circle" onClick={onClose}>
            <Close />
          </div>
        </div>
        <form className="grid grid-cols-2 gap-4">
          <div>
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
              <textarea
                value={item.subtitle}
                onChange={(e) => onChange("subtitle", e.target.value)}
                className="textarea textarea-bordered w-full min-h-[150px]"
                placeholder="what will we do?"
              ></textarea>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Files</span>
              </label>
              <FileDropDown
                onChange={(value) => onChange("files", value)}
                urls={item.files || []}
              />
            </div>
          </div>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={item.description}
                onChange={(e) => onChange("description", e.target.value)}
                className="textarea textarea-bordered w-full min-h-[400px]"
                placeholder="what will we do?"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end col-span-2 mt-10">
            <button
              onClick={onConfirm}
              className="btn max-w-xs bg-gray-900 text-gray-50"
              type="submit"
            >
              <AddIcon />
              Add / Edit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
