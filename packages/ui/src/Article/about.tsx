import { Avatar } from "../avatar";
import SocialLinks from "./social";

export interface AboutProps {
  links: {
    href: string;
    social: React.ReactNode;
    label: string;
  }[];
  firstName: string;
  lastName: string;
  title: string;
  avatarUrl: string;
  about: string;
}
const About = (props: AboutProps) => (
  <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
    <Avatar {...props} />
    <p className="mb-4 text-gray-800">{props.about}</p>
    <SocialLinks links={props.links} publisher={props} />
  </div>
);
export default About;
