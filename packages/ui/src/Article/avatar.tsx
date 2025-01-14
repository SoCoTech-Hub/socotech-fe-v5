export interface AvatarProps {
  firstName: string;
  lastName: string;
  title: string;
  avatarUrl: string;
}
export const Avatar = (props: AvatarProps) => (
  <div className="mb-4 flex items-center">
    <img
      src={props.avatarUrl}
      alt={`${props.firstName} ${props.lastName}`}
      className="mr-4 h-12 w-12 rounded-full"
    />
    <div>
      <h2 className="text-xl font-bold">
        {props.firstName} {props.lastName}
      </h2>
      <p className="text-gray-600">{props.title}</p>
    </div>
  </div>
);
