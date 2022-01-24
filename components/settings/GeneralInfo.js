import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../libs/supabaseClient";

export default function GeneralInfo() {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: defaultV,
  });

  const defaultV = {
    app_id: info?.id,
    currency: info?.currency,
    status: info?.status,
    primaryColor: info?.primary_color,
  };
  const [info, setInfo] = React.useState({});
  async function getAppInfo() {
    let { data: app_settings, error } = await supabase
      .from("app_settings")
      .select("*")
      .single();
    if (error) throw error;
    if (app_settings) {
      setInfo(app_settings);
    }
  }

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      getAppInfo();
      reset(defaultV);
    }
    return () => {
      isCancelled = true;
    };
  }, []);
  //   console.log(info);

  async function updateInfo(values) {
    //alert(JSON.stringify(values));
  }
  return (
    <div className="flex items-center justify-start w-full">
      <div className="flex flex-col m-5 rounded-lg h-auto shadow-lg bg-gray-200 p-3 w-full">
        <div className="text-2xl font-extrabold pl-6 mb-3">App Settings</div>
        <form onSubmit={handleSubmit(updateInfo)}>
          <div className="w-full md:w-1/2 flex flex-col pl-10 md:pr-0 pr-5 space-y-3 mb-7">
            <input type={"hidden"} value={info.id} {...register("app_id")} />
            <div className="flex flex-col space-y-2">
              <select
                className="bg-gray-100 py-3 px-2 rounded shadow-lg"
                {...register("status", {
                  required: true,
                })}
              >
                <option value={``}>Select App Status</option>
                {/* <option value={info.status}>{info.status}</option> */}
                <option value={`online`}>Online</option>
                <option value={`offline`}>Offline</option>
              </select>
              <div className="text-sm pl-3 text-red-600 font-medium">
                {errors.status && "Currency is required"}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <select
                className="bg-gray-100 py-3 px-2 rounded shadow-lg"
                {...register("currency", {
                  required: true,
                })}
              >
                <option value={``}>Select App Currency</option>
                {/* <option value={info.currency}>{info.currency}</option> */}
                <option value={`$`}>Dollar</option>
                <option value={`£`}>Pounds</option>
                <option value={`€`}>Euro</option>
                <option value={`₦`}>Naira</option>
              </select>
              <div className="text-sm pl-3 text-red-600 font-medium">
                {errors.currency && "Currency is required"}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <select
                className="bg-gray-100 py-3 px-2 rounded shadow-lg"
                {...register("primaryColor", {
                  required: true,
                })}
              >
                <option value={``}>Select Color</option>
                <option value={`#9b5f4a`}>Default</option>
                <option value={`red`}>Color 1</option>
                <option value={`blue`}>Color 2</option>
                <option value={`black`}>Color 3</option>
                <option value={`puple`}>Color 3</option>
              </select>
              <div className="text-sm pl-3 text-red-600 font-medium">
                {errors.primaryColor && "Color is required"}
              </div>
            </div>
          </div>
          <div className="pl-10 mb-5">
            <button
              type="submit"
              className="bg-green-500 rounded shadow-lg px-5 py-2 text-white font-bold text-xl hover:bg-gray-300 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
