import './NotFoundInfo.scss';

type Props = {
  text: string;
};

export const NotFoundInfo:React.FC<Props> = ({ text }) => (
  <div className="not-found-info">
    <h1 className="not-found-info__title">{text}</h1>
  </div>
);
