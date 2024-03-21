import { cn } from "@/lib/utils";
import { StoreTableProps } from "@/utils/types";
import React from "react";
import DeleteStore from "./DeleteStore";
import RestoreStore from "./RestoreStore";
import DisableStore from "./DisableStore";
import EditStore from "./EditStore";

export default function ListOfStores({
  data,
  className,
  type,
}: {
  data: StoreTableProps[];
  className: string;
  type?: string;
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((store) => {
        return (
          <div
            className={`${className} rounded-sm  p-3 align-middle font-normal flex items-center`}
            key={store.id}
          >
            <div className="flex flex-col items-start justify-center">
              <h1>{store.name}</h1>
              <span className="text-xs">
                {store?.state?.name}, {store?.city?.name}
              </span>
            </div>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-1  rounded-md shadow capitalize  border-[.5px] text-sm",

                  "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                )}
              >
                {store?.owner?.first_name} {store?.owner?.last_name}
              </span>
            </div>
            <h1>{store?.products[0]?.count}</h1>
            <div className="flex flex-col">
              <span className="text-sm">{store?.email}</span>
              <span className="text-xs">{store?.phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm">
                {store?.subscription_history_id
                  ? "Has Subscription"
                  : "No Subscription"}
              </span>
              {/* <span>{store?.subscriptionHistory?.length}</span> */}
            </div>
            <div>{new Date(store.created_at as any).toDateString()}</div>

            {type === "inactive" ? (
              <div className="flex gap-2 items-center">
                {/* <DeleteStore storeId={store.id} /> */}
                <RestoreStore storeId={store.id} />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <DisableStore storeId={store.id} />
                <EditStore store={store} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
