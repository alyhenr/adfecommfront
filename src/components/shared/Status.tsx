import type { IconType } from "react-icons";
import { useTranslation } from 'react-i18next';

interface StatusProps {
  text: string;
  Icon: IconType;
  bg: string;
  color: string;
}

const Status = ({ text, Icon, bg, color }: StatusProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${bg} ${color} px-2 py-2 font-medium rounded flex items-center gap-1`}
    >
      {t(text)} <Icon size={15} />
    </div>
  );
};

export default Status;
