import { Link, useMatches } from "react-router-dom";
import cn from "../../utils/cn";

export default function BreadCrumbs() {
  let matches = useMatches();
  const breadCrumbs = matches.filter((match) => match.handle);
  const end = breadCrumbs[breadCrumbs.length - 1];
  return (
    <div className="text-slate-900">
      {breadCrumbs.map((match) => {
        const { crumb } = match.handle as { crumb: string };
        const endBreadcrumb = match.pathname === end.pathname;
        return (
          <Link
            className={`text-sm text-slate-600 ${cn(
              !endBreadcrumb ? "after:content-['/'] after:mx-1" : ``
            )}`}
            to={match.pathname}
            key={match.id}
          >
            {crumb}
          </Link>
        );
      })}
    </div>
  );
}
