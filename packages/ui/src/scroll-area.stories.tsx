import { Meta, StoryObj } from "@storybook/react";

import { ScrollArea, ScrollBar } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "300px", height: "200px" }}>
      <ScrollArea>
        <div style={{ height: "500px", padding: "10px" }}>
          <h2>Scroll through this content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <p>More content to make scrolling necessary...</p>
        </div>
      </ScrollArea>
    </div>
  ),
};
export const ScrollAreaHorizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        <figure className="shrink-0">
          <div className="overflow-hidden rounded-md">
            <img
              src="https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
              alt={`Photo by Vladimir Malyavko`}
              className="aspect-[3/4] h-fit w-fit object-cover"
              width={300}
              height={400}
            />
          </div>
          <figcaption className="pt-2 text-xs text-muted-foreground">
            Photo by{" "}
            <span className="font-semibold text-foreground">
              Vladimir Malyavko
            </span>
          </figcaption>
        </figure>
        <figure className="shrink-0">
          <div className="overflow-hidden rounded-md">
            <img
              src="https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
              alt={`Photo by Vladimir Malyavko`}
              className="aspect-[3/4] h-fit w-fit object-cover"
              width={300}
              height={400}
            />
          </div>
          <figcaption className="pt-2 text-xs text-muted-foreground">
            Photo by{" "}
            <span className="font-semibold text-foreground">
              Vladimir Malyavko
            </span>
          </figcaption>
        </figure>
        <figure className="shrink-0">
          <div className="overflow-hidden rounded-md">
            <img
              src="https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
              alt={`Photo by Vladimir Malyavko`}
              className="aspect-[3/4] h-fit w-fit object-cover"
              width={300}
              height={400}
            />
          </div>
          <figcaption className="pt-2 text-xs text-muted-foreground">
            Photo by{" "}
            <span className="font-semibold text-foreground">
              Vladimir Malyavko
            </span>
          </figcaption>
        </figure>
        <figure className="shrink-0">
          <div className="overflow-hidden rounded-md">
            <img
              src="https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
              alt={`Photo by Vladimir Malyavko`}
              className="aspect-[3/4] h-fit w-fit object-cover"
              width={300}
              height={400}
            />
          </div>
          <figcaption className="pt-2 text-xs text-muted-foreground">
            Photo by{" "}
            <span className="font-semibold text-foreground">
              Vladimir Malyavko
            </span>
          </figcaption>
        </figure>
        <figure className="shrink-0">
          <div className="overflow-hidden rounded-md">
            <img
              src="https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
              alt={`Photo by Vladimir Malyavko`}
              className="aspect-[3/4] h-fit w-fit object-cover"
              width={300}
              height={400}
            />
          </div>
          <figcaption className="pt-2 text-xs text-muted-foreground">
            Photo by{" "}
            <span className="font-semibold text-foreground">
              Vladimir Malyavko
            </span>
          </figcaption>
        </figure>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
