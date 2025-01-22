import { UserItems } from "@acme/config/userItems";

export function UserItemLinks({ items }: { items: typeof UserItems }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((item, index) =>
        item.separator ? (
          <li key={`separator-${index}`} className="border-t border-gray-200" />
        ) : (
          <li key={item.name}>
            <a
              href={item.href}
              className="flex items-center space-x-2 text-sm hover:text-primary"
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.name}</span>
            </a>
          </li>
        ),
      )}
    </ul>
  );
}
