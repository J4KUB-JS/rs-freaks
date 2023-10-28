interface NewCardItemProps {
  title: string;
  body: string;
}

export const NewCardItem = ({ title, body }: NewCardItemProps) => {
  return (
    <div>
      <h4 className="text-offWhite xl:text-xl md:text-base pb-2 text-2xl">{title}</h4>
      <p className="text-grayishBlue xl:text-base md:text-base xl:w-80 md:w-60 w-80">
        {body}
      </p>
    </div>
  );
};
