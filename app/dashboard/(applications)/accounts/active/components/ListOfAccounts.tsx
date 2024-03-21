import { cn } from "@/lib/utils";
import { AccountTableProps } from "@/utils/types";
import React from "react";
import DeleteAccount from "./DeleteAccount";
import EditAccount from "./EditAccount";
import DisableAccount from "./DisableAccount";
import RestoreAccount from "./RestoreAccount";

export default function ListOfAccounts({
  data,
  className,
  type,
}: {
  data: AccountTableProps[];
  className: string;
  type?: string;
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((account) => {
        return (
          <div
            className={`${className} rounded-sm  p-3 align-middle font-normal flex items-center`}
            key={account.id}
          >
            <h1>
              {account.first_name} {account.last_name}
            </h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  account.role === "personal"
                    ? "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                    : "bg-red-100 border-red-200 text-red-500"
                )}
              >
                {account.role}
              </span>
            </div>
            <h1>{account.username}</h1>
            <h1>{account.phone}</h1>
            <div>{new Date(account.created_at as any).toDateString()}</div>

            {type === "deactivated" ? (
              <div className="flex gap-2 items-center">
                <DeleteAccount profileId={account.id} />
                <RestoreAccount profileId={account.id} />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <DisableAccount profileId={account.id} />
                <EditAccount profile={account} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
