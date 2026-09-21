import { SmartLink } from "./site-chrome";

export default function NotFound() {
  return <main className="not-found"><span>404 / Missing index</span><h1>Nothing<br />here.</h1><SmartLink href="/">Return home <i>↗︎</i></SmartLink><div className="page-ring" aria-hidden="true" /></main>;
}
