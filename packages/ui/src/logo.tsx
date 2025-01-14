export interface LogoProps {
  url?: string;
  altUrl?: string;
}
export const Logo = (props: LogoProps) => (
  <img src={props.url ?? props.altUrl} />
);
