import { cn } from "@/lib/utils";
import { currencyFormat } from "@/utils/helpers";
import { ProductTableProps } from "@/utils/types";
import React from "react";
import DisableProduct from "./DisableProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import RestoreProduct from "./RestoreProduct";
import RemoveProduct from "./RemoveProduct";

export default function ListOfProducts({
  data,
  type,
  className,
}: {
  data: ProductTableProps[];
  type?: string;
  className?: string;
}) {
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {data.map((product) => {
        return (
          <div
            className={`${className} rounded-sm  p-3 align-middle font-normal flex items-center`}
            key={product.id}
          >
            <h1>{product.name}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  "bg-zinc-100 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                )}
              >
                {product.country.currency}
                {currencyFormat(product.price as any)}
              </span>
            </div>
            <h1 className=" capitalize">{product.delivery_type}</h1>
            <h1>{product.category.name}</h1>
            <h1>{product.store.name}</h1>
            <h1>{product.productLikes[0].count}</h1>
            <div>{new Date(product.created_at as any).toDateString()}</div>
            {type === "active" && (
              <div className="flex gap-2 items-center">
                <DisableProduct productId={product.id} />
                <DeleteProduct productId={product.id} />
                <EditProduct product={product} />
              </div>
            )}
            {type === "pending" && (
              <div className="flex gap-2 items-center">
                <RestoreProduct productId={product.id} type="pending" />
                <DisableProduct productId={product.id} />
                <DeleteProduct productId={product.id} />
                <EditProduct product={product} type="pending" />
              </div>
            )}
            {type === "deleted" && (
              <div className="flex gap-2 items-center">
                <RestoreProduct productId={product.id} />
                <RemoveProduct productId={product.id} />
              </div>
            )}
            {type === "expired" && (
              <div className="flex gap-2 items-center">
                <DeleteProduct productId={product.id} />
                <RestoreProduct productId={product.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
