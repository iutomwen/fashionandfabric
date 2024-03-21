import React from "react";

export default function StackView({
  title,
  value,
  flag,
}: {
  title: string;
  value: string | number | JSX.Element | JSX.Element[] | null | undefined;
  flag?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base">{title}</div>
      <div className="p-2 border rounded-md inline-flex items-center gap-3">
        {flag} <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}
