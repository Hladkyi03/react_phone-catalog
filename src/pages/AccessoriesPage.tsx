import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { NotFoundInfo } from '../components/NotFoundInfo/NotFoundInfo';

export const AccessoriesPage = () => (
  <div className="container">
    <BreadCrumbs
      breadCrumbsItems={[{ name: 'Accessories', slug: '/accesories' }]}
    />

    <NotFoundInfo text="Accessories not found" />
  </div>
);
