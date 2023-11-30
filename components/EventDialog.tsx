import dynamic from "next/dynamic";

import { Close } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { EventType } from "@/app/types";
import { FileDropDown } from "./FileDropDown";
import { DateInput } from "./DateInput";

const TextEditor = dynamic(() => import("./TextEditor").then((mod) => mod.TextEditor), {
  ssr: false,
});

interface EventDialogProps {
  item: EventType;
  onChange: (key: string, value: any) => void;
  onClose: () => void;
  onConfirm: (e: any) => Promise<void>;
}

export default function EventDialog({
  item,
  onChange,
  onConfirm,
  onClose,
}: EventDialogProps) {
  return (
    <div className="absolute w-[100%] h-[100vh] bg-gray-950 bg-opacity-60 z-10 top-0 left-0 flex justify-center items-center">
      <div className=" max-w-3xl bg-gray-100 p-6 rounded-md h-[750px]">
        <div className="flex justify-between item-center mb-5">
          <div className="text-xl font-bold">{item.id ? "Edit" : "Add"} Event</div>
          <div className="btn btn-sm btn-circle" onClick={onClose}>
            <Close />
          </div>
        </div>
        <div className="h-[650px]">
          <form className="grid grid-cols-2 gap-x-4 overflow-auto h-[550px] px-2 pb-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Event Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={item.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="Meat up name"
              />
            </div>

            <div className="form-control w-[full] flex flex-row gap-2">
              <div className="w-[70%]">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <DateInput
                  value={item.date}
                  onChange={(value) => onChange("date", value)}
                />
              </div>

              <div className="w-[30%]">
                <label className="label">
                  <span className="label-text">Hour</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={item.hour}
                  onChange={(e) => onChange("hour", e.target.value)}
                  placeholder="15:00"
                />
              </div>
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

            <div className="form-control w-full">
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
                <span className="label-text">Save as Main</span>
              </label>
              <input
                type="checkbox"
                checked={item.isMain}
                className="toggle input input-bordered"
                onChange={(e) => onChange("isMain", !item.isMain)}
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
