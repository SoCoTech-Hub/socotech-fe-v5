export interface LogoProps {
  url?: string;
  altUrl?: string;
}
const Logo = (props: LogoProps) => <img src={props.url ?? props.altUrl} />;
export default Logo;
