import './TechSpecs.scss';

type Props = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export const TechSpecs: React.FC<Props> = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}) => (
  <div className="tech-specs">
    <h2 className="tech-specs__title">
      Tech specs
    </h2>

    <div className="tech-specs__divider" />

    <ul className="tech-specs__list">
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">Screen</p>
        <p className="tech-specs__spec-value">{screen}</p>
      </li>
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">Resolution</p>
        <p className="tech-specs__spec-value">{resolution}</p>
      </li>
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">Processor</p>
        <p className="tech-specs__spec-value">{processor}</p>
      </li>
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">RAM</p>
        <p className="tech-specs__spec-value">{ram}</p>
      </li>
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">Built in memory</p>
        <p className="tech-specs__spec-value">{capacity}</p>
      </li>
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">Camera</p>
        <p className="tech-specs__spec-value">{camera}</p>
      </li>
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">Zoom</p>
        <p className="tech-specs__spec-value">{zoom}</p>
      </li>
      <li className="tech-specs__list-item">
        <p className="tech-specs__spec-name">Cell</p>
        <p className="tech-specs__spec-value">{cell.join(', ')}</p>
      </li>
    </ul>
  </div>
);
