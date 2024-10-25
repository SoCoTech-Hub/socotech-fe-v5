import { Fragment } from "react";
import { ChevronDownIcon, ShareIcon } from "@/components/SvgIcons";
import { Menu, Transition } from "@headlessui/react";

const Dropdowns = (props) => {
  const handleEvent = (link) => {
    if (props.onClick) {
      props.onClick();
    }
    window.location.href = link;
  };

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button
          className={`text-textColorSecondary ${
            props.isMinimalMenuIcon
              ? "item-center flex rounded-full"
              : "inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset"
          } `}
          style={{
            backgroundColor: props.buttonBgColor,
            ...props.buttonStyle,
          }}
        >
          {props.isMinimalMenuIcon ? (
            <>
              <span className="sr-only">Open {props.label}</span>
              <ShareIcon
                className="text-themeColorMain h-5 w-5"
                aria-hidden="true"
                style={{
                  backgroundColor: props.iconBgColor,
                }}
              />
            </>
          ) : (
            <>
              {props.label}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5"
                aria-hidden="true"
                style={{ color: props.iconColor ?? "#cbd5e0" }}
              />
            </>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 mt-2 rounded-md shadow-lg ring-1"
          style={{
            ...props.listStyle,
            backgroundColor: props.listBgColor,
            width: props.width ?? "14rem",
          }}
        >
          {props.heading && <div className="px-4 py-3">{props.heading}</div>}
          <div className="py-1">
            {props.list?.map((list, i) => (
              <Menu.Item key={i}>
                <button
                  onClick={() => handleEvent(list.href)}
                  className={
                    list.icon
                      ? "group flex w-full items-center px-4 py-2 text-sm"
                      : "block w-full cursor-pointer px-4 py-2 text-sm"
                  }
                  style={{
                    ...props.itemStyle,
                    color: props.buttonTextColor,
                    backgroundColor: list.color,
                  }}
                >
                  {list.icon && (
                    <div className="mr-3 h-5 w-5" aria-hidden="true">
                      {list.icon}
                    </div>
                  )}
                  {list.label}
                </button>
              </Menu.Item>
            ))}
          </div>
          {props.children && (
            <div className="py-1">
              <Menu.Item>{props.children}</Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdowns;
