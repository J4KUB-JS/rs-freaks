import { Event } from "../page";
import AddIcon from "@mui/icons-material/Add";

interface EventDialogProps {
  item: Event;
  onChange: (key: string, value: any) => void;
  addEvent: (e: any) => Promise<void>;
}

export default function EventDialog({ item, onChange, addEvent }: EventDialogProps) {
  return (
    <div className="absolute w-[100vw] h-[100vh] bg-gray-950 bg-opacity-60 z-10 top-0 left-0 flex justify-center items-center">
      <div className=" max-w-2xl bg-gray-100 p-6 rounded-md">
        <div>Add / Edit Event</div>
        <form className="grid grid-cols-2 gap-4">
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

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={item.date}
              onChange={(e) => onChange("date", e.target.value)}
              placeholder="10 11 2023 15:30"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Is Main Event</span>
            </label>
            <input
              type="checkbox"
              checked={item.isMain}
              className="toggle input input-bordered"
              onChange={(e) => onChange("isMain", !item.isMain)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Files</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) =>
                onChange("files", e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <button
            onClick={addEvent}
            className="btn col-span-2 max-w-xs bg-gray-900 text-gray-50"
            type="submit"
          >
            <AddIcon />
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
