import { AccountTableProps } from "@/utils/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StackView from "@/components/ui/StackView";

export default function AccountInfo({
  profile,
}: {
  profile: AccountTableProps;
}) {
  return (
    <div>
      <Avatar className="!h-32 !w-32 rounded-none mb-5">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-2">
        <StackView
          title="Full Name"
          value={`${profile.first_name} ${profile.last_name}`}
        />
        <div className="grid grid-cols-2 gap-2">
          <StackView title="Email address" value={`${profile.username} `} />
          <StackView title="Phone number" value={`${profile.phone} `} />
          <StackView title="Gender" value={`${profile.gender}`} />
          <StackView title="Bio" value={`${profile.bio}`} />
          <StackView title="Address" value={`${profile.address} `} />
          <StackView title="City" value={profile?.city?.name || "null"} />
          <StackView title="State" value={profile?.state?.name || "null"} />
          <StackView
            title="Country"
            value={profile?.country?.name || "null"}
            flag={profile?.country?.flag || ""}
          />
        </div>
      </div>
    </div>
  );
}
