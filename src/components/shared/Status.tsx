type StatusProps = {
  text: string;
  Icon: React.ElementType<{
    className?: string;
  }>;
  bg: string;
  color: string;
};

const Status = ({ text, Icon, bg, color }: StatusProps) => {
  return (
    <div
      className={`${bg} ${color} px-2 py-2 font-medium rounded flex items-center gap-1`}
    >
      {text} <Icon size={15} />
    </div>
  );
};

export default Status;
