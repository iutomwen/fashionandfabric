import { ProductTableProps } from "@/utils/types";
import React from "react";
import StackView from "@/components/ui/StackView";
import { currencyFormat } from "@/utils/helpers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import RestoreProduct from "./RestoreProduct";
import DisableProduct from "./DisableProduct";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function ProductInfo({
  product,
  type,
}: {
  product: ProductTableProps;
  type?: string;
}) {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1533518463844-1d3d9d2e5c91",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1550439062-609e1531270e",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1502378735452-bc7d86632805",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1555678705-1d1a5e0e2d8a",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1502378735452-bc7d86632805",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1555678705-1d1a5e0e2d8a",
    },
  ];
  return (
    <>
      <ScrollArea className="h-[600px]">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm mx-12 mb-10"
        >
          <CarouselContent>
            {images.map((_, index) => (
              <CarouselItem key={index} className="basis-[50%]">
                <div className="">
                  <Card className="h-48 w-48">
                    <CardContent className="flex aspect-square items-center justify-center p-1">
                      <img
                        key={index}
                        src={_.src}
                        alt={`Image ${index + 1}`}
                        className={`w-auto h-auto`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className=" absolute bottom-0 left-0 right-0">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <StackView title="Product Name" value={`${product.name}`} />
            <StackView
              title="Price"
              value={`${product.country.currency}${currencyFormat(
                product.price as any
              )} `}
            />
            <StackView
              title="Price Bargain"
              value={`${
                product.price_bargain ? "Negotiable" : "Non-Negotiable"
              } `}
            />
            <StackView
              title="Delivery Type"
              value={`${product.delivery_type}`}
            />
            <StackView title="Category" value={`${product.category.name}`} />
            <StackView
              title="Subcategory"
              value={`${product.sub_category.name} `}
            />
            <StackView
              title="Promoted"
              value={product?.is_promoted ? "Yes" : "No"}
            />
            <StackView title="Likes" value={product?.likes || 0} />
            <StackView title="Views" value={product?.product_views || 0} />
            <StackView title="Status" value={product?.status} />
          </div>
          <StackView title="Description" value={`${product.description} `} />
        </div>
      </ScrollArea>
      {type && (
        <DialogFooter>
          <RestoreProduct productId={product.id} type="pending" layout="view" />
          <DisableProduct productId={product.id} />
        </DialogFooter>
      )}
    </>
  );
}
