import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { FileDropDown } from "./FileDropDown";
import { EventType, PostType } from "@/app/types";
import { get } from "lodash";

interface AddEditDialogProps {
  item: EventType | PostType;
  onChange: (key: string, value: any) => void;
  onClose: () => void;
  onConfirm: (e: any) => Promise<void>;
  includeIsMain?: boolean;
  includeDate?: boolean;
}

export default function AddEditDialog({
  item,
  onChange,
  onConfirm,
  onClose,
  includeDate = false,
  includeIsMain = false,
}: AddEditDialogProps) {
  return (
    <div className="absolute w-[100vw] h-[100vh] bg-gray-950 bg-opacity-60 z-10 top-0 left-0 flex justify-center items-center">
      <div className=" max-w-2xl bg-gray-100 p-6 rounded-md">
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
                <span className="label-text">Event Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={item.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="meat up at..."
              />
            </div>
            {includeDate && (
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={get(item, "date", "")}
                  onChange={(e) => onChange("date", e.target.value)}
                  placeholder="10 11 2023 15:30"
                />
              </div>
            )}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Files</span>
              </label>
              <FileDropDown
                onChange={(value) => onChange("files", value)}
                urls={item.files || []}
              />
            </div>
            {includeIsMain && (
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Is Main Event</span>
                </label>
                <input
                  type="checkbox"
                  checked={get(item, "isMain", false)}
                  className="toggle input input-bordered"
                  onChange={(e) => onChange("isMain", !get(item, "isMain", true))}
                />
              </div>
            )}
          </div>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={item.description}
                onChange={(e) => onChange("description", e.target.value)}
                className="textarea textarea-bordered w-full min-h-[300px]"
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