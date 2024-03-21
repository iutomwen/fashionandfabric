import { StoreTableProps } from "@/utils/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StackView from "@/components/ui/StackView";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function StoreInfo({ store }: { store: StoreTableProps }) {
  return (
    <ScrollArea className="h-[600px] w-full ">
      <Avatar className="!h-48 !w-full rounded-none mb-5">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-2">
        <StackView title="Business Name" value={`${store.name}`} />
        <div className="grid grid-cols-2 gap-2">
          <StackView
            title="Email address"
            value={`${store.email || "null"} `}
          />
          <StackView title="Phone number" value={`${store.phone || "null"} `} />
          <StackView
            title="Business Number"
            value={`${store.business_number || "null"} `}
          />
          <StackView title="Address" value={`${store.address || "null"} `} />
          <StackView title="City" value={store?.city?.name || "null"} />
          <StackView title="State" value={store?.state?.name || "null"} />
          <StackView
            title="Country"
            value={store?.country?.name || "null"}
            flag={store?.country?.flag || ""}
          />
          <StackView title="Likes" value={`${store.likes || 0}`} />
          <StackView
            title="Status"
            value={`${store.status ? "Active" : "In-active"} `}
          />
          <StackView
            title="Subscription Status"
            value={`${
              store.subscription_history_id
                ? "Has Subscription"
                : "No active subscription"
            } `}
          />
        </div>
        <StackView title="Description" value={store?.description || "null"} />
      </div>
    </ScrollArea>
  );
}
