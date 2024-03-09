import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { NotFoundInfo } from '../components/NotFoundInfo/NotFoundInfo';

export const NotFoundPage = () => (
  <div className="container">
    <BreadCrumbs breadCrumbsItems={[]} />

    <NotFoundInfo text="Page not found" />
  </div>
);
